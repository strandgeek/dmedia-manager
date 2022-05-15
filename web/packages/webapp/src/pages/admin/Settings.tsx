import { AdminLayout } from "../../layouts/Admin";
import { useProject } from "src/hooks/useProject";
import { DescriptionList, DescriptionListItem } from "src/components/DescriptionList";
import { ExternalLinkIcon } from "@heroicons/react/outline";


export const AdminSettings = () => {
  const { project } = useProject()
  if (!project) {
    return null;
  }
  const header = (
    <div className="h-full flex items-center">
      <h1>
        Settings
      </h1>
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
                  <a href="" className="flex items-center text-blue-500">
                    React
                    <ExternalLinkIcon  className="w-4 h-4 ml-1" />
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
            <DescriptionListItem label="Method">
              On-Chain
            </DescriptionListItem>
            <DescriptionListItem label="Contract Address">
              <a href="" className="text-blue-500">
                0x000..000
              </a>
              {/* TODO: Create Smart Contract Configuration Wizzard */}
            </DescriptionListItem>
          </DescriptionList>
        </div>
      </div>
    </AdminLayout>
  );
};
