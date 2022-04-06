import { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';

type PlayerProps = {
  trackUri: string | undefined;
};

export default function Player({ trackUri }: PlayerProps) {
  const { token } = useToken();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={play}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      uris={trackUri ? [trackUri] : []}
    />
  ) : null;
}
