import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArtist } from '../API/getArtist';
import { useAllArtistMusic } from '../API/getArtistAlbums';
import { useArtistTopTracks } from '../API/getArtistTopTracks';
import { PlaylistSelector } from '../Components/Menu';
import Player from '../Components/Player';

export function SingleArtist() {
  const { artistId } = useParams();

  const navigate = useNavigate();

  const [trackUri, setTrackUri] = useState<string>();

  const { data: artist } = useArtist(artistId);

  const { data: allMusic } = useAllArtistMusic(artistId);

  const { data: topTracks } = useArtistTopTracks(artistId);

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
            <div className="flex justify-between hover:bg-gray-500 rounded">
              <ol className="grid grid-cols-2 list-decimal">
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
                  <div>
                    <PlaylistSelector trackUri={track.uri} />
                  </div>
                </li>
              </ol>

              <span className="mt-1">{songDuration}</span>
            </div>
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
    </div>
  );
}
