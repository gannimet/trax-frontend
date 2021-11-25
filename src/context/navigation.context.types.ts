import React from 'react';

export interface NavigationContextValueItem {
  label: string;
  href: string;
}

export interface NavigationContextValue {
  navigationItems: NavigationContextValueItem[];
  setNavigationItems(items: NavigationContextValueItem[]): void;
}

export interface NavigationContextProviderProps {
  children: React.ReactNode;
}
