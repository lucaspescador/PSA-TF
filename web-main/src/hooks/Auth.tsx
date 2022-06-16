import React, { createContext, useCallback, useState, useContext } from 'react';
import { ProviderProps } from '.';

import api from '../services/api';

interface AuthState {
  token: string;
  name: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  name: string;
  signIn(credeitnals: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Matriculas:token');
    const name = localStorage.getItem('@Matriculas:name');

    if (token && name) {
      return { token, name };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post('/login', {
        username,
        password,
      });

      const { token, username: name } = response.data;

      localStorage.setItem('@Matriculas:token', token);
      localStorage.setItem('@Matriculas:name', name);

      setData({ token, name });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Matriculas:token');
    localStorage.removeItem('@Matriculas:name');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, name: data.name, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };