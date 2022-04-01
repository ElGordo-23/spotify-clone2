import { createContext, useEffect, useState } from 'react';
import { Login } from './Components/login';

import { Home } from '../src/Components/Home';

export const Context = createContext();

function App() {
  const [accessToken, setAccessToken] = useState('');

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

    setAccessToken(token);
  }, []);

  const logout = () => {
    setAccessToken('');
    window.localStorage.removeItem('token');
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <Context.Provider value={accessToken}>
        {!accessToken ? (
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
        <Home />
      </Context.Provider>
    </div>
  );
}

export default App;
