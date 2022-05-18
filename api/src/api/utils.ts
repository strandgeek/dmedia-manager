import express, { Request, Response } from "express";
import { hasMediaAccess } from '../lib/accessControl';

export const utils = express.Router()

const VERIFY_ADDRESS = '0x0000000000000000000000000000000000000000';

utils.post('/validate-access-control-contract', async (req: Request, res: Response) => {
  const { network, contractAddress } = req.body;
  let valid;
  try {
    await hasMediaAccess(network, contractAddress, VERIFY_ADDRESS)
    valid = true;
  } catch (error) {
    valid = false;
  }
  return res.json({ valid });
});
