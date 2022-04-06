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
      <ul className="z-10 h-[264px] w-[700px] text-white">
        {album?.tracks?.items.map((track) => (
          <li>
            <button onClick={() => setTrackUri(track.uri)}>{track.name}</button>
          </li>
        ))}
      </ul>

      <Player trackUri={trackUri} />
    </div>
  );
}
