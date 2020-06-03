import React from 'react'
import { View, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles';

export default function Home() {
    const uri = 'https://www.infomoney.com.br/wp-content/uploads/2019/08/carteira-de-trabalho-7.jpg'
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput style={styles.search} placeholder="Pesquisar" />
            </View>
            <View style={styles.list}>
                <Text style={styles.listTitle}>Anúncios Recentes</Text>
                <View style={styles.card}>
                    <View style={styles.cardImage}>
                        <Image
                            style={{ width: 100, height: 100 }} source={{ uri }} />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text>Titulo do anuncio</Text>
                        <Text>Categoria: Tecnologia/TI</Text>
                        <Text>02 de Junho 22:45, São João da Barra - RJ</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
