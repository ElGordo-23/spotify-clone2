import { useState } from 'react';
import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';

export function Home() {
  const [searchKey, setSearchKey] = useState<string>('');

  return (
    <div className="flex flex-col items-center top-24 relative">
      <input
        className="bg-gray-800 text-white w-64 h-12 -translate-y-10"
        onChange={(e) => setSearchKey(e.target.value)}
        value={searchKey}
        placeholder="Search"
      />
      {searchKey ? <SearchArtists searchKey={searchKey} /> : <NewReleases />}
    </div>
  );
}
