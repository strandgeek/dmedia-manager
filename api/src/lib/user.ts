import { randomUUID } from "crypto";
import { prisma } from "../db";
import jwt from 'jsonwebtoken';


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
