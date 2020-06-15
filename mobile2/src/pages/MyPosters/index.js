import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ToastAndroid, Alert } from 'react-native'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import PosterContext from '../../contexts/posters';
import styles from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'

export default function MyPosters() {
    const { loadPosters } = useContext(PosterContext);

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

    async function deletePoster(id) {
        Alert.alert('Aviso', 'O anúncio será deletado, deseja continuar?', [
            {
                text: 'Deletar Anúncio', onPress: async () => {
                    const response = await api.delete(`/posters/${id}`)
                    let posterIndex = posters.filter(x => {
                        return x.id != id;
                    })
                    setPosters(posterIndex)
                    loadPosters()
                }
            },
            { text: 'Cancelar' }
        ])

    }

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>Anúncios: {posters.length}</Text>
            <ScrollView style={styles.list}>
                {posters.map((poster, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardInfo}>
                            <View style={styles.titleDate}>
                                <Text style={styles.cardTitle}>{poster.title}</Text>
                                <Text style={styles.cardDate}>{moment(poster.createdAt).calendar()}</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <Icon name="delete" size={20} color="#E02041" onPress={() => deletePoster(poster.id)} />
                                <Icon name="edit" size={20} color="#E02041" onPress={() => { }} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
