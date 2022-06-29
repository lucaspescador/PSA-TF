import React from 'react';

import { AuthProvider } from './Auth';

export type ProviderProps = {
  children: React.ReactNode;
};

const hooks: React.FC<ProviderProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default hooks;
