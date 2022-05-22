/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, ExclamationIcon, XIcon } from "@heroicons/react/outline";
import { Project } from "src/types/project";
import { useMutation } from "react-query";
import { validateAccessControlContract } from "src/api/mutations/utils";
import { updateProject } from "src/api/mutations/projects";
import { useProject } from "src/hooks/useProject";

const NETWORKS: any = {
  mainnet: "Mainnet",
  ropsten: "Ropsten",
  kovan: "Kovan",
  rinkeby: "Rinkeby",
  matic_mainnet: "Polygon (Mainnet)",
  matic_mumbai: "Polygon (Mumbai)",
};

export interface SetupAccessControlModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project?: Project;
}

export const ValidContractAlert: React.FC = () => (
  <div className="rounded-md bg-green-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-green-800">Contract Valid</p>
      </div>
    </div>
  </div>
)

export const InvalidContractAlert: React.FC = () => (
  <div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
    </div>
    <div className="ml-3">
      <div className="text-sm text-yellow-700 font-semibold">
        Invalid Smart Contract.
      </div>
      <p className="mt-2 text-sm text-yellow-700">
        Please make sure you selected the right network and the contract implements {' '}
        <a href="https://strand-geek.gitbook.io/dmedia-manager/access-control/access-control-interface" target="_blank" className="font-medium underline text-yellow-700 hover:text-yellow-600" rel="noreferrer">
          the Access Control Interface
        </a>
      </p>
    </div>
  </div>
</div>
  </div>
)

export const SetupAccessControlModal: FC<SetupAccessControlModalProps> = ({
  open,
  setOpen,
  project,
}) => {
  const { setProject } = useProject()
  const [network, setNetwork] = useState("mainnet");
  const [contractAddress, setContractAddress] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const validateMutation = useMutation(validateAccessControlContract)
  const saveMutation = useMutation(updateProject)
  const onNetworkSelectChange = (e: any) => {
    const network = e.target.value;
    setNetwork(network);
    validate(network, contractAddress);
  }
  const validate = async (network: string, contractAddress: string) => {
    const { valid } = await validateMutation.mutateAsync({
      contractAddress,
      network,
    })
    setIsValid(valid);
  }
  const onContractAddressChange = async (e: any) => {
    const contractAddress = e.target.value;
    setContractAddress(contractAddress);
    if (contractAddress.length === 42) {
      validate(network, contractAddress);
    }
  }
  const onSave = async () => {
    if (project) {
      const { project: updatedProject } = await saveMutation.mutateAsync({
        projectId: project?.id,
        accessControlContractNetwork: network,
        accessControlContractAddress: contractAddress,
      })
      setProject(updatedProject);
      setOpen(false);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Setup Access Control Smart Contract
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select the network and configure the contract address that
                      implements the{" "}
                      <a href="https://strand-geek.gitbook.io/dmedia-manager/access-control/access-control-interface" target="_blank" className="inline items-center text-blue-500" rel="noreferrer">
                        access control interface
                      </a>
                    </p>

                    <div className="my-4">
                      <div>
                        <label
                          htmlFor="country"
                          className="mb-1 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Network
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            value={network}
                            onChange={onNetworkSelectChange}
                            className="block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          >
                            {Object.keys(NETWORKS).map((value: string) => (
                              <option value={value}>{NETWORKS[value]}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="country"
                          className="mb-1 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Contract Address
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            value={contractAddress}
                            onChange={onContractAddressChange}
                            type="text"
                            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>


                      <div className="mt-4 min-h-[48px]">
                        {isValid !== null && !validateMutation.isLoading && contractAddress !== '' && (
                          <>
                            {isValid ? (
                              <ValidContractAlert />
                            ): (
                              <InvalidContractAlert />
                            )}
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={!isValid}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 disabled:bg-blue-300 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onSave()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
