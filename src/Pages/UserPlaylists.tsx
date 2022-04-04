import { useEffect, useState } from 'react';
import { getUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import { Playlists } from '../Components/Playlists';

export type Playlist = {
  name: string;
  id: string;
  images: { url: string }[];
  items: { name: string; tracks: {} }[];
  tracks: { href: string };
};

export function UserPlaylists() {
  const axiosClient = useAxiosClient();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getUserPlaylists(axiosClient)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [axiosClient]);

  return (
    <div>
      <h2 className="relative left-72 top-24 font-extrabold text-6xl">
        Playlists
      </h2>
    </div>
  );
}
