import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import api, * as auth from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            console.log('passei authContext')
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
            ToastAndroid.showWithGravity(error.response.data.error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    async function signIn(login) {
        try {
            const response = await api.post('/authenticate', login)
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            setUser(response.data.user)

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('@RNAuth:token', response.data.token);
        } catch (error) {
            ToastAndroid.showWithGravity(error.response.data.error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
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
