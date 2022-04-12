import { createContext, FC, useCallback, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  songQueue: string[] | null;
  customSongQueue: string[] | null;

  setSongQueue: (value: string | string[] | null) => void;
}>({
  songQueue: null,
  customSongQueue: null,
  setSongQueue: () => {},
});

export const PlayerControlsProvider: FC = ({ children }) => {
  const [internalSongQueue, setInternalSongQueue] = useState<string[] | null>(
    null,
  );

  const [customSongQueue] = useState<string[] | null>([]);

  const setSongQueue = useCallback((song) => {
    setInternalSongQueue(!song || Array.isArray(song) ? song : [song]);
  }, []);

  return (
    <PlayerControlsContext.Provider
      value={{ songQueue: internalSongQueue, setSongQueue, customSongQueue }}
    >
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);
