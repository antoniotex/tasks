import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import PosterContext from '../contexts/posters';

export default function Header() {
    const { loadPosters } = useContext(PosterContext);

    const [query, setQuery] = useState('')

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
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 7,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        paddingLeft: 5
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
