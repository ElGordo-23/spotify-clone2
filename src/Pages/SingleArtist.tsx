import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleArtist } from '../API/getArtist';
import { getArtistAlbums } from '../API/getArtistAlbums';
import { getArtistTopTracks } from '../API/getArtistTopTracks';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';
import { generateQueryKeys } from '../util/QueryKeysGenerator';

export function SingleArtist() {
  const { artistId } = useParams();

  const axiosClient = useAxiosClient();

  const navigate = useNavigate();

  const [trackUri, setTrackUri] = useState<string>();

  const artistQueryKey = generateQueryKeys('artist');

  const allMusicQueryKey = generateQueryKeys('allMusic');

  const { data: artist } = useQuery(artistQueryKey.details(), () =>
    getSingleArtist(axiosClient, artistId),
  );
  const { data: allMusic } = useQuery(allMusicQueryKey.details(), () =>
    getArtistAlbums(axiosClient, artistId),
  );

  const { data: topTracks } = useQuery('getTopTracks', () =>
    getArtistTopTracks(axiosClient, artistId),
  );

  const singles = useMemo(
    () => allMusic?.filter((albums) => albums.album_type === 'single'),
    [allMusic],
  );
  const albums = useMemo(
    () => allMusic?.filter((albums) => albums.album_type === 'album'),
    [allMusic],
  );

  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl z-20 text-white ">
        {artist?.name}
      </h2>
      <img
        src={artist?.images[0].url}
        alt={artist?.name}
        className="z-10 object-cover h-[264px] w-[700px]"
      />
      <h3 className="font-bold text-3xl z-20 text-white ">Top Songs</h3>
      <br />
      <div className="z-10 text-white list-decimal">
        {topTracks?.map((track) => {
          let songDuration: string;
          songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
          songDuration = songDuration.replace(/\./g, ':');

          return (
            <ol className="grid grid-cols-2 list-decimal hover:bg-gray-500 rounded">
              <li className="flex gap-2  mt-1">
                <img
                  src={track.album.images[2].url}
                  alt="Album Cover"
                  className="h-6 w-6 object-cover"
                />
                <br />
                <button onClick={() => setTrackUri(track.uri)}>
                  {track.name}
                </button>
              </li>{' '}
              <span className="mt-1">{songDuration}</span>
            </ol>
          );
        })}
      </div>
      <br />
      <h3 className="font-bold text-3xl z-20 text-white ">Albums</h3>
      <br />
      <div className="grid grid-cols-4 overflow-hidden hover:overflow-auto object-cover h-[200px] w-[700px] gap-4 scrollbar-hide">
        {albums?.map((album) => (
          <div key={album.id} className="">
            <div className="p-2 hover:bg-gray-500 rounded w-24 h-36 overflow-hidden text-center">
              <img
                src={album.images[1].url}
                alt={album.name}
                onClick={() => navigate(`/album/${album.id}`)}
                className=""
              />
              <div>
                <p className="text-white text-opacity-70">{album.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <h3 className="relative font-bold text-3xl z-20 text-white ">Singles</h3>
      <br />
      <div className="grid grid-cols-4 overflow-hidden hover:overflow-auto object-cover h-[200px] w-[700px] gap-4 scrollbar-hide">
        {singles?.map((single) => (
          <div key={single.id} className=" w-32 text-center h-32 ">
            <div className="p-2 hover:bg-gray-500 rounded w-20 h-36 overflow-hidden">
              <img
                src={single.images[2].url}
                alt={single.name}
                onClick={() => navigate(`/album/${single.id}`)}
                className="w-16 h-16"
              />
              <div>
                <p className="text-white text-opacity-70">{single.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}
