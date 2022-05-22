import { useState } from "react";
import Web3 from "web3";
import { generateSignRequest, auth } from "../api/mutations/auth";
import { Media } from "../types/media";
import { useAxios } from "./useAxios";


export interface MediaPickerInstanceInternal {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setSelectedMedia: (media: Media | null) => void;
  apiUrl: string;
  accessToken: string;
  projectId: string;
}

export interface MediaPickerInstance {
  open: () => void;
  selectedMedia: Media | null;
  _internal: MediaPickerInstanceInternal;
}

interface UseMediaPickerOptions {
  web3?: Web3 | null;
  apiUrl: string;
  projectId: string;
}

interface UseMediaPicker {
  mediaPicker: MediaPickerInstance,
}

export const useMediaPicker = ({ web3, apiUrl, projectId }: UseMediaPickerOptions): UseMediaPicker => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const client = useAxios({
    baseURL: apiUrl,
    accessToken,
  })
  const authUser = async () => {
    if (!web3) {
      return;
    }
    try {
      const accounts = await web3.eth.requestAccounts()
      const account = accounts[0];
      const signRequest = await generateSignRequest(client)({
        address: account,
      });
      // @ts-ignore
      const signature = await web3?.eth.personal.sign(
        signRequest.message,
        account
      );
      const { accessToken } = await auth(client)({
        address: account,
        signature: signature!,
      });
      setAccessToken(accessToken);
    } catch (error) {
      throw error;
    }
  }
  
  const mediaPicker: MediaPickerInstance = {
    open: async () => {
      if (accessToken === '') {
        await authUser();
      }
      setIsOpen(true);
    },
    selectedMedia,
    _internal: {
      projectId,
      accessToken,
      apiUrl,
      isOpen,
      setIsOpen,
      setSelectedMedia,
    },
  };

  return {
    mediaPicker,
  }
}
