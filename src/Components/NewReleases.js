import { useEffect, useState } from 'react';
import { getNewReleases } from '../API/hooks-home';

export function NewReleases() {
  const [releases, setNewReleases] = useState([]);
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

  useEffect(() => {
    getNewReleases(token).then((data) => setNewReleases(data.albums.items));
  }, [token]);

  return (
    <div>
      {!token
        ? null
        : releases.map((release) => <div key={release.id}>{release.name}</div>)}
    </div>
  );
}
