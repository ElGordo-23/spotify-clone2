import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export function UserPlaylists() {
  const axiosClient = useAxiosClient();

  const { data: playlists } = useQuery('getPlaylists', () =>
    getUserPlaylists(axiosClient),
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-extrabold text-6xl z-20 text-white">Playlists</h2>
      <div className="relative mt-4 ml-4">
        <ul className="text-white mt-5">
          {playlists?.map((playlist) => (
            <Link to={`/userPlaylists/${playlist.id}/${playlist.name}`}>
              <li key={playlist.id} className="hover:bg-gray-500 rounded">
                {playlist.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
