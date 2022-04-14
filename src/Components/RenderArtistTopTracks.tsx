import { useArtistTopTracks } from '../API/getArtistTopTracks';
import { usePlayerControls } from './PlayerControlsProvider';
import { PlaylistSelector } from './PlaylistSelector';

type RenderPropsTypes = {
  artistId: string | undefined;
};

export function RenderArtistTopTracks({ artistId }: RenderPropsTypes) {
  const { data: topTracks } = useArtistTopTracks(artistId);
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
      <ol className="text-white">
        {topTracks?.map((track, index) => {
          let songDuration: string;
          songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
          songDuration = songDuration.replace(/\./g, ':');

          return (
            <li
              className="hover:bg-gray-500 rounded group w-[700px] cursor-pointer flex justify-between align-center"
              key={track.id}
            >
              <div
                className="flex justify-center items-center gap-2 p-1"
                key={track.id}
              >
                <img
                  src={track.album.images[2].url}
                  alt="Album Cover"
                  className="h-6 w-6 object-cover"
                />
                <div>{index + 1}.</div>

                <span onClick={() => setSongQueue(track.uri)}>
                  {track.name}
                </span>
                <div className="opacity-0 group-hover:opacity-100">
                  <PlaylistSelector trackUri={track.uri} />
                </div>
              </div>
              <span className="mt-1">{songDuration}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
