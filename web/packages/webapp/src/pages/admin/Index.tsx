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
import { MediaGallery } from "react-dmedia-manager"
import { Media } from "../../types/media";
import { getMedias } from "../../api/queries/medias";
import { MenuSidebar } from "src/components/MenuSidebar";

interface UploadProgressInfo {
  id: string;
  file: File
  progress: number
}

export const AdminIndex = () => {
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const uploadMedias = useMutation(uploadMediaMutation);
  const { data: medias, isLoading, refetch: refetchMedias } = useQuery('medias', getMedias)
  const [uploadProgressInfoList, setUploadProgressInfoList] = useState<UploadProgressInfo[]>([])
  // useEffect(() => {
  //   if (previewUrl) {
  //     setToggler(true);
  //   }
  // }, [previewUrl])
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
  const { getRootProps, isDragActive } = useDropzone({
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
      <MediaGallery />
    </AdminLayout>
  );
};
