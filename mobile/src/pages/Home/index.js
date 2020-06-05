import React, { useState, useEffect, useContext } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'
import api from '../../services/api'
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import PosterContext from '../../contexts/posters';

export default function Home() {
    const { posters, loadPosters } = useContext(PosterContext);
    const navigation = useNavigation();

    useEffect(() => {
        loadPoster()
    }, [])

    console.log('Home', posters.length)

    function handleSignout() {
        signOut();
    }

    function loadPoster() {
        console.log('entreiloadposters')
        loadPosters()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.listTitle}>Anúncios Recentes</Text>
            <FlatList
                style={styles.list}
                contentContainerStyle={{}}
                data={posters}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Card poster={item} />}
                refreshing={true}
            // onRefresh={loadPosters}
            />
        </View>
    )
}
