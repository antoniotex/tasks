import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import moment from 'moment'

export default function Card({ poster }) {
    const imageDefault = 'https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG'
    return (
        <View style={styles.poster}>
            <Image style={styles.posterImage} source={{ uri: poster.images.length > 0 ? poster.images[0].location : imageDefault }} />
            <View style={styles.posterInfo}>
                <Text style={styles.posterTitle}>{poster.title}</Text>
                <Text style={styles.posterCategory}>Categoria: {poster.category.name}</Text>
                <Text style={styles.posterData}>{moment(poster.createdAt).fromNow()} - {poster.city}, {poster.state}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    poster: {
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 4
    },
    posterImage: {
        width: 120,
        height: 120
    },
    posterInfo: {
        padding: 4,
        justifyContent: 'space-between'
    },
    posterTitle: {
        fontSize: 16,
        fontWeight: '700'
    },
    posterCategory: {
        fontSize: 15
    },
    posterData: {
        fontSize: 12,
        color: '#aaa'
    }
});


