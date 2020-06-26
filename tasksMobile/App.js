import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes'
import { StatusBar, SafeAreaView, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth'
import { PosterProvider } from './src/contexts/posters'

const App = () => {
  return (
    <NavigationContainer>
      <PosterProvider>
        <AuthProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#000" />
          <Routes />
        </AuthProvider>
      </PosterProvider>
    </NavigationContainer>
    // <View><Text>Ola app.js</Text></View>
  );
};

export default App;
