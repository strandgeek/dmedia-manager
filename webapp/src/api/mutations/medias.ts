import { MutationFunction } from "react-query";
import { client } from "../client";

export const uploadMediaMutation: MutationFunction<{ status: string }, { file: File, onUploadProgress?: (progress: any) => void }> = async ({ file, onUploadProgress }) => {
  try {
    const formData = new FormData();
    formData.append(file.name, file);
    const { data } = await client.post('/medias', formData, {
      onUploadProgress,
    })
    return data;
  } catch (error) {
    throw error;
  }
};
