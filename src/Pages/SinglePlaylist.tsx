import { Link, useParams } from 'react-router-dom';
import { useDeleteSongFromPlaylist } from '../API/deleteSongFromPlaylist';
import { usePlaylistTracks } from '../API/getUserPlaylists';
import { usePlayerControls } from '../Components/PlayerControlsProvider';

export function SinglePlaylist() {
  const { playlistId, playlistName } = useParams();
  const { mutate } = useDeleteSongFromPlaylist();

  const { setTrackUri, setSongQueue } = usePlayerControls();

  const { data: tracks } = usePlaylistTracks(playlistId);

  const getAllUris = () => {
    const allUris: string[] = [];
    tracks?.map((track) => allUris.push(track.track.uri));
    return allUris;
  };

  return (
    <div className="ml-4 mt-4">
      <h2 className=" font-extrabold text-6xl text-white">{playlistName}</h2>
      <button
        onClick={() => {
          setSongQueue(getAllUris());
        }}
        className="text-white"
      >
        Play all
      </button>

      <ul className="mt-5">
        {tracks
          ? tracks.map((track) => (
              <li className="flex gap-2" key={track.track.id}>
                <img
                  src={track.track.album.images[2].url}
                  alt="Album Cover"
                  className="w-12 h-12 mt-3 object-cover"
                />
                <div className="flex flex-col items-baseline mt-3">
                  <button
                    className="text-white hover:bg-gray-500 rounded"
                    onClick={() => {
                      setTrackUri(track.track.uri);
                      setSongQueue(undefined);
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
                  className="text-white cursor-pointer"
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
