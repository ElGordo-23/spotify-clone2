import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';

export function Home() {

  return (
    <div className="flex flex-col">
      <NewReleases  />
      <SearchArtists />
    </div>
  );
}
