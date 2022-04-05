import { createContext, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Tracks = {
  track: {
    name: string;
    id: string;
    uri: string;
    artists: { name: string; id: string }[];
  };
};

export const trackUriContext = createContext(
  window.localStorage.getItem('trackUri'),
);

export function SinglePlaylist() {
  const axiosClient = useAxiosClient();
  const { playlistId, playlistName } = useParams();

  const [tracks, setTracks] = useState<Tracks[]>([]);

  const [trackUri, setTrackUri] = useState<string>('');

  useEffect(() => {
    getPlaylistTracks(axiosClient, playlistId)
      .then((data) => setTracks(data))
      .catch((error) => console.log(error));
  }, [axiosClient, playlistId]);

  const storeTrackUri = (trackUri: string) => {
    setTrackUri(trackUri);
    window.localStorage.setItem('trackUri', trackUri);
  };

  return (
    <div>
      <h2 className=" font-extrabold text-6xl text-white">{playlistName}</h2>
      <div className="">
        <ul>
          {tracks
            ? tracks.map((track) => (
                <li
                  key={track.track.id}
                  className="flex flex-row justify-between text-white"
                >
                  <button onClick={() => storeTrackUri(track.track.uri)}>
                    {track.track.name}
                  </button>
                  <Link to={`/artist/${track.track.artists[0].id}`}>
                    {track.track.artists[0].name}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
