import { QueryFunction } from "react-query";
import { Media } from "../../types/media";
import { AxiosInstance } from 'axios';

export const getProjectMedias: (client: AxiosInstance) => QueryFunction<Media[], [string, { projectId: string }]>  = (client) => async ({ queryKey }) => {
  try {
    const [_key, { projectId }] = queryKey
    const { data } = await client.get(`/projects/${projectId}/medias`)
    return (data?.medias as Media[]) || [];
  } catch (error) {
    throw error;
  }
};
