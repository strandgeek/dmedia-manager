import { AdminLayout } from "../../layouts/Admin";
import { useProject } from "src/hooks/useProject";
import {
  DescriptionList,
  DescriptionListItem,
} from "src/components/DescriptionList";
import { CogIcon, ExternalLinkIcon, PencilAltIcon, PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { SetupAccessControlModal } from "src/components/SetupAcessControlModal";
import { getEtherscanBaseUrl, getShortAddress } from "src/utils/web3";
import { capitalizeFirstLetter } from "src/utils/string";

export const AdminSettings = () => {
  const [setupAccessControlOpen, setSetupAccessControlOpen] = useState(false);
  const { project } = useProject();
  if (!project) {
    return null;
  }
  const { accessControlContractNetwork, accessControlContractAddress } =
    project;
  const header = (
    <div className="h-full flex items-center">
      <h1>Settings</h1>
    </div>
  );
  return (
    <AdminLayout header={header}>
      <div className="max-w-7xl mx-auto w-[640px]">
        <div className="mt-8">
          <DescriptionList
            title="Development & Integration"
            description="Integrate dMedia Manager Picker with your dApp"
          >
            <DescriptionListItem label="Project ID">
              {project.id}
            </DescriptionListItem>
            <DescriptionListItem label="Platforms">
              <ul>
                <li className="mb-4">
                  <a target="_blank" href="https://www.npmjs.com/package/react-dmedia-manager" className="flex items-center text-blue-500" rel="noreferrer">
                    React
                    <ExternalLinkIcon className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  Vue <span className="text-gray-500">(Comming Soon)</span>
                </li>
              </ul>
            </DescriptionListItem>
          </DescriptionList>
        </div>

        <div className="mt-8">
          <DescriptionList
            title="Access Management"
            description="Define how you want to allow users access to project media"
          >
            {accessControlContractNetwork && accessControlContractAddress ? (
              <>
                <DescriptionListItem label="Network">
                  {capitalizeFirstLetter(accessControlContractNetwork)}
                </DescriptionListItem>
                <DescriptionListItem label="Contract Address">
                  <div className="flex justify-between">
                    <a
                      href={`${getEtherscanBaseUrl(accessControlContractNetwork)}/address/${accessControlContractAddress}`}
                      className="text-blue-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {getShortAddress(accessControlContractAddress)}
                    </a>
                    <button onClick={() => setSetupAccessControlOpen(true)}>
                      <PencilIcon className="h-4 w-4 text-gray-500"/>
                    </button>
                  </div>
                </DescriptionListItem>
              </>
            ) : (
              <div className="p-4">
                <div className="py-4 text-center text-gray-500 text-sm">
                  Access control smart contract not yet configured
                </div>
                <button
                  type="button"
                  onClick={() => setSetupAccessControlOpen(true)}
                  className="w-full text-center justify-center inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CogIcon className="w-6 h-6 mr-2" />
                  Setup Smart Contract
                </button>
              </div>
            )}
          </DescriptionList>
        </div>
        <SetupAccessControlModal
          open={setupAccessControlOpen}
          setOpen={setSetupAccessControlOpen}
          project={project}
        />
      </div>
    </AdminLayout>
  );
};
