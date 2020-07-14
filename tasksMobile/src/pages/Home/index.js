import React, { useEffect, useContext } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import PosterContext from '../../contexts/posters';
import Header from '../../components/Header'

export default function Home() {
    const { posters, loadPosters, loading, setLoading } = useContext(PosterContext);
    const { signOut, signed } = useContext(AuthContext)
    const navigation = useNavigation();

    function handleSignout() {
        signOut();
    }

    function loadPoster() {
        loadPosters()
    }

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    else
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    style={styles.list}
                    data={posters}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <Card poster={item} />}
                    refreshing={false}
                    onRefresh={loadPosters}
                    ListHeaderComponent={<Text style={styles.listTitle}>Anúncios Recentes</Text>}
                />
            </View>
        )
}
