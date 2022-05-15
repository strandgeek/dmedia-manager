import { MutationFunction } from "react-query";
import { AxiosInstance } from 'axios'

interface SignRequest {
  address: string;
  nonce: string;
  message: string;
}


export const generateSignRequest: (client: AxiosInstance) => MutationFunction<SignRequest, { address: string }> = (client) => async ({ address }) => {
  try {
    const { data } = await client.post(`/auth/sign-request/${address}`)
    return data;
  } catch (error) {
    throw error;
  }
};

export const auth: (client: AxiosInstance) => MutationFunction<{ accessToken: string }, { address: string, signature: string }> = (client) => async ({ address, signature }) => {
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
