import { Link } from 'react-router-dom';
import { useToken } from '../API/useToken';
import Player from './Player';

export function Sidebar() {
  const { logout } = useToken();

  return (
    <div>
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/userProfile"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/userPlaylists"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Playlists</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Library</span>
              </Link>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="flex-1 ml-3 whitespace-nowrap"
                >
                  Sign Out
                </button>
              </a>
            </li>{' '}
          </ul>
        </div>
        <Player />
      </aside>
    </div>
  );
}
