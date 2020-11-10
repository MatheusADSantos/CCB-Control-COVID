import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

// const { signed, loading } = useContext(AuthContext);
const Routes: React.FC = () => {
  const { signed, loading, callSigned } = useAuth();
  console.log(">>>Verificando condicoes: <<<");
  console.log("Logado: ", signed);
  console.log("Logando: ", loading);
  console.log("Cahmou loading: ", callSigned);

  if (loading && callSigned) {
    console.log(">>>Carregando loading<<<");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#999' />
      </View>
    )
  }


  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;