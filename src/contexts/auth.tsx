import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  callSigned: boolean;
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [callSigned, setCallSigned] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@ccb_control_covid:user');
      const storagedToken = await AsyncStorage.getItem('@ccb_control_covid:token');

      console.log("storagedUser", storagedUser);
      console.log("storagedToken", storagedToken);

      if ((storagedUser != null) && (storagedToken != null)) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
        console.log("storagedUser", storagedUser);
        console.log("storagedToken", storagedToken);

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  async function signIn() {
    setCallSigned(true);
    setLoading(true);

    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@ccb_control_covid:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@ccb_control_covid:token', response.token);

    console.log("CHEGOU");
    setLoading(false);
    setCallSigned(false);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ callSigned, signed: !!user, user: user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
