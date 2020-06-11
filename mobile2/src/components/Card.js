import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'

export default function Card({ poster }) {
    const navigation = useNavigation();
    const imageDefault = 'https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG'

    async function loadPoster(poster) {
        navigation.navigate('Poster', { poster })
    }

    return (
        <TouchableOpacity style={styles.poster} onPress={() => loadPoster(poster)}>
            <Image style={styles.posterImage} source={{ uri: poster.images.length > 0 ? poster.images[0].location : imageDefault }} />
            <View style={styles.posterInfo}>
                <Text style={styles.posterTitle}>{poster.title}</Text>
                <Text style={styles.posterCategory}>Categoria: {poster.category.name}</Text>
                <Text style={styles.posterData}>{moment(poster.createdAt).fromNow()} - {poster.city}, {poster.state}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    poster: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        flexDirection: 'row',
        marginVertical: 7,
        marginHorizontal: 8,
        borderRadius: 20
    },
    posterImage: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
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


