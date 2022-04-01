import { useEffect, useState } from 'react';
import { getNewReleases } from '../API/hooks-home';

export function NewReleases(token) {
  const [releases, setNewReleases] = useState([]);

  useEffect(() => {
    getNewReleases(token.token).then((data) =>
      setNewReleases(data.albums.items),
    );
  }, [token]);

  return (
    <div>
      {!token
        ? null
        : releases.map((release) => <div key={release.id}>{release.name}</div>)}
    </div>
  );
}
