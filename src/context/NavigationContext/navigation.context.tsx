import React, { useState } from 'react';
import {
  NavigationContextProviderProps,
  NavigationContextValue,
} from './navigation.context.types';

export const NavigationContext = React.createContext<NavigationContextValue>({
  navigationItems: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNavigationItems: () => {},
});

const NavigationContextProvider = React.memo<NavigationContextProviderProps>(
  ({ children }) => {
    const [navigationContextItems, setNavigationContextItems] = useState<
      NavigationContextValue['navigationItems']
    >([]);

    return (
      <NavigationContext.Provider
        value={{
          navigationItems: navigationContextItems,
          setNavigationItems: setNavigationContextItems,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );
  },
);

NavigationContextProvider.displayName = 'NavigationContextProvider';

export default NavigationContextProvider;
