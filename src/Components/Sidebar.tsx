import { Link } from 'react-router-dom';
import { useToken } from '../API/useToken';
import { AxiosClientProvider } from './AxiosClientProvider';

export function Sidebar() {
  const { logout } = useToken();

  return (
    <div className="absolute inset-y-0 left-0 top-32">
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
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  3
                </span>
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

            <AxiosClientProvider>
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
              </li>
            </AxiosClientProvider>
          </ul>
        </div>
      </aside>
    </div>
  );
}
