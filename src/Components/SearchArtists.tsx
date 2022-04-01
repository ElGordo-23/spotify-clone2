import { useEffect, useState } from 'react';
import { searchArtists } from '../API/hooks-home';

type Artist = {
  id: string;
  name: string;
};

export function SearchArtists({ token }: { token: string }) {
  const [searchedArtists, setSearchedArtists] = useState<[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');

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
          : searchedArtists.map((artist: Artist) => (
              <div key={artist.id}>{artist.name}</div>
            ))}
      </form>
    </div>
  );
}
