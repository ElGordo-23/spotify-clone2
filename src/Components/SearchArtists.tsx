import { useEffect, useState } from 'react';
import { searchArtists } from '../API/searchArtists';
import { useAxiosClient } from './AxiosClientProvider';

type Artist = {
  id: string;
  name: string;
};

export function SearchArtists() {
  const [searchedArtists, setSearchedArtists] = useState<Artist[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');

  const axiosClient =  useAxiosClient()


  useEffect(() => {
    searchArtists(axiosClient, searchKey).then((data) =>
      setSearchedArtists(data.artists.items),
    );
  }, [axiosClient, searchKey]);
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
