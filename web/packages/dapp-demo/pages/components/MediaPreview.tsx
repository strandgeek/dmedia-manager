/* eslint-disable @next/next/no-img-element */

import classNames from "classnames";
import { FC } from "react";
import { Media } from "react-dmedia-manager/lib/esm/types/media";
import { cidToGatewayUrl } from "../../utils/ipfs";

export const MediaPreview: FC<{ media: Media }> = ({ media }) => {
  return (
    <div>
      <div
        className={classNames(
          "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
          "group block aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
        )}
      >
        <img
          src={cidToGatewayUrl(media.ipfsCID)}
          alt={media.name}
          className="object-contain pointer-events-none w-[400px] h-[200px]"
        />
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {media.name}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        {media.mimetype}
      </p>
    </div>
  );
};
