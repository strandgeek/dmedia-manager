import { QueryFunction } from "react-query";
import { Media } from "../../types/media";
import { client } from "../client";

export const getProjectMedias: QueryFunction<Media[], [string, { projectId: string }]>  = async ({ queryKey }) => {
  try {
    const [_key, { projectId }] = queryKey
    const { data } = await client.get(`/projects/${projectId}/medias`)
    return (data?.medias as Media[]) || [];
  } catch (error) {
    throw error;
  }
};
