import { QueryFunction } from "react-query";
import { Media } from "../../types/media";
import { client } from "../client";

export const getMedias: QueryFunction<Media[]>  = async () => {
  try {
    const { data } = await client.get('/medias')
    return (data?.medias as Media[]) || [];
  } catch (error) {
    throw error;
  }
};
