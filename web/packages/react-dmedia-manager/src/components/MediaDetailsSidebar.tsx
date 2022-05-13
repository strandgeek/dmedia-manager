import { PencilIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
import { Media } from "../types/media";
import { formatDuration, formatSize } from "../utils/format";
import { cidToGatewayUrl } from "../utils/ipfs";
import Lightbox from "react-awesome-lightbox";
// import "react-awesome-lightbox/build/style.css";
import { DuplicateIcon, SearchIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { getMediaType } from "../utils/media";
import { MediaIcon } from "./MediaIcon";

interface MediaDetailsSidebarProps {
  media: Media;
}

export const MediaDetailsSidebar: FC<MediaDetailsSidebarProps> = ({
  media,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [resolution, setResolution] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const URI = `ipfs://${media.ipfsCID}`;
  const copyURIToClipboard = () => {
    navigator.clipboard.writeText(URI);
    toast.success('IPFS URI copied to clipboard');
  }
  const mediaType = getMediaType(media);
  const onVideoLoadedMetadata = (e: any) => {
    const width = e.target.videoWidth;
    const height = e.target.videoHeight;
    setResolution(`${width}x${height}`);
    setDuration(formatDuration(e.target.duration) as any);
  }
  const onImageLoad = (e: any) => {
    console.log(e.target)
    setResolution(`${e.target.naturalWidth}x${e.target.naturalHeight}`);
  }
  return (
    <>
    {showPreview && (
      <Lightbox image={cidToGatewayUrl(media.ipfsCID)} showTitle={false} onClose={() => setShowPreview(false)}></Lightbox>
    )}
      {/* <div className="dm-fixed dm-top-0 dm-left-0 dm-z-50 dm-w-screen dm-h-screen bg-[rgba(0,0,0,0.8)] dm-flex dm-items-center dm-justify-center">
        <img
          src={cidToGatewayUrl(media.ipfsCID)}
          alt={media.name}
        />
      </div> */}
      <aside className="dm-hidden dm-w-96 dm-bg-white dm-p-8 dm-border-l dm-border-gray-200 dm-overflow-y-auto lg:dm-block animate__animated animate__slideInRight animate__faster dm-static">
        
        <div className="dm-pb-16 dm-space-y-6">
          <div>
            <div className="group dm-block dm-w-full dm-aspect-w-10 dm-aspect-h-7 dm-rounded-lg dm-overflow-hidden dm-bg-gray-200 dm-relative">
              {mediaType === 'IMAGE' && (
                <>                
                  <img
                    src={cidToGatewayUrl(media.ipfsCID)}
                    alt={media.name}
                    className="dm-object-contain dm-cursor-pointer"
                    onClick={() => setShowPreview(true)}
                    onLoad={onImageLoad}
                  />
                  <div onClick={() => setShowPreview(true)} className="dm-w-full dm-h-full dm-absolute dm-flex dm-items-center dm-justify-center bg-[rgba(0,0,0,0.5)] dm-cursor-pointer dm-opacity-0 group-hover:dm-opacity-100 dm-transition-opacity">
                    <SearchIcon className="dm-w-12 dm-h-12 dm-text-white" />
                  </div>
                </>
              )}
              {mediaType === 'VIDEO' && (
                <video src={cidToGatewayUrl(media.ipfsCID)} controls onLoadedMetadata={onVideoLoadedMetadata}></video>
              )}
              {mediaType === 'OTHER' && (
                <div className="dm-p-24 dm-w-full dm-h-full dm-flex dm-items-center">
                  <MediaIcon media={media} />
                </div>
              )}
            </div>
            <div className="dm-mt-4 dm-flex dm-items-start dm-justify-between">
              <div>
                <h2 className="dm-text-lg dm-font-medium dm-text-gray-900">
                  <span className="dm-sr-only">Details for </span>
                  {media.name}
                </h2>
                <p className="dm-text-sm dm-font-medium dm-text-gray-500">
                  {media.sizeInBytes}
                </p>
              </div>
              {/* <button
                type="button"
                className="dm-ml-4 dm-bg-white dm-rounded-full dm-h-8 dm-w-8 dm-flex dm-items-center dm-justify-center dm-text-gray-400 hover:dm-bg-gray-100 hover:dm-text-gray-500 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-indigo-500"
              >
                <HeartIcon className="dm-h-6 dm-w-6" aria-hidden="true" />
                <span className="dm-sr-only">Favorite</span>
              </button> */}
            </div>
          </div>
          <div>
            <h3 className="dm-font-medium dm-text-gray-900">Information</h3>
            <dl className="dm-mt-2 dm-border-t dm-border-b dm-border-gray-200 dm-divide-y dm-divide-gray-200">
              <div className="dm-py-3 dm-flex dm-justify-between dm-text-sm dm-font-medium">
                <dt className="dm-text-gray-500">Type</dt>
                <dd className="dm-text-gray-900">{media.mimetype}</dd>
              </div>
              <div className="dm-py-3 dm-flex dm-justify-between dm-text-sm dm-font-medium">
                <dt className="dm-text-gray-500">Size</dt>
                <dd className="dm-text-gray-900">{formatSize(media.sizeInBytes)}</dd>
              </div>
              {resolution && (mediaType === "VIDEO" || mediaType === "IMAGE") && (
                <div className="dm-py-3 dm-flex dm-justify-between dm-text-sm dm-font-medium">
                  <dt className="dm-text-gray-500">Resolution</dt>
                  <dd className="dm-text-gray-900">{resolution}</dd>
                </div>
              )}
              {duration && mediaType === "VIDEO" && (
                <div className="dm-py-3 dm-flex dm-justify-between dm-text-sm dm-font-medium">
                  <dt className="dm-text-gray-500">Duration</dt>
                  <dd className="dm-text-gray-900">{duration}</dd>
                </div>
              )}
              <div className="dm-py-3 dm-flex dm-justify-between dm-text-sm dm-font-medium">
                <dt className="dm-text-gray-500">URI</dt>
                <dd className="dm-text-gray-900 dm-flex dm-max-w-full dm-px-6">
                  <div className="dm-overflow-hidden text-ellipsis dm-whitespace-nowrap dm-mx-2">
                    {URI}
                  </div>
                  <div>
                    <DuplicateIcon
                      onClick={() => copyURIToClipboard()}
                      className="dm-w-4 dm-h-4 dm-text-gray-400 dm-cursor-pointer"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="dm-font-medium dm-text-gray-900">Description</h3>
            <div className="dm-mt-2 dm-flex dm-items-center dm-justify-between">
              <p className="dm-text-sm dm-text-gray-500 dm-italic">
                Add a description to this image.
              </p>
              <button
                type="button"
                className="dm-bg-white dm-rounded-full dm-h-8 dm-w-8 dm-flex dm-items-center dm-justify-center dm-text-gray-400 hover:dm-bg-gray-100 hover:dm-text-gray-500 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-indigo-500"
              >
                <PencilIcon className="dm-h-5 dm-w-5" aria-hidden="true" />
                <span className="dm-sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div className="dm-flex">
            <button
              type="button"
              className="dm-flex-1 dm-bg-indigo-600 dm-py-2 dm-px-4 dm-border dm-border-transparent dm-rounded-md dm-shadow-sm dm-text-sm dm-font-medium dm-text-white hover:dm-bg-indigo-700 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-offset-2 focus:dm-ring-indigo-500"
            >
              Download
            </button>
            <button
              type="button"
              className="dm-flex-1 dm-ml-3 dm-bg-white dm-py-2 dm-px-4 dm-border dm-border-gray-300 dm-rounded-md dm-shadow-sm dm-text-sm dm-font-medium dm-text-gray-700 hover:dm-bg-gray-50 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-offset-2 focus:dm-ring-indigo-500"
            >
              Delete
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
