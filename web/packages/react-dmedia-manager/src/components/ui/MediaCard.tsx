import { FC } from 'react';
import classNames from "classnames";
import { Media } from "../../types/media";
import { cidToGatewayUrl } from "../../utils/ipfs";
import { formatSize } from "../../utils/format";
import { getMediaType } from "../../utils/media";
import { MediaIcon } from "./MediaIcon";

export interface MediaCardProps {
  current?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
  media: Media;
  onClick?: () => void;
}

export const MediaCard: FC<MediaCardProps> = ({
  current,
  isUploading,
  uploadProgress,
  media,
  onClick,
}) => {
  const mediaType = getMediaType(media);
  return (
    <li className="dm-relative" onClick={onClick}>
      <div
        className={classNames(
          current
            ? "dm-ring-2 dm-ring-offset-2 dm-ring-indigo-500"
            : "focus-within:dm-ring-2 focus-within:dm-ring-offset-2 focus-within:dm-ring-offset-gray-100 focus-within:dm-ring-indigo-500",
          "group dm-block dm-w-full dm-aspect-w-10 dm-aspect-h-7 dm-rounded-lg dm-bg-gray-200 dm-overflow-hidden"
        )}
      >
        {!isUploading && mediaType === "IMAGE" && (
          <img
            src={cidToGatewayUrl(media.ipfsCID)}
            alt={media.name}
            className={classNames(
              current ? "" : "group-hover:dm-opacity-75",
              "dm-object-contain dm-pointer-events-none"
            )}
          />
        )}
        {!isUploading && mediaType === "VIDEO" && (
          <video src={cidToGatewayUrl(media.ipfsCID)}></video>
        )}
        {!isUploading && mediaType === "OTHER" && (
          <div className="dm-p-[30%] dm-w-full dm-h-full dm-flex dm-items-center shrink-0">
            <MediaIcon media={media} />
          </div>
        )}
        {isUploading && (
          <div className="dm-object-cover dm-pointer-events-none dm-flex dm-items-center dm-text-center dm-justify-center">
            <div>
              <div className="dm-text-xs dm-text-gray-500 dm-mb-2">
                Uploading {uploadProgress}%...
              </div>
              <div className="dm-w-full dm-bg-gray-200 dm-rounded-full dm-h-2 dark:dm-bg-gray-700">
                <div
                  className="dm-bg-blue-600 dm-h-2 dm-rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <button type="button" className="dm-absolute dm-inset-0 focus:dm-outline-none">
          <span className="dm-sr-only">View details for {media.name}</span>
        </button>
      </div>
      <p className="dm-mt-2 dm-block dm-text-sm dm-font-medium dm-text-gray-900 dm-truncate dm-pointer-events-none">
        {media.name}
      </p>
      <p className="dm-block dm-text-sm dm-font-medium dm-text-gray-500 dm-pointer-events-none">
        {formatSize(media.sizeInBytes)}
      </p>
    </li>
  );
};
