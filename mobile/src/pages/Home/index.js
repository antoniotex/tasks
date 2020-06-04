import React, { useState, useEffect, useContext } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'
import api from '../../services/api'
import AuthContext from '../../contexts/auth';

export default function Home() {

    const { signed, user, signOut } = useContext(AuthContext);

    function handleSignout() {
        signOut();
    }
    return (
        <View style={styles.container}>
            {/* <Text>Olá {user.name}!</Text> */}
            <Button onPress={handleSignout} title='Sign out' />
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
