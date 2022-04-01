import { useEffect, useState } from 'react';
import { searchArtists } from '../API/hooks-home';

export function SearchArtists(token) {
  const [searchedArtists, setSearchedArtists] = useState([] || null);
  const [searchKey, setSearchKey] = useState('' || null);

  useEffect(() => {
    searchArtists(token.token, searchKey).then((data) =>
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
