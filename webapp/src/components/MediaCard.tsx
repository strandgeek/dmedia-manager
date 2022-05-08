import { FC } from "react";
import classNames from "classnames";
import { Media } from "../types/media";
import { cidToGatewayUrl } from "../utils/ipfs";
import { formatSize } from "../utils/format";

export interface MediaCardProps {
  current?: boolean
  isUploading?: boolean;
  uploadProgress?: number;
  media: Media;
  onClick?: () => void;
}

export const MediaCard: FC<MediaCardProps> = ({ current, isUploading, uploadProgress, media, onClick }) => {
  return (
    <li className="relative" onClick={onClick}>
      <div
        className={classNames(
          current
            ? "ring-2 ring-offset-2 ring-indigo-500"
            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
          "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
        )}
      >
        {!isUploading && (
          <img
            src={cidToGatewayUrl(media.ipfsCID)}
            alt={media.name}
            className={classNames(
              current ? "" : "group-hover:opacity-75",
              "object-cover pointer-events-none"
            )}
          />
        )}
        {isUploading && (
          <div className="object-cover pointer-events-none flex items-center text-center justify-center">
            <div>
              <div className="text-xs text-gray-500 mb-2">
                Uploading {uploadProgress}%...
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          </div>
        )}
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {media.name}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {media.name}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        {formatSize(media.sizeInBytes)}
      </p>
    </li>
  );
};
