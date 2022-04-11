import { createContext, FC, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  trackUri: string | null;
  songQueue: string[] | null;
  setTrackUri: (value: any) => void;
  setSongQueue: (value: any) => void;
}>({
  trackUri: null,
  setTrackUri: () => {},
  songQueue: null,
  setSongQueue: () => {},
});

export const PlayerControlsProvider: FC = ({ children }) => {
  const [trackUri, setTrackUri] = useState(null);
  const [songQueue, setSongQueue] = useState(null);
  return (
    <PlayerControlsContext.Provider
      value={{ trackUri, setTrackUri, songQueue, setSongQueue }}
    >
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);
