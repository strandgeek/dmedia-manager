import classNames from "classnames";
import { AdminLayout } from "../../layouts/Admin";
import {
  SearchIcon,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/react/solid";
import { MediaDetailsSidebar } from "../../components/MediaDetailsSidebar";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { uploadMediaMutation } from "../../api/mutations/medias";
import { v4 as uuidv4 } from 'uuid';
import { MediaCard } from "../../components/MediaCard";
import { Media } from "../../types/media";
import { getMedias } from "../../api/queries/medias";

const tabs = [
  { name: "All Medias", href: "#", current: true },
  { name: "Favorited", href: "#", current: false },
];

const files = [
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  // More files...
];

interface UploadProgressInfo {
  id: string;
  file: File
  progress: number
}

export const AdminIndex = () => {
  const uploadMedias = useMutation(uploadMediaMutation);
  const { data: medias, isLoading, refetch: refetchMedias } = useQuery('medias', getMedias)
  const [uploadProgressInfoList, setUploadProgressInfoList] = useState<UploadProgressInfo[]>([])
  const removeUploadItemById = (id: string) => {
    setUploadProgressInfoList(infoList => {
      const i = infoList.findIndex(info => info.id === id);
      infoList.splice(i, 1);
      return [...infoList];
    })
  }
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const id = uuidv4()
      setUploadProgressInfoList(infoList => {
        const info = {
          id,
          file,
          progress: 0,
        }
        return [info, ...infoList];
      })
      uploadMedias.mutateAsync({
        file,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgressInfoList(infoList => {
            const i = infoList.findIndex(info => info.id === id);
            infoList[i].progress = progress;
            return [...infoList];
          })
        },
      }).then(res => {
        removeUploadItemById(id);
        refetchMedias();
      })
    })
  }, [refetchMedias, uploadMedias]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });
  if (isLoading) {
    return null;
  }
  const header = (
    <form className="w-full flex md:ml-0" action="#" method="GET">
      <label htmlFor="desktop-search-field" className="sr-only">
        Search all medias
      </label>
      <label htmlFor="mobile-search-field" className="sr-only">
        Search all medias
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        </div>
        <input
          name="mobile-search-field"
          id="mobile-search-field"
          className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
          placeholder="Search"
          type="search"
        />
        <input
          name="desktop-search-field"
          id="desktop-search-field"
          className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
          placeholder="Search all files"
          type="search"
        />
      </div>
    </form>
  );
  return (
    <AdminLayout header={header}>
      <div
        className="flex-1 flex items-stretch overflow-hidden"
      >
        <main className="flex-1 overflow-y-auto relative h-full" {...getRootProps()}>
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
                      <p className="pl-1 text-lg">Drop you media file here to start uploading</p>
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
              <h1 className="flex-1 text-2xl font-bold text-gray-900">
                Medias
              </h1>
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

            {/* Tabs */}
            <div className="mt-3 sm:mt-2">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="All Medias"
                >
                  <option>All Medias</option>
                  <option>Favorited</option>
                </select>
              </div>
              <input {...getInputProps()} />
              <div className="hidden sm:block">
                <div className="flex items-center border-b border-gray-200">
                  <nav
                    className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? "page" : undefined}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        )}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                  <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
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
                      <ViewGridIconSolid
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Use grid view</span>
                    </button>
                  </div>
                </div>
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
                    ipfsCID: '',
                    createdAt: new Date(),
                  }
                  return (
                    <MediaCard isUploading uploadProgress={info.progress} media={media} />
                  );
                })}
                {medias && medias.map((media) => {
                  return (
                    <MediaCard media={media} />
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
        <MediaDetailsSidebar
          media={{
            id: "1234",
            name: "My Test",
            mimetype: "application/png",
            sizeInBytes: 1000,
            ipfsCID: "QmeWanvFEs619BE4VpkHGg94U4NhbVhRRuHVV2p5cohKtP",
            createdAt: new Date(),
          }}
        />
      </div>
    </AdminLayout>
  );
};
