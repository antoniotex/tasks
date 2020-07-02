import React, { createContext, useState, useEffect } from 'react';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const PosterContext = createContext({ posters: [] });

export const PosterProvider = ({ children }) => {
    const [posters, setPosters] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [posterEditId, setPosterEditId] = useState()

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

    async function loadPosters(query) {
        const search = query ? `search?query=${query}` : ''
        const response = await api.get(`/posters/${search}`)
        await setPosters(response.data)
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
            loading, setLoading
        }} >
            {children}
        </PosterContext.Provider>
    )
}

export default PosterContext;
