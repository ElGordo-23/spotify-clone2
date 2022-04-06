import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbum } from '../API/getAlbum';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

type Album = {
  name: string;
  artists: { id: string; name: string }[];
  images: { url: string }[];
};

type Tracks = {
  name: string;
  uri: string;
};

export function SingleAlbum() {
  const { albumId } = useParams();
  const axiosClient = useAxiosClient();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album>();
  const [albumTracks, setAlbumTracks] = useState<Tracks[]>();
  const [trackUri, setTrackUri] = useState<string | undefined>();

  useEffect(() => {
    getAlbum(axiosClient, albumId)
      .then((data) => setAlbum(data))
      .catch((error) => console.log(error));

    getAlbum(axiosClient, albumId)
      .then((data) => setAlbumTracks(data.tracks.items))
      .catch((error) => console.log(error));
  }, [axiosClient, albumId]);

  console.log(albumTracks);

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
        {albumTracks?.map((track) => (
          <li>
            <button onClick={() => setTrackUri(track.uri)}>{track.name}</button>
          </li>
        ))}
      </ul>

      <Player trackUri={trackUri} />
    </div>
  );
}
