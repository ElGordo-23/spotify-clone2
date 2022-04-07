import { createContext, FC, useContext, useState } from 'react';

const PlayerControlsContext = createContext<{
  trackUri: string | null;
  setTrackUri: (value: any) => void;
}>({ trackUri: null, setTrackUri: () => {} });

export const PlayerControlsProvider: FC = ({ children }) => {
  const [trackUri, setTrackUri] = useState(null);

  return (
    <PlayerControlsContext.Provider value={{ trackUri, setTrackUri }}>
      {children}
    </PlayerControlsContext.Provider>
  );
};

export const usePlayerControls = () => useContext(PlayerControlsContext);
