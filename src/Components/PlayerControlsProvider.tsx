import { createContext, FC, useCallback, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  // trackUri: string | null;
  songQueue: string[] | null;
  // setTrackUri: (value: any) => void;
  setSongQueue: (value: string | string[] | null) => void;
}>({
  // trackUri: null,
  // setTrackUri: () => {},
  songQueue: null,
  setSongQueue: () => {},
});

export const PlayerControlsProvider: FC = ({ children }) => {
  // const [trackUri, setTrackUri] = useState(null);
  const [internalSongQueue, setInternalSongQueue] = useState<string[] | null>(
    null,
  );
  const setSongQueue = useCallback((song) => {
    setInternalSongQueue(!song || Array.isArray(song) ? song : [song]);
  }, []);

  return (
    <PlayerControlsContext.Provider
      value={{ songQueue: internalSongQueue, setSongQueue }}
    >
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);
