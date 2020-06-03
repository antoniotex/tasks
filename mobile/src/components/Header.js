import React from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <TextInput style={styles.search} placeholder="Pesquisar" />
            <TouchableOpacity><Text>Ir</Text></TouchableOpacity>
        </View>
    )
}
