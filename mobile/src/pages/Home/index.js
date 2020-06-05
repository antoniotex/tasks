import React, { useState, useEffect, useContext } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'
import api from '../../services/api'
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    console.log('home')

    const { signed, user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    console.log(signed)

    function handleSignout() {
        signOut();
    }
    return (
        <View style={styles.container}>
            <Text>{signed ? 'Logado' : 'Deslogado'}</Text>
            {signed ? <Button onPress={handleSignout} title="Sair"></Button> : <View />}
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <Text style={styles.listTitle}>Anúncios Recentes</Text>
    //         <FlatList
    //             style={styles.list}
    //             contentContainerStyle={{}}
    //             data={posters}
    //             keyExtractor={item => String(item.id)}
    //             renderItem={({ item }) => <Card poster={item} />}
    //             refreshing={true}
    //         // onRefresh={loadPosters}
    //         />
    //     </View>
    // )
}
