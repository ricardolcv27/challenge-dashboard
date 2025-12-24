import type { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider principal de la aplicacio
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return <>{children}</>;
};
