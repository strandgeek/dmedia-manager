import { Request, Response } from 'express';
import { randomUUID } from "crypto";
import { prisma } from "../db";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Project, User } from "@prisma/client";


export const generateUserNonce = async (address: string): Promise<string> => {
  const user = await prisma.user.upsert({
    where: {
      address,
    },
    create: {
      nonce: randomUUID(),
      address,
    },
    update: {
      nonce: randomUUID(),
    },
  })
  return user.nonce;
};

// TODO: Make changes here when we going to support multiple projects
export const getOrCreateUserProject = async (userId: string): Promise<Project> => {
  const project = await prisma.project.findFirst({
    where: {
      ownerId: userId,
    }
  })
  if (project) {
    return project
  }
  return prisma.project.create({
    data: {
      ownerId: userId,
      createdAt: new Date(),
    }
  })
}


export const generateUserAccessToken = async (address: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      address,
    }
  });
  if (!user) {
    throw new Error('Could not find user by the address');
  }
  const { id } = user;
  try {
    return jwt.sign({ id, address }, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error('Could not sign JWT');
  }
}

const getBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  if (authHeader.startsWith("Bearer ")){
    return authHeader.substring(7, authHeader.length);
  }
return null;
}

export const getLoggedUser = async (req: Request<any>): Promise<User | null> => {
  const accessToken = getBearerToken(req);
  if (!accessToken || accessToken.length === 0) {
    return null;
  }
  const jwtRes = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload
  const userId = jwtRes.id;

  return prisma.user.findFirst({
    where: {
      id: userId,
    }
  });
}
