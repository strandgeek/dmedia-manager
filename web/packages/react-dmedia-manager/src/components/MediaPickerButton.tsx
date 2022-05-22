/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MediaGallery } from './ui/MediaGallery'
import { ReactQueryProvider } from '../providers/ReactQuery'
import { Media } from '../types/media'
import Web3 from 'web3'
import { auth, generateSignRequest } from '../api/mutations/auth'
import { useAxios } from '../hooks/useAxios'


interface MediaPickerProps {
  web3: Web3;
  projectId: string;
  onMediaSelect: (media: Media) => void;
  apiUrl: string;
}

export const MediaPickerBase: FC<MediaPickerProps> = ({
  projectId,
  onMediaSelect,
  web3,
  apiUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const client = useAxios({
    baseURL: apiUrl,
    accessToken,
  })
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const signAuth = async () => {
    try {
      const accounts = await web3.eth.requestAccounts()
      const account = accounts[0];
      console.log(account);
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
  };

  const footer = (
    <button
    type="button"
    className="dm-bg-indigo-600 dm-py-4 dm-w-full dm-px-4 dm-border dm-border-transparent dm-rounded-md dm-shadow-sm dm-text-sm dm-font-medium dm-text-white hover:dm-bg-indigo-700 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-offset-2 focus:dm-ring-indigo-500"
    onClick={() => {
      if (currentMedia) {
        onMediaSelect(currentMedia);
        setOpen(false);
      }
    }}
  >
    Select Media
  </button>
  );

  const onSelectMediaClick = async () => {
    if (!accessToken) {
      setLoadingModal(true);
      try {
        setOpen(true);
        await signAuth();
      } catch (error) {
        console.log(error);
        setOpen(false);
      }
      setLoadingModal(false);
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => onSelectMediaClick()}
        className="dm-w-full dm-justify-center dm-flex dm-items-center dm-px-6 dm-py-3 dm-border dm-border-gray-300 dm-shadow-sm dm-text-base dm-font-medium dm-rounded-md dm-text-gray-700 dm-bg-white hover:dm-bg-gray-50 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-offset-2 focus:dm-ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className='dm-w-4 dm-h-4 dm-mr-2' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Select Media...
      </button>
      <Transition.Root show={open && !loadingModal} as={Fragment}>
        <Dialog as="div" className="dm-fixed dm-z-10 dm-inset-0 dm-overflow-y-auto" onClose={setOpen}>
          <div className="dm-flex dm-items-end dm-justify-center dm-min-h-screen dm-pt-2 dm-px-4 dm-pb-20 dm-text-center sm:dm-block sm:dm-p-0">
            <Transition.Child
              as={Fragment}
              enter="dm-ease-out dm-duration-300"
              enterFrom="dm-opacity-0"
              enterTo="dm-opacity-100"
              leave="dm-ease-in dm-duration-200"
              leaveFrom="dm-opacity-100"
              leaveTo="dm-opacity-0"
            >
              <Dialog.Overlay className="dm-fixed dm-inset-0 dm-bg-gray-500 dm-bg-opacity-75 dm-transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="dm-ease-out dm-duration-300"
              enterFrom="dm-opacity-0 dm-translate-y-4 sm:dm-translate-y-0 sm:dm-scale-95"
              enterTo="dm-opacity-100 dm-translate-y-0 sm:dm-scale-100"
              leave="dm-ease-in dm-duration-200"
              leaveFrom="dm-opacity-100 dm-translate-y-0 sm:dm-scale-100"
              leaveTo="dm-opacity-0 dm-translate-y-4 sm:dm-translate-y-0 sm:dm-scale-95"
            >
              <div className="dm-inline-block dm-align-bottom dm-bg-white dm-rounded-lg dm-text-left dm-overflow-hidden dm-shadow-xl dm-transform dm-transition-all sm:dm-my-4 sm:dm-align-middle sm:dm-max-w-5xl sm:dm-w-full">
                {accessToken !== '' && (
                  <MediaGallery
                    projectId={projectId}
                    currentMedia={currentMedia}
                    setCurrentMedia={setCurrentMedia}
                    sidebarFooter={footer}
                    accessToken={accessToken}
                    apiUrl={apiUrl}
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}


export const MediaPicker: FC<MediaPickerProps> = (props) => {
  return (
    <ReactQueryProvider>
      <MediaPickerBase {...props} />
    </ReactQueryProvider>
  );
}
