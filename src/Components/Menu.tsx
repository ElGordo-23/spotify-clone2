import { Menu, Transition } from '@headlessui/react';
import {
  useAddTrackToPlaylist,
  useUserPlaylists,
} from '../API/getUserPlaylists';

type DropDownProps = {
  trackUri: string;
  songQueue: string[];
};

export function PlaylistSelector({ trackUri, songQueue }: DropDownProps) {
  const { data: playlist } = useUserPlaylists();

  console.log(songQueue);

  const { mutate } = useAddTrackToPlaylist();
  return (
    <Menu>
      <Menu.Button>+</Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="flex flex-col ">
          {playlist?.items.map((playlist) => (
            <Menu.Item>
              {({ active }) => (
                <>
                  <button
                    className={`${active && 'bg-blue-500'}`}
                    onClick={() =>
                      mutate({ playlistId: playlist.id, trackUri })
                    }
                  >
                    {playlist.name}
                  </button>{' '}
                  <button onClick={() => songQueue.push(trackUri)}>
                    Add To Queue
                  </button>
                </>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
