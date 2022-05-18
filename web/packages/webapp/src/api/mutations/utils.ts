import { MutationFunction } from "react-query";
import { Project } from "src/types/project";
import { client } from "../client";

interface ValidateAccessControlContractRequest {
  network: string;
  contractAddress: string;
}

interface ValidateAccessControlContractResponse {
  valid: boolean;
}


export const validateAccessControlContract: MutationFunction<ValidateAccessControlContractResponse, ValidateAccessControlContractRequest> = async ({ network, contractAddress }) => {
  try {
    const { data } = await client.post<ValidateAccessControlContractResponse>('/utils/validate-access-control-contract', {
      network,
      contractAddress,
    })
    return data;
  } catch (error) {
    throw error;
  }
};
