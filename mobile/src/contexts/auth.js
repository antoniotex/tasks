import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import api, * as auth from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
    console.log('authcontext')

    const [user, setUser] = useState(null);
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

    async function signIn(login) {
        const response = await api.post('/authenticate', login)
        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
        setUser(response.data.user)

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@RNAuth:token', response.data.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
