import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-tiny-toast'
import api from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
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

    async function register(register) {
        try {
            const response = await api.post('/register', register)

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            setUser(response.data.user)

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('@RNAuth:token', response.data.token);
        } catch (error) {
            Toast.show(error.response.data.error)
        }
    }

    async function signIn(login) {
        try {
            const response = await api.post('/authenticate', login)
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            setUser(response.data.user)

            Toast.show(`Conectado como ${response.data.user.username}`)

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('@RNAuth:token', response.data.token);
        } catch (error) {
            Toast.show(error.response.data.error)
        }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            Toast.show(`Você foi desconectado`)
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, register }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
