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
    const { signOut, signed } = useContext(AuthContext)
    const navigation = useNavigation();

    useEffect(() => {
        loadPoster()
    }, [])

    function handleSignout() {
        signOut();
    }

    function loadPoster() {
        loadPosters()
    }

    return (
        <View style={styles.container}>
            {signed && <Button onPress={handleSignout} title="Sair"></Button>}
            {posters.length == 0 && <Text>Nenhum anúncio encontrado para esta pesquisa</Text>}
            <FlatList
                style={styles.list}
                data={posters}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Card poster={item} />}
                refreshing={false}
                onRefresh={loadPosters}
                ListHeaderComponent={<Text style={styles.listTitle}>Anúncios Recentes</Text>}
            />
        </View>
    )
}
