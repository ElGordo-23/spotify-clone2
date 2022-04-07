import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlaylistTracks } from '../API/getUserPlaylists';
import Player from '../Components/Player';

export function SinglePlaylist() {
  const { playlistId, playlistName } = useParams();

  const [trackUri, setTrackUri] = useState<string>('');

  const { data: tracks } = usePlaylistTracks(playlistId);

  return (
    <div className="ml-4 mt-4">
      <h2 className=" font-extrabold text-6xl text-white">{playlistName}</h2>

      <ul className="mt-5">
        {tracks
          ? tracks.map((track) => (
              <li className="flex gap-2">
                <img
                  src={track.track.album.images[2].url}
                  alt="Album Cover"
                  className="w-12 h-12 mt-3 object-cover"
                />
                <div className="flex flex-col items-baseline mt-3">
                  <button
                    className="text-white hover:bg-gray-500 rounded"
                    onClick={() => setTrackUri(track.track.uri)}
                  >
                    {track.track.name}
                  </button>
                  <Link
                    className="text-white text-opacity-70 hover:bg-gray-500 rounded"
                    to={`/artist/${track.track.artists[0].id}`}
                  >
                    {track.track.artists[0].name}
                  </Link>
                </div>
              </li>
            ))
          : null}
      </ul>

      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}
