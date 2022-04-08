import { useEffect } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

export default function Player() {
  const { token } = useToken();
  const { trackUri, setTrackUri, songQueue } = usePlayerControls();

  useEffect(() => {}, []);

  console.log(songQueue[0]);

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={!!trackUri}
      callback={(state) => {
        if (!state.isPlaying) setTrackUri(null);
      }}
      uris={songQueue ? songQueue : []}
    />
  ) : null;
}
