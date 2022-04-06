import { FC } from 'react';
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { useToken } from './API/useToken';
import { AxiosClientProvider } from './Components/AxiosClientProvider';
import { Home } from './Components/Home';
import { Login } from './Components/login';
import { Sidebar } from './Components/Sidebar';
import { SingleAlbum } from './Pages/SingleAlbum';
import { SingleArtist } from './Pages/SingleArtist';
import { SinglePlaylist } from './Pages/SinglePlaylist';
import { UserPlaylists } from './Pages/UserPlaylists';
import { UserProfile } from './Pages/UserProfile';

const Layout: FC = ({ children }) => (
  <div className="flex flex-col md:flex-row">
    <Sidebar />
    <div className="">{children}</div>
  </div>
);

function App() {
  const { token } = useToken();
  return (
    <div className=" bg-slate-700 " style={{ height: '100vh', width: '100vw' }}>
      {!token ? (
        <Login />
      ) : (
        <AxiosClientProvider>
          <Router>
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/artist/:artistId" element={<SingleArtist />} />
                <Route path="/album/:albumId" element={<SingleAlbum />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/userPlaylists" element={<UserPlaylists />} />
                <Route
                  path="/userPlaylists/:playlistId/:playlistName"
                  element={<SinglePlaylist />}
                />
              </Route>
            </Routes>
          </Router>
        </AxiosClientProvider>
      )}
    </div>
  );
}

export default App;
