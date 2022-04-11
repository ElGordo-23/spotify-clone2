import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useNewPlaylist } from '../API/createNewPlaylist';

export function CreateNewPlaylist() {
  const { mutate } = useNewPlaylist();
  const [playlistName, setPlaylistName] = useState<string>('');

  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <Popover.Button>
            <span className="font-extrabold text-3xl text-white">+</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 ">
              <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                <div className="p-4 bg-slate-600 text-white flex flex-col w-64">
                  <input
                    className="text-black"
                    placeholder="Playlist Name"
                    onChange={(e) => setPlaylistName(e.currentTarget.value)}
                  />
                </div>
                <button
                  className="bg-slate-600 w-64 text-center text-white mb-1 hover:bg-gray-500 rounded"
                  onClick={() => mutate({ playlistName })}
                >
                  Create Playlist
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
