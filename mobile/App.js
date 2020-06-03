import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home'
import Header from './src/components/Header'
import Constants from 'expo-constants';
import api from './src/services/api'

export default function App() {
  const [posters, setPosters] = useState([])

  useEffect(() => {
    loadPosters();
  }, []);

  async function loadPosters(query) {
    const search = query ? `search?query=${query}` : ''
    const response = await api.get(`/posters/${search}`)
    await setPosters(response.data)
  }
  return (
    <View style={styles.container}>
      <Header loadPosters={loadPosters} />
      <Home posters={posters} />
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
