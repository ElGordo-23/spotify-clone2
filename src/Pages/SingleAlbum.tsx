import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbum } from '../API/getAlbum';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

export function SingleAlbum() {
  const { albumId } = useParams();
  const axiosClient = useAxiosClient();
  const navigate = useNavigate();

  const [trackUri, setTrackUri] = useState<string | undefined>();

  const { data: album } = useQuery('getAlbum', () =>
    getAlbum(axiosClient, albumId),
  );

  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl z-20 text-white ">
        {album?.name}
      </h2>
      <img
        src={album?.images[0].url}
        alt={album?.name}
        className="z-10 object-cover h-[264px] w-[700px]"
      />
      <button
        className="font-bold text-3xl z-20 text-white"
        onClick={() => navigate(`/artist/${album?.artists[0].id}`)}
      >
        {album?.artists[0].name}
      </button>
      <br />
      <ul className="z-10 h-[264px] w-[700px] text-white overflow-hidden hover:overflow-auto">
        {album?.tracks?.items.map((track) => {
          let songDuration: string;
          songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
          songDuration = songDuration.replace(/\./g, ':');
          return (
            <li>
              <div className="grid grid-cols-2">
                <li className="flex gap-2">
                  <img
                    src={album.images[2].url}
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
            </li>
          );
        })}
      </ul>
      <br />
      <div>
        <Player trackUri={trackUri} />
      </div>
    </div>
  );
}
