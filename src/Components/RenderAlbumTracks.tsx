import { useSingleAlbum } from '../API/getAlbum';
import { usePlayerControls } from './PlayerControlsProvider';
import { PlaylistSelector } from './PlaylistSelector';

type RenderPropsTypes = {
  albumId: string | undefined;
};

export function RenderAlbumTracks({ albumId }: RenderPropsTypes) {
  const { data: album } = useSingleAlbum(albumId);
  const { setSongQueue } = usePlayerControls();

  // const singleSongPlayback = (trackUri: string) => {
  //   if (Array.isArray(customSongQueue) && customSongQueue?.length > 1) {
  //     customSongQueue?.unshift(trackUri);
  //     setSongQueue(customSongQueue);
  //   } else {
  //     setSongQueue(trackUri);
  //   }
  // };

  return (
    <div className="text-white">
      {album?.tracks?.items.map((track) => {
        let songDuration: string;
        songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
        songDuration = songDuration.replace(/\./g, ':');

        return (
          <div
            className="flex justify-between hover:bg-gray-500 rounded z-0 group w-[700px] cursor-pointer "
            key={track.id}
          >
            <ul className="list-decimal text-white">
              <li
                className="flex justify-center items-center gap-2 p-1"
                key={track.id}
              >
                <img
                  src={album.images[2].url}
                  alt="Album Cover"
                  className="h-6 w-6 object-cover"
                />
                <br />
                <span onClick={() => setSongQueue(track.uri)}>
                  {track.name}
                </span>
                <div className="opacity-0 group-hover:opacity-100">
                  <PlaylistSelector trackUri={track.uri} />
                </div>
              </li>
            </ul>
            <span className="mt-1">{songDuration}</span>
          </div>
        );
      })}
    </div>
  );
}
