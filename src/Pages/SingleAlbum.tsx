import { PlayIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleAlbum } from '../API/getAlbum';
import { usePlayerControls } from '../Components/PlayerControlsProvider';
import { RenderAlbumTracks } from '../Components/RenderAlbumTracks';

export function SingleAlbum() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const { setSongQueue } = usePlayerControls();
  const { data: album } = useSingleAlbum(albumId);

  const getAllUris = () => {
    const allUris: string[] = [];
    album?.tracks.items.map((track) => allUris.push(track.uri));
    return allUris;
  };

  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl z-20 text-white ">
        {album?.name}
      </h2>
      <img
        src={album?.images[0].url}
        alt={album?.name}
        className="object-cover h-[264px] w-[716px]"
      />
      <div className="ml-4">
        <span
          className="font-bold text-3xl text-white"
          onClick={() => navigate(`/artist/${album?.artists[0].id}`)}
        >
          {album?.artists[0].name}
        </span>
        <br />
        <button
          onClick={() => {
            setSongQueue(getAllUris());
          }}
          className="text-white"
        >
          <PlayIcon className="w-10 h-10 mt-2" />
        </button>
        <br />
        <RenderAlbumTracks albumId={albumId} />
        <br />
      </div>
    </div>
  );
}
