import React, { useContext } from 'react'
import { View, Text, Button, Alert } from 'react-native'

import AuthContext from '../../contexts/auth';

import styles from './styles'

export default function Settings() {
    const { signOut } = useContext(AuthContext)

    function handleSignout() {
        Alert.alert('Aviso', 'Você será desconectado, deseja continuar?', [
            { text: 'Desconectar', onPress: () => signOut() },
            { text: 'Cancelar' }
        ])
    }

    return (
        <View style={styles.container}>
            <Text>Configurações</Text>
            <Button title="Sair" color="#E02041" onPress={handleSignout} />
        </View>
    )
}
