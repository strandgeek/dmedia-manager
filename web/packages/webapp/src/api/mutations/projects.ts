import { MutationFunction } from "react-query";
import { Project } from "src/types/project";
import { client } from "../client";

interface CreateProjectRequest {
  name: string;
}

interface CreateProjectResponse {
  project: Project;
}


export const createProject: MutationFunction<CreateProjectResponse, CreateProjectRequest> = async ({ name }) => {
  try {
    const { data } = await client.post<CreateProjectResponse>('/projects', {
      name,
    })
    return data;
  } catch (error) {
    throw error;
  }
};
