import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function Header({ loadPosters }) {
    const [query, setQuery] = useState('')
    return (
        <View style={styles.header}>
            <TextInput style={styles.search} placeholder="Pesquisar" onChangeText={text => setQuery(text)}>
            </TextInput>
            <TouchableOpacity style={styles.searchButton}>
                <AntDesign name="search1" size={25} color="#E02041" onPress={() => loadPosters(query)} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    search: {
        flex: 6,
        paddingLeft: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#eee',
        paddingVertical: 5
    },
    searchButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
