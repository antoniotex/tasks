import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import api, * as auth from '../services/api';

const PosterContext = createContext({ posters: [] });

export const PosterProvider = ({ children }) => {
    console.log('entrei postercontex')
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser && !storageToken) {
                setLoading(false);
            }
        }

        loadStorageData();
    }, [])

    async function loadPosters(query) {
        console.log(query)
        const search = query ? `search?query=${query}` : ''
        const response = await api.get(`/posters/${search}`)
        await setPosters(response.data)
    }

    return (
        <PosterContext.Provider value={{ posters, loadPosters }} >
            {children}
        </PosterContext.Provider>
    )
}

export default PosterContext;
