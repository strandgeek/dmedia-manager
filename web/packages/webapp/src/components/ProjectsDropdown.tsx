/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import { useProject } from "src/hooks/useProject";
import { useQuery } from "react-query";
import { getProjects } from "src/api/queries/project";
import { Project } from "src/types/project";
import { Link } from "react-router-dom";

export const ProjectsDropdown = () => {
  const { project, setProject } = useProject();
  const { data: projects } = useQuery("projects", getProjects);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-gray-50 py-2 px-4 rounded-full flex items-center text-gray-700 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Change project</span>
          {project?.name} <ChevronDownIcon className="w-4 h-4 ml-4" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {projects?.map((project: Project) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setProject(project)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm w-full text-left"
                    )}
                  >
                    {project.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/admin/create-project"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm w-full"
                    )}
                  >
                    <PlusIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Create Project
                  </Link>
                )}
              </Menu.Item>
            </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
