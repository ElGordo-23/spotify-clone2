import { useNavigate, useParams } from 'react-router-dom';
import { useSingleAlbum } from '../API/getAlbum';
import { usePlayerControls } from '../Components/PlayerControlsProvider';
import { PlaylistSelector } from '../Components/PlaylistSelector';

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
        className="z-10 object-cover h-[264px] w-[700px]"
      />
      <button
        className="font-bold text-3xl z-20 text-white"
        onClick={() => navigate(`/artist/${album?.artists[0].id}`)}
      >
        {album?.artists[0].name}
      </button>
      <br />
      <button
        onClick={() => {
          setSongQueue(getAllUris());
        }}
        className="text-white"
      >
        Play all
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
                <li className="flex gap-2 ">
                  <img
                    src={album.images[2].url}
                    alt="Album Cover"
                    className="h-5 w-5 object-cover"
                  />
                  <br />
                  <button
                    onClick={() => setSongQueue(track.uri)}
                    className="hover:bg-gray-500 rounded"
                  >
                    {track.name}
                  </button>
                  <PlaylistSelector trackUri={track.uri} />
                </li>
                <span>{songDuration}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <br />
      <div></div>
    </div>
  );
}
