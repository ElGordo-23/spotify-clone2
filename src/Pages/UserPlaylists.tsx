import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getUserPlaylists(axiosClient)
      .then((data) => setPlaylists(data))
      .catch((error) => console.log(error));
  }, [axiosClient]);

  return (
    <div>
      <h2 className="relative left-72 top-24 font-extrabold text-6xl">
        Playlists
      </h2>
      {playlists.map((playlist) => (
        <button
          className="relative left-72 top-28"
          onClick={() =>
            navigate(`/userPlaylists/${playlist.id}/${playlist.name}`)
          }
        >
          {playlist.name}
        </button>
      ))}
    </div>
  );
}
