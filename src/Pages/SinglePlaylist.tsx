import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Tracks = {
  track: { name: string; id: string; artists: { name: string; id: string }[] };
};

export function SinglePlaylist() {
  const axiosClient = useAxiosClient();
  const { playlistId } = useParams();
  const { playlistName } = useParams();

  const [tracks, setTracks] = useState<Tracks[]>([]);

  useEffect(() => {
    getPlaylistTracks(axiosClient, playlistId)
      .then((data) => setTracks(data))
      .catch((error) => console.log(error));
  }, [axiosClient, playlistId]);

  console.log(tracks[0]);

  return (
    <div>
      <h2 className="relative left-72 top-24 font-extrabold text-6xl">
        {playlistName}
      </h2>{' '}
      <div className="absolute left-72 top-48 w-24 h-80">
        {tracks
          ? tracks.map((track) => (
              <ul>
                <li key={track.track.id}>
                  <p>{track.track.name}</p>
                  <Link to={`/artist/${track.track.artists[0].id}`}>
                    {track.track.artists[0].name}
                  </Link>
                </li>
              </ul>
            ))
          : null}
      </div>
    </div>
  );
}
