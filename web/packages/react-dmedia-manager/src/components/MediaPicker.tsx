/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MediaGallery } from './ui/MediaGallery'
import { ReactQueryProvider } from '../providers/ReactQuery'
import { Media } from '../types/media'

export const MediaPickerBase = () => {
  const [open, setOpen] = useState(true)
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);

  const footer = (
    <button
    type="button"
    className="dm-bg-indigo-600 dm-py-4 dm-w-full dm-px-4 dm-border dm-border-transparent dm-rounded-md dm-shadow-sm dm-text-sm dm-font-medium dm-text-white hover:dm-bg-indigo-700 focus:dm-outline-none focus:dm-ring-2 focus:dm-ring-offset-2 focus:dm-ring-indigo-500"
  >
    Select Media
  </button>
  );

  return (
    <Transition.Root show={open} as={Fragment}>
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

          {/* This element is to trick the browser into centering the modal dm-contents. */}
          <span className="dm-hidden sm:dm-inline-block sm:dm-align-middle sm:dm-h-screen" aria-hidden="true">
            &#8203;
          </span>
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
              <MediaGallery currentMedia={currentMedia} setCurrentMedia={setCurrentMedia} sidebarFooter={footer} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


export const MediaPicker = () => {
  return (
    <ReactQueryProvider>
      <MediaPickerBase />
    </ReactQueryProvider>
  );
}
