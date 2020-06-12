import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import PosterContext from '../contexts/posters';
import AuthContext from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const { loadPosters } = useContext(PosterContext);
    const { signOut, signed } = useContext(AuthContext)

    const navigation = useNavigation();

    const [query, setQuery] = useState('')

    function handleSignout() {
        signOut();
    }

    return (
        <View style={styles.header}>
            <View style={styles.searchArea}>
                <Icon name="search1" size={30} color="#E02041" onPress={() => loadPosters(query)} />
                <TextInput
                    style={styles.search}
                    placeholder="Pesquisar"
                    onChangeText={text => setQuery(text)}
                    onSubmitEditing={() => loadPosters(query)}
                >
                </TextInput>
            </View>
            {signed && <Icon name="poweroff" size={25} color="#E02041" onPress={handleSignout} />}
            {!signed && <Icon name="login" size={25} color="#E02041" onPress={() => navigation.navigate('SignIn')} />}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 7,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingLeft: 5,
        marginRight: 10
    },
    search: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#f5f5f5',
        paddingVertical: 5,
    }
})
