import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home'
import Header from './src/components/Header'
import Constants from 'expo-constants';
import api from './src/services/api'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth'
import { PosterProvider } from './src/contexts/posters'
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <PosterProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PosterProvider>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [posters, setPosters] = useState([])

//   useEffect(() => {
//     loadPosters();
//   }, []);

//   async function loadPosters(query) {
//     console.log(query)
//     const search = query ? `search?query=${query}` : ''
//     const response = await api.get(`/posters/${search}`)
//     await setPosters(response.data)
//   }
//   return (
//     <View style={styles.container}>
//       <Text>ola mundo</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 7,
  },
});
