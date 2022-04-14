import { Link } from 'react-router-dom';
import { useDeleteSong } from '../API/deleteUserLikedSong';
import { useUserSavedTracks } from '../API/getUserSavedTracks';
import { usePlayerControls } from '../Components/PlayerControlsProvider';

export function UserSavedTracks() {
  const { data: savedTracks } = useUserSavedTracks();
  const { mutate } = useDeleteSong();

  const { setSongQueue } = usePlayerControls();

  console.log(savedTracks?.items[0].track.id);

  return (
    <>
      <div className="mt-4 ml-4">
        <h2 className="font-extrabold text-6xl text-white">Saved Tracks</h2>
        <ul>
          {savedTracks
            ? savedTracks.items?.map((track) => (
                <li className="flex gap-2 group" key={track.track.id}>
                  <img
                    src={track.track.album.images[0].url}
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
                        trackId: track.track.id,
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
      </div>
    </>
  );
}
