import { QueryFunction } from "react-query";
import { Project } from "src/types/project";
import { client } from "../client";

export const getProjects: QueryFunction<Project[]>  = async () => {
  try {
    const { data } = await client.get('/projects')
    return (data?.projects as Project[]) || [];
  } catch (error) {
    throw error;
  }
};
