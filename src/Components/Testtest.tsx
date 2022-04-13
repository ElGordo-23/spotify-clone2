import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';

type DescriptionType = {
  description: string;
};

export default function Expand({ description }: DescriptionType) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full text-white">
            <ChevronDownIcon className="w-5 h-5 ml-2 " aria-hidden="true" />
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
          <Menu.Items className="absolute w-96 mt-2 origin-top-right bg-slate-600 text-white rounded-md shadow-lg ring-1 ring-white z-30 p-4">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <span>{description}</span>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
