import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useToken } from './API/useToken';
import { AxiosClientProvider } from './Components/AxiosClientProvider';
import { Home } from './Components/Home';
import { Login } from './Components/login';
import { Sidebar } from './Components/Sidebar';
import { SingleArtist } from './Pages/SingleArtist';
import { UserPlaylists } from './Pages/UserPlaylists';
import { UserProfile } from './Pages/UserProfile';

function App() {
  const { token } = useToken();

  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <AxiosClientProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artist/:artistId" element={<SingleArtist />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/userPlaylists" element={<UserPlaylists />} />
            </Routes>
            <Sidebar />
          </Router>
        </AxiosClientProvider>
      )}
    </div>
  );
}

export default App;
