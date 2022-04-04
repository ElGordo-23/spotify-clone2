import { NewReleases } from './NewReleases';
import { SearchArtists } from './SearchArtists';
import { Sidebar } from './Sidebar';

export function Home() {
  return (
    <div className="flex flex-col items-center top-24 relative">
      <div className="absolute inset-y-0 left-0">
        <Sidebar />
      </div>
      <NewReleases />
      <SearchArtists />
    </div>
  );
}
