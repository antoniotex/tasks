import React, { useState, useEffect } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'

export default function MyPosters() {
    const [posters, setPosters] = useState([])

    useEffect(() => {
        loadPostersByUser()
    }, [])

    async function loadPostersByUser() {
        const storageToken = await AsyncStorage.getItem('@RNAuth:token');
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');

        try {
            const response = await api.get(`/posters/user/${JSON.parse(storageUser).id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
                    'Authorization': `Bearer ${storageToken}`
                }
            })
            setPosters(response.data)
        } catch (error) {
            ToastAndroid.showWithGravity(error.response.data.error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>Anúncios: {posters.length}</Text>
            <ScrollView style={styles.list}>
                {posters.map((poster, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardBar} />
                        <View style={styles.cardInfo}>
                            <View style={styles.titleDate}>
                                <Text style={styles.cardTitle}>{poster.title}</Text>
                                <Text style={styles.cardDate}>{moment(poster.createdAt).calendar()}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <Icon name="delete" size={25} color="#E02041" onPress={() => { }} />
                                <Icon name="edit" size={25} color="#E02041" onPress={() => { }} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
