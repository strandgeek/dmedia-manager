import { MutationFunction } from "react-query";
import { Media } from "../../types/media";
import { AxiosInstance } from 'axios'

export const uploadProjectMediaMutation: (client: AxiosInstance) => MutationFunction<{ media: Media }, { file: File, onUploadProgress?: (progress: any) => void, projectId: string }> = (client) => async ({ file, onUploadProgress, projectId }) => {
  try {
    const formData = new FormData();
    formData.append(file.name, file);
    const { data } = await client.post(`/projects/${projectId}/medias`, formData, {
      onUploadProgress,
    })
    return data;
  } catch (error) {
    throw error;
  }
};
