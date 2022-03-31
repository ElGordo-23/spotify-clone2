import { useEffect, useState } from 'react';
import { Login } from '../API/login';
import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';

export function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <button
          onClick={() => {
            logout();
            refreshPage();
          }}
        >
          Logout
        </button>
      )}
      <NewReleases />
      <SearchArtists />
    </div>
  );
}
