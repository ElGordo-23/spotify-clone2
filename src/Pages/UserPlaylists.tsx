import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getUserPlaylists } from '../API/getUserPlaylists';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export type Playlist = {
  name: string;

  images: { url: string }[];
  items: { name: string; tracks: {}; id: string }[];
  tracks: { href: string };
};

export function UserPlaylists() {
  const axiosClient = useAxiosClient();

  const { data: playlists } = useQuery('getPlaylists', () =>
    getUserPlaylists(axiosClient),
  );

  return (
    <div className="relative">
      <h2 className="font-extrabold text-6xl z-20 text-white ">Playlists</h2>
      <ul className="text-white mt-5">
        {playlists?.map((playlist) => (
          <li key={playlist.id}>
            <Link to={`/userPlaylists/${playlist.id}/${playlist.name}`}>
              {playlist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
