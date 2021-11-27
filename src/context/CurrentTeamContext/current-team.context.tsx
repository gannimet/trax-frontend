import React, { useState } from 'react';
import { Team } from '../../models/team.models';
import {
  CurrentTeamContextProviderProps,
  CurrentTeamContextValue,
} from './current-team.context.types';

export const CurrentTeamContext = React.createContext<CurrentTeamContextValue>({
  currentTeam: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentTeam: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearCurrentTeam: () => {},
});

const CurrentTeamContextProvider = React.memo<CurrentTeamContextProviderProps>(
  ({ children }) => {
    const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);

    return (
      <CurrentTeamContext.Provider
        value={{
          currentTeam,
          setCurrentTeam,
          clearCurrentTeam: () => setCurrentTeam(undefined),
        }}
      >
        {children}
      </CurrentTeamContext.Provider>
    );
  },
);

CurrentTeamContextProvider.displayName = 'CurrentTeamContextProvider';

export default CurrentTeamContextProvider;
