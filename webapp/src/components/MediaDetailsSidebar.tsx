import { PencilIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
import { Media } from "../types/media";
import { formatDuration, formatSize } from "../utils/format";
import { cidToGatewayUrl } from "../utils/ipfs";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { ClipboardCopyIcon, DuplicateIcon, SearchIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { getMediaType } from "../utils/media";
import { FileIcon } from 'react-file-icon';
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
      {/* <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
        <img
          src={cidToGatewayUrl(media.ipfsCID)}
          alt={media.name}
        />
      </div> */}
      <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block animate__animated animate__slideInRight animate__faster static">
        
        <div className="pb-16 space-y-6">
          <div>
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden bg-gray-200 relative">
              {mediaType === 'IMAGE' && (
                <>                
                  <img
                    src={cidToGatewayUrl(media.ipfsCID)}
                    alt={media.name}
                    className="object-contain cursor-pointer"
                    onClick={() => setShowPreview(true)}
                    onLoad={onImageLoad}
                  />
                  <div onClick={() => setShowPreview(true)} className="w-full h-full absolute flex items-center justify-center bg-[rgba(0,0,0,0.5)] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <SearchIcon className="w-12 h-12 text-white" />
                  </div>
                </>
              )}
              {mediaType === 'VIDEO' && (
                <video src={cidToGatewayUrl(media.ipfsCID)} controls onLoadedMetadata={onVideoLoadedMetadata}></video>
              )}
              {mediaType === 'OTHER' && (
                <div className="p-24 w-full h-full flex items-center">
                  <MediaIcon media={media} />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  <span className="sr-only">Details for </span>
                  {media.name}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {media.sizeInBytes}
                </p>
              </div>
              {/* <button
                type="button"
                className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Favorite</span>
              </button> */}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Information</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Type</dt>
                <dd className="text-gray-900">{media.mimetype}</dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Size</dt>
                <dd className="text-gray-900">{formatSize(media.sizeInBytes)}</dd>
              </div>
              {resolution && (
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Resolution</dt>
                  <dd className="text-gray-900">{resolution}</dd>
                </div>
              )}
              {duration && mediaType === "VIDEO" && (
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="text-gray-900">{duration}</dd>
                </div>
              )}
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">URI</dt>
                <dd className="text-gray-900 flex max-w-full px-6">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap mx-2">
                    {URI}
                  </div>
                  <div>
                    <DuplicateIcon
                      onClick={() => copyURIToClipboard()}
                      className="w-4 h-4 text-gray-400 cursor-pointer"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">
                Add a description to this image.
              </p>
              <button
                type="button"
                className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download
            </button>
            <button
              type="button"
              className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
