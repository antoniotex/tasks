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
        const emailValidate = await emailValidation(login.email)
        if(!emailValidate){
            Toast.show('Digite um e-mail válido')
            return
        }

        try {
            setLoading(true)
            const response = await api.post('/register', register)

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            setUser(response.data.user)

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('@RNAuth:token', response.data.token);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Toast.show(error.response.data.error)
        }
    }

    async function signIn(login) {
        const emailValidate = await emailValidation(login.email)
        if(!emailValidate){
            Toast.show('Digite um e-mail válido')
            return
        }

        if(!login.password){
            Toast.show('Você esqueceu de digitar sua senha')
            return
        }

        setLoading(true)
        try {
            const response = await api.post('/authenticate', login)
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            setUser(response.data.user)
            setLoading(false)

            Toast.show(`Conectado como ${response.data.user.username}`)

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user));
            await AsyncStorage.setItem('@RNAuth:token', response.data.token);
        } catch (error) {
            setLoading(false)
            Toast.show(error.response.data.error)
        }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            Toast.show(`Você foi desconectado`)
            setUser(null);
        });
    }

    async function emailValidation(email){
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, register }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
