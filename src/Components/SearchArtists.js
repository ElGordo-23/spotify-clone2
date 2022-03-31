import { useEffect, useState } from 'react';
import { searchArtists } from '../API/hooks-home';

export function SearchArtists() {
  const [token, setToken] = useState('');
  const [searchedArtists, setSearchedArtists] = useState([] || null);
  const [searchKey, setSearchKey] = useState('' || null);

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
    searchArtists(token, searchKey).then((data) =>
      setSearchedArtists(data.artists.items),
    );
  }, [token, searchKey]);
  return (
    <div>
      <form>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        {!searchKey
          ? null
          : searchedArtists.map((artist) => (
              <div key={artist.id}>{artist.name}</div>
            ))}
      </form>
    </div>
  );
}
