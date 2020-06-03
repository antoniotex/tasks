import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'
import api from '../../services/api'

export default function Home({ posters }) {
    return (
        <View style={styles.container}>
            <Text style={styles.listTitle}>Anúncios Recentes</Text>
            <FlatList
                style={styles.list}
                contentContainerStyle={{}}
                data={posters}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Card poster={item} />}
                refreshing={true}
            // onRefresh={loadPosters}
            />
        </View>
    )
}
