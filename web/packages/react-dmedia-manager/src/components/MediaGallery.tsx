import {
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/react/solid";
import { MediaDetailsSidebar } from "../components/MediaDetailsSidebar";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { uploadMediaMutation } from "../api/mutations/medias";
import { v4 as uuidv4 } from "uuid";
import { MediaCard } from "react-dmedia-manager";
import { Media } from "../types/media";
import { getMedias } from "../api/queries/medias";
import { ReactQueryProvider } from "../providers/ReactQuery";

interface UploadProgressInfo {
  id: string;
  file: File;
  progress: number;
}

export const MediaGalleryBase = () => {
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const uploadMedias = useMutation(uploadMediaMutation);
  const {
    data: medias,
    isLoading,
    refetch: refetchMedias,
  } = useQuery("medias", getMedias);
  const [uploadProgressInfoList, setUploadProgressInfoList] = useState<
    UploadProgressInfo[]
  >([]);
  // useEffect(() => {
  //   if (previewUrl) {
  //     setToggler(true);
  //   }
  // }, [previewUrl])
  const removeUploadItemById = (id: string) => {
    setUploadProgressInfoList((infoList) => {
      const i = infoList.findIndex((info) => info.id === id);
      infoList.splice(i, 1);
      return [...infoList];
    });
  };
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const id = uuidv4();
        setUploadProgressInfoList((infoList) => {
          const info = {
            id,
            file,
            progress: 0,
          };
          return [info, ...infoList];
        });
        uploadMedias
          .mutateAsync({
            file,
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgressInfoList((infoList) => {
                const i = infoList.findIndex((info) => info.id === id);
                infoList[i].progress = progress;
                return [...infoList];
              });
            },
          })
          .then(() => {
            removeUploadItemById(id);
            refetchMedias();
          });
      });
    },
    [refetchMedias, uploadMedias]
  );
  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });
  if (isLoading) {
    return null;
  }
  return (
    <div className="flex-1 flex items-stretch overflow-hidden">
      <main
        className="flex-1 overflow-y-auto relative h-full"
        {...getRootProps()}
      >
        {isDragActive && (
          <div className="mt-1 sm:mt-0 sm:col-span-2 h-full w-full absolute z-20 bg-[rgba(255,255,255,0.9)] p-2">
            <div className="flex justify-center px-6 pt-5 pb-6 border-4 border-gray-300 border-dashed rounded-md h-full">
              <div className="space-y-1 text-center flex items-center">
                <div>
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1 text-lg">
                      Drop you media file here to start uploading
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Any media file up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
              <button
                type="button"
                className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use list view</span>
              </button>
              <button
                type="button"
                className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use grid view</span>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="sr-only">
              Recently viewed
            </h2>
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {uploadProgressInfoList.map((info) => {
                const media: Media = {
                  id: info.id,
                  name: info.file.name,
                  sizeInBytes: info.file.size,
                  mimetype: info.file.type,
                  ipfsCID: "",
                  createdAt: new Date(),
                };
                return (
                  <MediaCard
                    isUploading
                    uploadProgress={info.progress}
                    media={media}
                  />
                );
              })}
              {medias &&
                medias.map((media) => {
                  return (
                    <MediaCard
                      media={media}
                      onClick={() => setCurrentMedia(media)}
                    />
                  );
                })}

              {/* {files.map((file) => (
              <li key={file.name} className="relative">
                <div
                  className={classNames(
                    file.current
                      ? "ring-2 ring-offset-2 ring-indigo-500"
                      : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                    "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                  )}
                >
                  <img
                    src={file.source}
                    alt=""
                    className={classNames(
                      file.current ? "" : "group-hover:opacity-75",
                      "object-cover pointer-events-none"
                    )}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {file.name}
                    </span>
                  </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {file.name}
                </p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                  {file.size}
                </p>
              </li>
            ))} */}
            </ul>
          </section>
        </div>
      </main>

      {/* Details sidebar */}
      {currentMedia && <MediaDetailsSidebar media={currentMedia} />}
    </div>
  );
};


export const MediaGallery = () => {
  return (
      <ReactQueryProvider>
        <div id="dmedia">
        <MediaGalleryBase />
        </div>
      </ReactQueryProvider>
  )
}
