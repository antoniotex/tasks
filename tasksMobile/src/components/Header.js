import React, { useState, useContext } from 'react'
import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PosterContext from '../contexts/posters';
import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-navigation';

export default function Header() {
    const { loadPosters, setLoading } = useContext(PosterContext);

    const navigation = useNavigation();

    const [query, setQuery] = useState('')

    async function loadPostersHome(query) {
        setLoading(true)
        loadPosters(query)
    }

    return (
        <SafeAreaView style={styles.header}>
            <MaterialCommunityIcons name="menu" size={35} color="#E02041" onPress={navigation.toggleDrawer} />
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.search}
                    placeholder="Pesquisar"
                    onChangeText={text => setQuery(text)}
                    onSubmitEditing={() => loadPostersHome(query)}
                >
                </TextInput>
                <MaterialCommunityIcons name="magnify" size={30} color="#E02041" onPress={() => loadPosters(query)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingTop:10,
        marginBottom: 10
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        paddingLeft: 5,
        marginHorizontal: 5,
        borderRadius: 8
    },
    search: {
        flex: 1,
        paddingLeft: 4,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#e5e5e5',
        paddingVertical: 5,
    }
})
