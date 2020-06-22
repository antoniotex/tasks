import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import PosterContext from '../../contexts/posters';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'

export default function MyPosters() {
    const { loadPosters, changePosterMode, posterEditId, setLoading, loading } = useContext(PosterContext);

    const [posters, setPosters] = useState([])

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            loadPostersByUser()
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        if (posterEditId)
            navigation.navigate('NewPoster')
    }, [posterEditId])

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
            setLoading(false)
        } catch (error) {
            ToastAndroid.showWithGravity(error.response.data.error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    async function editPoster(poster) {
        setLoading(true)
        await changePosterMode(poster.id)
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

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    else
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
                                    <Icon name="edit" size={20} color="#E02041" onPress={() => editPoster(poster)} />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
}
