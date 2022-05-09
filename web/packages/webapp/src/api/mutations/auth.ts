import { MutationFunction } from "react-query";
import { client } from "../client";

interface SignRequest {
  address: string;
  nonce: string;
  message: string;
}


export const generateSignRequest: MutationFunction<SignRequest, { address: string }> = async ({ address }) => {
  try {
    const { data } = await client.post(`/auth/sign-request/${address}`)
    return data;
  } catch (error) {
    throw error;
  }
};

export const auth: MutationFunction<{ accessToken: string }, { address: string, signature: string }> = async ({ address, signature }) => {
  try {
    const { data } = await client.post('/auth', {
      address,
      signature,
    })
    return data;
  } catch (error) {
    throw error;
  }
};
