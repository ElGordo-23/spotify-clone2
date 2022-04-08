import { useArtistTopTracks } from '../API/getArtistTopTracks';
import { PlaylistSelector } from '../Components/Menu';
import { usePlayerControls } from './PlayerControlsProvider';

type RenderPropsTypes = {
  artistId: string | undefined;
};

export function RenderArtistTopTracks({ artistId }: RenderPropsTypes) {
  const { data: topTracks } = useArtistTopTracks(artistId);
  const { setTrackUri, songQueue } = usePlayerControls();

  return (
    <div className="z-10 text-white list-decimal">
      {topTracks?.map((track) => {
        let songDuration: string;
        songDuration = `${(track.duration_ms / 60000).toFixed(2)}`;
        songDuration = songDuration.replace(/\./g, ':');

        return (
          <div className="flex justify-between hover:bg-gray-500 rounded z-0">
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
                  <PlaylistSelector
                    trackUri={track.uri}
                    songQueue={songQueue}
                  />
                </div>
              </li>
            </ol>
            <span className="mt-1">{songDuration}</span>
          </div>
        );
      })}
    </div>
  );
}
