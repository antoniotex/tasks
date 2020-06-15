import React, { useState, useContext } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PosterContext from '../contexts/posters';
import AuthContext from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const { loadPosters } = useContext(PosterContext);
    const { signOut, signed } = useContext(AuthContext)

    const navigation = useNavigation();

    const [query, setQuery] = useState('')

    function handleSignout() {
        Alert.alert('Aviso', 'Você será desconectado, deseja continuar?', [
            { text: 'Desconectar', onPress: () => signOut() },
            { text: 'Cancelar' }
        ])
    }

    return (
        <View style={styles.header}>
            <Icon name="menu" size={35} color="#E02041" onPress={navigation.toggleDrawer} />
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.search}
                    placeholder="Pesquisar"
                    onChangeText={text => setQuery(text)}
                    onSubmitEditing={() => loadPosters(query)}
                >
                </TextInput>
                {/* <Icon name="search" size={30} color="#E02041" onPress={() => loadPosters(query)} /> */}
                <Icon name="search" size={30} color="#E02041" onPress={handleSignout} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 10
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingLeft: 5,
        marginLeft: 5,
        borderRadius: 8
    },
    search: {
        flex: 1,
        paddingLeft: 4,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f5f5f5',
        paddingVertical: 5,
    }
})
