import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

export default function Player() {
  const { token } = useToken();
  const { trackUri, setTrackUri } = usePlayerControls();

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={!!trackUri}
      callback={(state) => {
        if (!state.isPlaying) setTrackUri(null);
      }}
      uris={trackUri ? [trackUri] : []}
    />
  ) : null;
}
