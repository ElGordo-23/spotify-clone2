import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';

export function Home() {
  return (
    <div className="flex flex-col items-center top-24 relative">
      <NewReleases />
      <SearchArtists />
    </div>
  );
}
