import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'

export default function Card({ data }) {
    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: data.uri }} />
            <View style={styles.cardInfo}>
                <Text>{data.title}</Text>
                <Text>{data.categoria}</Text>
                <Text>{data.data}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        marginVertical: 5
    },
    cardImage: {
        width: 120,
        height: 120
    },
    cardInfo: {
        padding: 4
    }
});


