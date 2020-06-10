import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import api, * as auth from '../services/api';

const PosterContext = createContext({ posters: [] });

export const PosterProvider = ({ children }) => {
    const [posters, setPosters] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('passei postercontext')
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

    async function loadPosters(query) {
        console.log('passei loadposter function')
        const search = query ? `search?query=${query}` : ''
        const response = await api.get(`/posters/${search}`)
        console.log('response', response.data.length)
        await setPosters(response.data)
    }

    async function loadCategories() {
        const response = await api.get('/categories')
        setCategories(response.data)
    }

    return (
        <PosterContext.Provider value={{ posters, loadPosters, categories, loadCategories }} >
            {children}
        </PosterContext.Provider>
    )
}

export default PosterContext;
