import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

const SignIn: React.FC = () => {
  const { signed, user, signIn, callSigned } = useAuth();

  function handleSignIn() {
    console.log('LOGAR');
    signIn();
  }

  return (
    <View style={styles.container}>
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  )
};

export default SignIn;