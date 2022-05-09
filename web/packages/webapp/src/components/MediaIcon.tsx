import { FC } from "react";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon"
import { Media } from "../types/media"

interface MediaIconProps {
  media: Media
}

export const MediaIcon: FC<MediaIconProps> = ({ media }) => {
  const info = media.mimetype.split('/');
  const extension = info[1];
  return (
    <FileIcon extension={extension} {...defaultStyles[extension as DefaultExtensionType]} />
  )
}
