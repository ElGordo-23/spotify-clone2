import { createContext, FC, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  trackUri: string | null;
  setTrackUri: (value: any) => void;
  songQueue: string[];
}>({ trackUri: null, setTrackUri: () => {}, songQueue: [] });

export const PlayerControlsProvider: FC = ({ children }) => {
  const [trackUri, setTrackUri] = useState(null);
  const songQueue = ['spotify:track:6yz7M1DItRFo8ATGeLoM9y'];

  return (
    <PlayerControlsContext.Provider
      value={{ trackUri, setTrackUri, songQueue }}
    >
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);
