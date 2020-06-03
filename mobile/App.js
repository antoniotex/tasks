import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home'
import Header from './src/components/Header'
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 7,
  },
});
