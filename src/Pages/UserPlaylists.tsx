import { Link } from 'react-router-dom';
import { useUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export function UserPlaylists() {
  const axiosClient = useAxiosClient();

  const { data: playlists } = useUserPlaylists();

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-extrabold text-6xl z-20 text-white">Playlists</h2>
      <div className="relative mt-4 ml-4">
        <ul className="text-white mt-5">
          {playlists?.map((playlist) => (
            <li key={playlist.id} className="hover:bg-gray-500 rounded">
              <Link to={`/userPlaylists/${playlist.id}/${playlist.name}`}>
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
