import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

export default function Player() {
  const { token } = useToken();
  const { setSongQueue, songQueue } = usePlayerControls();

  console.log(songQueue);

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={!!songQueue?.length}
      callback={(state) => {
        if (!state.isPlaying) setSongQueue(null);
      }}
      uris={songQueue || []}
    />
  ) : null;
}
