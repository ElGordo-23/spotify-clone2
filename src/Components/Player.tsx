import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

export default function Player() {
  const { token } = useToken();
  const { trackUri, setTrackUri, songQueue } = usePlayerControls();

  return token ? (
    songQueue ? (
      <SpotifyWebPlayer
        token={token}
        showSaveIcon
        play={!!songQueue}
        callback={(state) => {
          if (!state.isPlaying) setTrackUri(null);
        }}
        uris={songQueue ? songQueue : []}
      />
    ) : (
      <SpotifyWebPlayer
        token={token}
        showSaveIcon
        play={!!trackUri}
        callback={(state) => {
          if (!state.isPlaying) setTrackUri(null);
        }}
        uris={trackUri ? [trackUri] : []}
      />
    )
  ) : null;
}
