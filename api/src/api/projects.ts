import { Project, User } from "@prisma/client";
import express, { Request, Response } from "express";
import multer from 'multer';
import { prisma } from "../db";
import { API_ERRORS, sendApiError } from "../errors";
import { ipfs } from "../lib/ipfs";
import { getLoggedUser, userHasAccessToProject } from "../lib/user";
import { withPage } from "../utils/prisma";

export const projects = express.Router()


const upload = multer();


const getProjectUserFromReq = async (req: Request): Promise<{ user: User, project: Project}> => {
  const user = await getLoggedUser(req)
  if (!user) {
    throw new Error(API_ERRORS.UNAUTHORIZED.key)
  }
  const project = await prisma.project.findUnique({
    where: {
      id: req.params.projectId,
    },
  });
  if (!project) {
    throw new Error(API_ERRORS.UNAUTHORIZED.key)
  }
  return {
    user,
    project,
  }
}

const getAuthorizedProjectUser = async (req: Request): Promise<{ user: User, project: Project}> => {
  const { user, project } = await getProjectUserFromReq(req);
  if (!await userHasAccessToProject(user, project)) {
    throw new Error(API_ERRORS.UNAUTHORIZED.key);
  }
  return {
    user,
    project,
  }
}

const getAuthorizedProjectOwner = async (req: Request): Promise<{ user: User, project: Project}> => {
  const { user, project } = await getProjectUserFromReq(req);
  if (project.ownerId !== user.id) {
    throw new Error(API_ERRORS.UNAUTHORIZED.key);
  }
  return {
    user,
    project,
  }
}

// POST /api/v1/projects
projects.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getLoggedUser(req)
    if (!user) {
     return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    const { name } = req.body;
    const project = await prisma.project.create({
      data: {
        createdAt: new Date(),
        name,
        ownerId: user.id,
      }
    })
    return res.json({ project });
  } catch (error: any) {
    if (error.message === API_ERRORS.UNAUTHORIZED.key) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});


// GET /api/v1/projects
projects.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getLoggedUser(req)
    if (!user) {
     return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    const projects = await prisma.project.findMany({
      where: {
        ownerId: user.id,
      },
    })
    return res.json({ projects });
  } catch (error: any) {
    if (error.message === API_ERRORS.UNAUTHORIZED.key) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});


// POST /api/v1/projects/:projectId/medias
projects.post('/:projectId/medias', upload.any(), async (req: Request, res: Response) => {
  try {
    const { project } = await getAuthorizedProjectUser(req);
    const { files } = req;
    if (files?.length! <= 0) {
      return sendApiError(res, API_ERRORS.BAD_REQUEST);
    }
    // @ts-ignore
    const file = files[0] as Express.Multer.File
    const { cid } = await ipfs.add({
      content: file.buffer,
    })
    const { mimetype, originalname, size } = file;
    const media = await prisma.projectMedia.create({
      data: {
        createdAt: new Date(),
        ipfsCID: cid.toString(),
        mimetype,
        name: originalname,
        sizeInBytes: size,
        projectId: project.id,
      }
    })
    return res.json({ media })
  } catch (error: any) {
    if (error.message === API_ERRORS.UNAUTHORIZED.key) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});


// GET /api/v1/projects/:projectId/medias
projects.get('/:projectId/medias', async (req: Request, res: Response) => {
  try {    
    const { project } = await getAuthorizedProjectUser(req);
    const medias = await prisma.projectMedia.findMany({
      where: {
        projectId: project.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...withPage(req),
    })
    return res.json({ medias });
  } catch (error: any) {
    if (error.message === API_ERRORS.UNAUTHORIZED.key) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});

// PUT /api/v1/projects/:projectId
projects.put('/:projectId', async (req: Request, res: Response) => {
  try {    
    const { project } = await getAuthorizedProjectOwner(req);
    const {
      accessControlContractNetwork,
      accessControlContractAddress
    } = req.body;
    const newProject = await prisma.project.update({
      data: {
        accessControlContractNetwork,
        accessControlContractAddress,
      },
      where: {
        id: project.id,
      }
    })
    return res.json({ project: newProject });
  } catch (error: any) {
    if (error.message === API_ERRORS.UNAUTHORIZED.key) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED);
    }
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});
