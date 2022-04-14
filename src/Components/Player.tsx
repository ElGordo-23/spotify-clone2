import { useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

export default function Player() {
  const { token } = useToken();
  const { songQueue } = usePlayerControls();
  const [position, setPosition] = useState(0);

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      offset={position}
      callback={(state) => {
        if (songQueue?.length) {
          setPosition(songQueue?.findIndex((uri) => uri === state.track.uri));
        }
      }}
      uris={songQueue || []}
    />
  ) : null;
}
