import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

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
      .then((data) => setPlaylists(data))
      .catch((error) => console.log(error));
  }, [axiosClient]);

  return (
    <div>
      <h2 className="relative left-72 top-24 font-extrabold text-6xl text-white">
        Playlists
      </h2>{' '}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <Link
              to={`/userPlaylists/${playlist.id}/${playlist.name}`}
              className="relative left-72 top-28 text-white"
            >
              {playlist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
