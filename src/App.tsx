import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { useToken } from './API/useToken';
import { AxiosClientProvider } from './Components/AxiosClientProvider';
import { Login } from './Components/login';
import { NewReleases } from './Components/NewReleases';
import Player from './Components/Player';
import { PlayerControlsProvider } from './Components/PlayerControlsProvider';
import { Sidebar } from './Components/Sidebar';
import { Browse } from './Pages/Browse';
import { BrowseCategory } from './Pages/BrowseCategory';
import { Shows } from './Pages/Shows';
import { SingleAlbum } from './Pages/SingleAlbum';
import { SingleArtist } from './Pages/SingleArtist';
import { SinglePlaylist } from './Pages/SinglePlaylist';
import { SingleShow } from './Pages/SingleShow';
import { UserPlaylists } from './Pages/UserPlaylists';
import { UserProfile } from './Pages/UserProfile';
import { UserSavedTracks } from './Pages/UserSavedTracks';

const Layout: FC = ({ children }) => (
  <div className="flex flex-col md:flex-row">
    <Sidebar />

    <div className="">{children}</div>
  </div>
);

const queryClient = new QueryClient();

function App() {
  const { token } = useToken();
  return (
    <div className=" bg-slate-700 min-h-screen">
      <QueryClientProvider client={queryClient}>
        {!token ? (
          <Login />
        ) : (
          <AxiosClientProvider>
            <PlayerControlsProvider>
              <Router>
                <Routes>
                  <Route
                    element={
                      <Layout>
                        <Outlet />
                      </Layout>
                    }
                  >
                    <Route path="/" element={<NewReleases />} />
                    <Route
                      path="/artist/:artistId"
                      element={<SingleArtist />}
                    />
                    <Route path="/album/:albumId" element={<SingleAlbum />} />
                    <Route path="/shows" element={<Shows />} />
                    <Route path="/shows/:showId" element={<SingleShow />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route
                      path="/browse/:categoryId"
                      element={<BrowseCategory />}
                    />
                    <Route path="/userProfile" element={<UserProfile />} />
                    <Route
                      path="/userSavedTracks"
                      element={<UserSavedTracks />}
                    />

                    <Route path="/userPlaylists" element={<UserPlaylists />} />
                    <Route
                      path="/userPlaylists/:playlistId/:playlistName"
                      element={<SinglePlaylist />}
                    />
                  </Route>
                </Routes>
              </Router>
              <ReactQueryDevtools />
            </PlayerControlsProvider>
          </AxiosClientProvider>
        )}
      </QueryClientProvider>
    </div>
  );
}

export default App;
