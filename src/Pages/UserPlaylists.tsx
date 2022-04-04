import { useEffect, useState } from 'react';
import { getUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import { PlaylistTracks } from '../Components/SinglePlaylist';

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
  const [playlistId, setPlaylistId] = useState<string>('');

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
          onClick={() => setPlaylistId(playlist.id)}
        >
          {playlist.name}
        </button>
      ))}
      {playlistId ? <PlaylistTracks playlistId={playlistId} /> : null}
    </div>
  );
}
