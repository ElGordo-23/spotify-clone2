import { useState } from 'react';
import { useSearch } from '../API/searchArtists';
import { NewReleases } from '../Components/NewReleases';
import { SearchArtists } from '../Components/SearchArtists';

export function Home() {
  const [searchKey, setSearchKey] = useState<string>('');
  const { refetch } = useSearch(searchKey);

  return (
    <div className="flex flex-col items-center">
      <input
        className="bg-gray-800 text-white w-64 h-12"
        onChange={(e) => {
          setSearchKey(e.target.value);
          refetch();
        }}
        value={searchKey}
        placeholder="Search"
      />
      {searchKey ? <SearchArtists searchKey={searchKey} /> : <NewReleases />}
    </div>
  );
}
