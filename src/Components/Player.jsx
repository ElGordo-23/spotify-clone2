import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';

export default function Player(trackUri) {
  const { token } = useToken();

  return (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
}
