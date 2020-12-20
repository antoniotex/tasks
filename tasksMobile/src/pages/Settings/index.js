import React, { useContext } from 'react'
import { Text, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign'

import AuthContext from '../../contexts/auth';

import styles from './styles'
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const { signOut } = useContext(AuthContext)
    const navigation = useNavigation()
    
    async function handleSignout() {
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');
        Alert.alert('Aviso', 'Você será desconectado, deseja continuar?', [
            { text: 'Desconectar', onPress: () => signOut() },
            { text: 'Cancelar' }
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Configurações</Text>
            <TouchableOpacity style={styles.setOption} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.setOptionText}>Dados pessoais</Text>
                <Icon name="right" size={30} color="#f73859" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignout} style={styles.defaultButton}>
                <Text style={styles.textDefaultButton}>Desconectar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
