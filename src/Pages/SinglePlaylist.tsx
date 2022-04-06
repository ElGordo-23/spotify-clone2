import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

export function SinglePlaylist() {
  const axiosClient = useAxiosClient();
  const { playlistId, playlistName } = useParams();

  const [trackUri, setTrackUri] = useState<string>('');

  const { data: tracks } = useQuery('getPlaylistTracks', () =>
    getPlaylistTracks(axiosClient, playlistId),
  );

  console.log(tracks);

  return (
    <div>
      <h2 className=" font-extrabold text-6xl text-white">{playlistName}</h2>

      <ul className="mt-5">
        {tracks
          ? tracks.map((track) => (
              <div className="grid grid-cols-2">
                <img
                  src={track.track.album.images[2].url}
                  alt="Album Cover"
                  className="h-5 w-5 object-cover"
                />
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
              </div>
            ))
          : null}
      </ul>

      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}
