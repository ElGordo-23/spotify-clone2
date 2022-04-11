import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  useAddTrackToPlaylist,
  useUserPlaylists,
} from '../API/getUserPlaylists';

type DropDownProps = {
  trackUri: string;
};

export function PlaylistSelector({ trackUri }: DropDownProps) {
  const { data: playlist } = useUserPlaylists();

  const { mutate } = useAddTrackToPlaylist();
  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <Popover.Button>
            <span>+</span>
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
                <div className="p-4 bg-slate-600 text-white flex flex-col w-64 h-64 overflow-auto items-baseline">
                  <button className="hover:bg-gray-500 rounded">
                    Add To Queue
                  </button>
                  {playlist?.items.map((playlist) => (
                    <ul>
                      <li>
                        <button
                          className="hover:bg-gray-500 rounded"
                          onClick={() =>
                            mutate({ playlistId: playlist.id, trackUri })
                          }
                        >
                          {playlist.name}
                        </button>
                      </li>
                    </ul>
                  ))}
                </div>
                <br />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
