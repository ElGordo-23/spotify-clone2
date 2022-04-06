import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

export type Tracks = {
  items: {
    track: {
      name: string;
      id: string;
      uri: string;
      artists: { name: string; id: string }[];
    };
  }[];
};

export const trackUriContext = createContext(
  window.localStorage.getItem('trackUri'),
);

export function SinglePlaylist() {
  const axiosClient = useAxiosClient();
  const { playlistId, playlistName } = useParams();

  // const [tracks, setTracks] = useState<Tracks[]>([]);

  const [trackUri, setTrackUri] = useState<string>('');

  const { data: tracks } = useQuery('getPlaylistTracks', () =>
    getPlaylistTracks(axiosClient, playlistId),
  );

  // useEffect(() => {
  //   getPlaylistTracks(axiosClient, playlistId)
  //     .then((data) => setTracks(data))
  //     .catch((error) => console.log(error));
  // }, [axiosClient, playlistId]);

  return (
    <div>
      <h2 className=" font-extrabold text-6xl text-white">{playlistName}</h2>

      <ul className="mt-5">
        {tracks
          ? tracks.map((track) => (
              <li className=" flex flex-col items-baseline mt-3">
                <button
                  className="text-white"
                  onClick={() => setTrackUri(track.track.uri)}
                >
                  {track.track.name}
                </button>
                <Link
                  className="text-white text-opacity-70"
                  to={`/artist/${track.track.artists[0].id}`}
                >
                  {track.track.artists[0].name}
                </Link>
              </li>
            ))
          : null}
      </ul>

      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}
