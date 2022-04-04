import { useEffect, useState } from 'react';
import { getPlaylistTracks } from '../API/getUserPlaylists';
import { useAxiosClient } from './AxiosClientProvider';

type PlaylistId = {
  playlistId: string;
};

type Track = {
  id: string;
  name: string;
  artist: { name: string }[];
};

export function PlaylistTracks({ playlistId }: PlaylistId) {
  const axiosClient = useAxiosClient();

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    getPlaylistTracks(axiosClient, playlistId)
      .then((data) => setTracks(data))
      .catch((error) => console.log(error));
  }, [axiosClient, playlistId]);

  return (
    <div>
      {tracks
        ? tracks.map((track) => (
            <ul>
              <li key={track.id}>
                <p>{track.artist[0].name}</p>
              </li>
            </ul>
          ))
        : null}
    </div>
  );
}
