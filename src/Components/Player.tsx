import { useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';

type PlayerProps = {
  trackUri: string | undefined;
};

export default function Player({ trackUri }: PlayerProps) {
  const { token } = useToken();
  const [isPlaying, setIsplaying] = useState(false);

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={isPlaying}
      uris={trackUri ? [trackUri] : []}
    />
  ) : null;
}
