import React, { createContext, useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import api from '../services/api';

const PosterContext = createContext({ posters: [] });

export const PosterProvider = ({ children }) => {
    const [posters, setPosters] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [posterEditId, setPosterEditId] = useState()
    const [initialPosition, setInitialPosition] = useState(null)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            if (storageUser && storageToken) {
                // setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser && !storageToken) {
                setLoading(false);
            }
        }

        loadStorageData()
    }, [])

    async function changePosterMode(id) {
        await setPosterEditId(id)
    }

    async function getLocation(){
        await Geolocation.getCurrentPosition(
            async position => {
              const initialPosition = position
              await setInitialPosition(initialPosition);
            },
            error => {
                if(Platform.OS === 'ios'){
                    Alert.alert('Error IOS ', JSON.stringify(error), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
                }else{
                    Alert.alert('Error ANDROID ', JSON.stringify(error), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
                }
            }
          );
    }

    async function loadPosters(query) {
        Promise.all([
            await getLocation()
        ]).then(async result => {
            if(initialPosition){

                let { latitude, longitude } = initialPosition?.coords
        
                const search = query ? `search?query=${query}` : ''
                const response = await api.get(`/posters${search ? '/search' : ''}/${latitude}/${longitude}`)
        
                await setPosters(response.data)
            }
        })

        setLoading(false)
    }

    async function loadCategories() {
        const response = await api.get('/categories')
        setCategories(response.data)
    }

    return (
        <PosterContext.Provider value={{
            posters, loadPosters,
            categories, loadCategories,
            posterEditId, changePosterMode,
            loading, setLoading,
            getLocation
        }} >
            {children}
        </PosterContext.Provider>
    )
}

export default PosterContext;
