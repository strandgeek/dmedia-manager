/* This example requires Tailwind CSS v2.0+ */
import { FC, ReactNode } from 'react';


interface DescriptionListProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export const DescriptionList: FC<DescriptionListProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {title && (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        </div>
      )}
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {children}
        </dl>
      </div>
    </div>
  )
}

interface DescriptionListItemProps {
  label: string;
  children: ReactNode;
}

export const DescriptionListItem: FC<DescriptionListItemProps> = ({ label, children }) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {children}
    </dd>
  </div>
)
