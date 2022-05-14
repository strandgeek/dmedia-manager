import { MutationFunction } from "react-query";
import { Media } from "../../types/media";
import { client } from "../client";

export const uploadProjectMediaMutation: MutationFunction<{ media: Media }, { file: File, onUploadProgress?: (progress: any) => void, projectId: string }> = async ({ file, onUploadProgress, projectId }) => {
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
