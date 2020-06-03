import React from 'react'
import { View, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'

export default function Home() {
    const uri = 'https://www.infomoney.com.br/wp-content/uploads/2019/08/carteira-de-trabalho-7.jpg'
    const list = [
        { id: 2, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 3, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 4, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 5, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 6, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 7, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 8, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 9, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 10, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
        { id: 11, uri: uri, title: 'Titulo do Anuncio', categoria: 'Tecnologia/TI', data: '02 de Junho 22:45, São João da Barra - RJ' },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <Text style={styles.listTitle}>Anúncios Recentes</Text>
                <FlatList
                    data={list}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <Card data={item} />}
                />
            </View>
        </View>
    )
}
