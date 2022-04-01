import { useContext } from 'react';
import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';
import { Context } from '../App';

export function Home() {
  const token: string = useContext(Context);

  return (
    <div>
      <NewReleases token={token} />
      <SearchArtists token={token} />
    </div>
  );
}
