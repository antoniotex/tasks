import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth'
import { PosterProvider } from './src/contexts/posters'

const App = () => {
  return (
    <NavigationContainer>
      <PosterProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PosterProvider>
    </NavigationContainer>
  );
};

export default App;
