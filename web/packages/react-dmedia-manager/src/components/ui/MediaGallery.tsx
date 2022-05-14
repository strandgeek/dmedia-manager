import {
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/react/solid";
import { MediaDetailsSidebar } from "./MediaDetailsSidebar";
import { useDropzone } from "react-dropzone";
import { FC, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { uploadMediaMutation } from "../../api/mutations/medias";
import { v4 as uuidv4 } from "uuid";
import { MediaCard } from "../ui/MediaCard";
import { Media } from "../../types/media";
import { getProjectMedias } from "../../api/queries/project";

interface UploadProgressInfo {
  id: string;
  file: File;
  progress: number;
}

export interface MediaGalleryProps {
  sidebarFooter?: React.ReactNode;
  currentMedia?: Media | null;
  setCurrentMedia: React.Dispatch<React.SetStateAction<Media | null>>
  projectId: string; 
}

export const MediaGallery: FC<MediaGalleryProps> = ({ sidebarFooter, currentMedia, setCurrentMedia, projectId }) => {
  const uploadMedias = useMutation(uploadMediaMutation);
  const {
    data: medias,
    isLoading,
    refetch: refetchMedias,
  } = useQuery(["projectMedias", { projectId }], getProjectMedias);
  useEffect(() => {
    if (medias && medias.length > 0) {
      setCurrentMedia(medias[0]);
    }
  }, [medias])
  const [uploadProgressInfoList, setUploadProgressInfoList] = useState<
    UploadProgressInfo[]
  >([]);
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
    <div className="dm-flex-1 dm-flex dm-items-stretch dm-overflow-hidden">
      <main
        className="dm-flex-1 dm-overflow-y-auto dm-relative dm-h-full"
        {...getRootProps()}
      >
        {isDragActive && (
          <div className="dm-mt-1 sm:dm-mt-0 sm:dm-col-span-2 dm-h-full dm-w-full dm-absolute dm-z-20 bg-[rgba(255,255,255,0.9)] dm-p-2">
            <div className="dm-flex dm-justify-center dm-px-6 dm-pt-5 dm-pb-6 dm-border-4 dm-border-gray-300 dm-border-dashed dm-rounded-md dm-h-full">
              <div className="dm-space-y-1 dm-text-center dm-flex dm-items-center">
                <div>
                  <svg
                    className="dm-mx-auto dm-h-24 dm-w-24 dm-text-gray-400"
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
                  <div className="dm-flex dm-text-sm dm-text-gray-600">
                    <p className="dm-pl-1 dm-text-lg">
                      Drop you media file here to start uploading
                    </p>
                  </div>
                  <p className="dm-text-sm dm-text-gray-500 dm-mt-2">
                    Any media file up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="dm-max-w-7xl dm-mx-auto dm-px-4 sm:dm-px-6 lg:dm-px-8">
          <div className="dm-flex">
            <div className="dm-ml-6 dm-bg-gray-100 dm-p-0.5 dm-rounded-lg dm-flex dm-items-center sm:dm-hidden">
              <button
                type="button"
                className="dm-p-1.5 dm-rounded-md dm-text-gray-400 hover:dm-bg-white hover:dm-shadow-sm focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-inset focus:dm-ring-indigo-500"
              >
                <ViewListIcon className="dm-h-5 dm-w-5" aria-hidden="true" />
                <span className="dm-sr-only">Use list view</span>
              </button>
              <button
                type="button"
                className="dm-ml-0.5 dm-bg-white dm-p-1.5 dm-rounded-md dm-shadow-sm dm-text-gray-400 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-inset focus:dm-ring-indigo-500"
              >
                <ViewGridIconSolid className="dm-h-5 dm-w-5" aria-hidden="true" />
                <span className="dm-sr-only">Use dm-grid view</span>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <section className="dm-mt-8 dm-pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="dm-sr-only">
              Recently viewed
            </h2>
            <ul
              role="list"
              className="dm-grid dm-grid-cols-2 dm-gap-x-4 dm-gap-y-8 sm:dm-grid-cols-3 sm:dm-gap-x-6 md:dm-grid-cols-4 lg:dm-grid-cols-3 xl:dm-grid-cols-4 xl:dm-gap-x-8"
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
              <li key={file.name} className="dm-relative">
                <div
                  className={classNames(
                    file.current
                      ? "dm-ring-2 dm-ring-offset-2 dm-ring-indigo-500"
                      : "focus-within:dm-ring-2 focus-within:dm-ring-offset-2 focus-within:dm-ring-offset-gray-100 focus-within:dm-ring-indigo-500",
                    "group dm-block dm-w-full aspect-w-10 aspect-h-7 dm-rounded-lg dm-bg-gray-100 dm-overflow-hidden"
                  )}
                >
                  <img
                    src={file.source}
                    alt=""
                    className={classNames(
                      file.current ? "" : "group-hover:dm-opacity-75",
                      "dm-object-cover dm-pointer-events-none"
                    )}
                  />
                  <button
                    type="button"
                    className="dm-absolute dm-inset-0 focus:dm-outline-none"
                  >
                    <span className="dm-sr-only">
                      View details for {file.name}
                    </span>
                  </button>
                </div>
                <p className="dm-mt-2 dm-block dm-text-sm dm-font-medium dm-text-gray-900 dm-truncate dm-pointer-events-none">
                  {file.name}
                </p>
                <p className="dm-block dm-text-sm dm-font-medium dm-text-gray-500 dm-pointer-events-none">
                  {file.size}
                </p>
              </li>
            ))} */}
            </ul>
          </section>
        </div>
      </main>

      {/* Details sidebar */}
      {currentMedia && <MediaDetailsSidebar media={currentMedia} footer={sidebarFooter} />}
    </div>
  );
};
