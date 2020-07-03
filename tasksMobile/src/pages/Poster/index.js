import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import { MaskService } from 'react-native-masked-text'

import moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';

export default function Poster() {
    const [imageIndex, setImageIndex] = useState(0)
    const route = useRoute();
    const poster = route.params.poster

    const { width } = Dimensions.get('window')
    const height = width * .9

    const changeImage = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        setImageIndex(slide)
    }

    return (
        <ScrollView>
            <View>
                <ScrollView
                    pagingEnabled
                    horizontal
                    onScroll={changeImage}
                    showsHorizontalScrollIndicator={false}
                    style={{ width, height, backgroundColor: '#ddd' }}>
                    {
                        poster.images.map((image, index) => (
                            <Image key={index} style={{ width, height, resizeMode:'contain' }} source={{ uri: image.location }} />
                        ))
                    }

                </ScrollView>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', width,
                    position: 'absolute', bottom: -15
                }}>
                    {
                        poster.images.length > 1 && poster.images.map((image, index) => (
                            <Icon key={index} name="minus" size={50} color={index == imageIndex ? '#E02041' : '#888'} />
                        ))
                    }
                </View>
            </View>
            <View style={styles.posterDetails}>
                <Text style={styles.title}>{poster.title}</Text>
                <Text style={styles.date}>
                    Publicado em {moment(poster.createdAt).format('LLL')}
                </Text>
                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                </View>
                <Text style={styles.defaultText}>{poster.description}</Text>
                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>Detalhes</Text>
                </View>
                <Text style={styles.defaultText}>Categoria: {poster.category.name}</Text>
                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>Localização</Text>
                </View>
                <Text style={styles.defaultText}>CEP: {poster.cep}</Text>
                <Text style={styles.defaultText}>Bairro: {poster.neighborhood}</Text>
                <Text style={styles.defaultText}>Cidade/UF: {poster.city}, {poster.state}</Text>
                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>Contato</Text>
                </View>
                {console.log(poster.user)}
                <Text style={styles.defaultText}>Anunciante: {poster.user.name}</Text>
                <Text style={styles.defaultText}>
                    Telefone: {MaskService.toMask('cel-phone', poster.user.phone_number)}
                </Text>
                <Text style={styles.defaultText}>E-mail: {poster.user.email}</Text>
            </View>
        </ScrollView>
    )
}
