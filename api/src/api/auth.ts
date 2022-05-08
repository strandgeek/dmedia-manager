import express, { Request, Response } from 'express';
import { prisma } from '../db';
import { API_ERRORS, sendApiError } from '../errors';
import { generateSignRequest } from '../lib/auth';
import { generateUserNonce, generateUserAccessToken } from '../lib/user';
import { web3 } from '../lib/web3';

export const auth = express.Router()

// POST /api/auth
auth.post('/', async (req: Request, res: Response) => {
  try {
    const { signature } = req.body;
    const address = req.body.address.toUpperCase();
    const user = await prisma.user.findUnique({
      where: {
        address,
      },
    });
    const { message } = generateSignRequest(address, user?.nonce!);
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    if (recoveredAddress.toUpperCase() == address.toUpperCase()) {
      const accessToken = await generateUserAccessToken(address);
      // Renew nonce after login
      await generateUserNonce(address);
      return res.json({
        accessToken,
      });
    }
    await generateUserNonce(address);
    return sendApiError(res, API_ERRORS.UNAUTHORIZED);
  } catch (error) {
    console.log(error)
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});

// POST /api/auth/sign-request/:address
auth.post('/sign-request/:address', async (req: Request, res: Response) => {
  try {    
    const { address } = req.params;
    const nonce = await generateUserNonce(address.toUpperCase());
    const signRequest = generateSignRequest(address.toUpperCase(), nonce);
    res.json(signRequest);
  } catch (error) {
    console.log(error);
    return sendApiError(res, API_ERRORS.INTERNAL_SERVER_ERROR);
  }
});
