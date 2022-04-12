import { createContext, FC, useCallback, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  songQueue: string[] | null;

  setSongQueue: (value: string | string[] | null) => void;
  addToQueue: (value: string | string[] | null) => void;
}>({
  songQueue: null,
  setSongQueue: () => {},
  addToQueue: () => {},
});

export const PlayerControlsProvider: FC = ({ children }) => {
  const [internalSongQueue, setInternalSongQueue] = useState<string[] | null>(
    null,
  );

  const setSongQueue = useCallback((song) => {
    setInternalSongQueue(castToArray(song));
  }, []);

  const addToQueue = useCallback((song) => {
    const newSongs = castToArray(song) || [];
    setInternalSongQueue((queue) => (queue ? [...queue, ...newSongs] : queue));
  }, []);

  return (
    <PlayerControlsContext.Provider
      value={{ songQueue: internalSongQueue, setSongQueue, addToQueue }}
    >
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);

const castToArray = (value: string | string[] | null) =>
  typeof value !== 'string' && (!value || Array.isArray(value))
    ? value
    : [value];
