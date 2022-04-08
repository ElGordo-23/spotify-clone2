import { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useToken } from '../API/useToken';
import { usePlayerControls } from './PlayerControlsProvider';

type Listprops = {
  list: string[] | undefined;
};

export default function Player({ list }: Listprops) {
  const { token } = useToken();
  const { trackUri, setTrackUri, songQueue } = usePlayerControls();

  return token ? (
    <SpotifyWebPlayer
      token={token}
      showSaveIcon
      play={!!trackUri}
      callback={(state) => {
        if (!state.isPlaying) setTrackUri(null);
      }}
      uris={list ? list : []}
    />
  ) : null;
}
