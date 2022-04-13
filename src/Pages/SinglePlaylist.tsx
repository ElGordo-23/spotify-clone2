import { PlayIcon } from '@heroicons/react/solid';
import { Link, useParams } from 'react-router-dom';
import { useDeleteSongFromPlaylist } from '../API/deleteSongFromPlaylist';
import { usePlaylistTracks } from '../API/getUserPlaylists';
import { usePlayerControls } from '../Components/PlayerControlsProvider';

export function SinglePlaylist() {
  const { playlistId, playlistName } = useParams();
  const { mutate } = useDeleteSongFromPlaylist();

  const { setSongQueue } = usePlayerControls();

  const { data: tracks } = usePlaylistTracks(playlistId);

  const getAllUris = () => {
    const allUris: string[] = [];
    tracks?.map((track) => allUris.push(track.track.uri));
    return allUris;
  };

  return (
    <div className="ml-4 mt-4">
      <div className="flex">
        <h2 className="font-extrabold text-6xl text-white">{playlistName}</h2>
        <button
          onClick={() => {
            setSongQueue(getAllUris());
          }}
          className="text-white"
        >
          <PlayIcon className="w-10 h-10 ml-4 mt-2" />
        </button>
      </div>

      <ul className="mt-5">
        {tracks
          ? tracks.map((track) => (
              <li className="flex gap-2 group" key={track.track.id}>
                <img
                  src={track.track.album.images[2].url}
                  alt="Album Cover"
                  className="w-12 h-12 mt-3 object-cover"
                />
                <div className="flex flex-col items-baseline mt-3">
                  <button
                    className="text-white hover:bg-gray-500 rounded"
                    onClick={() => {
                      setSongQueue(track.track.uri);
                    }}
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

                <span
                  onClick={() =>
                    mutate({
                      playlistId: playlistId,
                      trackUri: track.track.uri,
                    })
                  }
                  className="text-white cursor-pointer mt-6 ml-6 opacity-0 group-hover:opacity-100"
                >
                  x
                </span>
              </li>
            ))
          : null}
      </ul>

      <br />
    </div>
  );
}
