import { useEffect, useState } from 'react';
import { getNewReleases } from '../API/hooks-home';

type Release = {
  id: string;
  name: string;
};

export function NewReleases({ token }: { token: string }) {
  const [releases, setNewReleases] = useState<[]>([]);
  console.log(releases);

  useEffect(() => {
    getNewReleases(token).then((data) => setNewReleases(data.albums.items));
  }, [token]);

  return (
    <div>
      {!token
        ? null
        : releases.map((release: Release) => (
            <div key={release.id}>{release.name}</div>
          ))}
    </div>
  );
}
