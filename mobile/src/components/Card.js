import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'

export default function Card({ poster }) {
    console.log('card: ', poster)
    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: poster.images[0].location }} />
            <View style={styles.cardInfo}>
                <Text>{poster.title}</Text>
                <Text>Categoria: {poster.category}</Text>
                <Text>{poster.createdAt}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        marginVertical: 5,
    },
    cardImage: {
        width: 120,
        height: 120
    },
    cardInfo: {
        padding: 4
    }
});


