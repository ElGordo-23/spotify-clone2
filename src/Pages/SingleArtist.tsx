import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleArtist } from '../API/getArtist';
import { getArtistAlbums } from '../API/getArtistAlbums';
import { getArtistTopTracks } from '../API/getArtistTopTracks';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

export function SingleArtist() {
  const { artistId } = useParams();

  const axiosClient = useAxiosClient();

  const navigate = useNavigate();

  const [trackUri, setTrackUri] = useState<string>();

  const { data: artist } = useQuery('getArtist', () =>
    getSingleArtist(axiosClient, artistId),
  );
  const { data: allMusic } = useQuery('getAllMusicFromArtist', () =>
    getArtistAlbums(axiosClient, artistId),
  );

  const { data: topTracks } = useQuery('getTopTracks', () =>
    getArtistTopTracks(axiosClient, artistId),
  );

  const singles = allMusic?.filter((albums) => albums.album_type === 'single');
  const albums = allMusic?.filter((albums) => albums.album_type === 'album');

  console.log(topTracks);

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
      <ol className="z-10 text-white list-decimal">
        {topTracks?.map((track) => {
          let songDuration: string;
          songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
          songDuration = songDuration.replace(/\./g, ':');

          return (
            <div className="grid grid-cols-2">
              <li className="flex gap-2">
                <img
                  src={track.album.images[2].url}
                  alt="Album Cover"
                  className="h-5 w-5 object-cover"
                />
                <br />
                <button onClick={() => setTrackUri(track.uri)}>
                  {track.name}
                </button>
              </li>{' '}
              <span>{songDuration}</span>
            </div>
          );
        })}
      </ol>
      <br />
      <h3 className="font-bold text-3xl z-20 text-white ">Albums</h3>
      <br />
      <div className="grid grid-cols-4 overflow-hidden hover:overflow-auto object-cover h-[200px] w-[700px] gap-4 ">
        {albums?.map((album) => (
          <div className="flex text-white text-opacity-60 justify-between overflow-hidden h-16 ">
            <img
              src={album.images[2].url}
              alt={album.name}
              onClick={() => navigate(`/album/${album.id}`)}
              className="w-16 h-16"
            />
            <p className="overflow-hidden">{album.name}</p>
          </div>
        ))}
      </div>
      <h3 className="relative font-bold text-3xl z-20 text-white ">Singles</h3>
      <div className="flex flex-row overflow-auto z-10 object-cover w-[700px]">
        {singles?.map((single) => (
          <img
            src={single.images[2].url}
            alt={single.name}
            onClick={() => navigate(`/album/${single.id}`)}
          />
        ))}
      </div>
      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}
