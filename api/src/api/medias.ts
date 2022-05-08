import { ProjectMedia } from "@prisma/client";
import express, { Request, Response } from "express";
import multer from 'multer';
import { prisma } from "../db";
import { API_ERRORS, sendApiError } from "../errors";
import { ipfs } from "../lib/ipfs";
import { getLoggedUser, getOrCreateUserProject } from "../lib/user";

export const medias = express.Router()


const upload = multer();


// POST /api/v1/medias
medias.post('/', upload.any(), async (req: Request, res: Response) => {
  try {
    const user = await getLoggedUser(req)
    if (!user) {
      return sendApiError(res, API_ERRORS.UNAUTHORIZED); 
    }
    const project = await getOrCreateUserProject(user.id)
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
  } catch (error) {
    console.log(error);
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});

medias.get('/', async (req: Request, res: Response) => {
  const user = await getLoggedUser(req)
  if (!user) {
    return sendApiError(res, API_ERRORS.UNAUTHORIZED); 
  }
  const project = await getOrCreateUserProject(user.id)
  const medias = await prisma.projectMedia.findMany({
    where: {
      projectId: project.id,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  return res.json({ medias });
});
