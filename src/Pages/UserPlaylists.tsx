import { Link, useNavigate } from 'react-router-dom';
import { useUserPlaylists } from '../API/getUserPlaylists';
import { CreateNewPlaylist } from '../Components/CreateNewPlaylist';

export function UserPlaylists() {
  const { data: playlists } = useUserPlaylists();
  const navigate = useNavigate();

  return (
    <div className="mt-4 ml-4">
      <div className="flex items-center">
        <h2 className="font-extrabold text-6xl z-20 text-white">Playlists</h2>
        <CreateNewPlaylist />
      </div>
      <div className="grid grid-cols-4 gap-24 items-center text-white">
        {playlists?.items.map((playlist) => (
          <div key={playlist.id} className="w-32 text-center h-32 ">
            <div className="p-2 hover:bg-gray-500 rounded w-[128px] h-[176px] overflow-hidden">
              <img
                className="p-1"
                src={playlist?.images[0]?.url}
                alt="Release"
                onClick={() =>
                  navigate(`/userPlaylists/${playlist.id}/${playlist.name}`)
                }
              />

              <Link to={`/userPlaylists/${playlist.id}/${playlist.name}`}>
                <span>{playlist.name}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
