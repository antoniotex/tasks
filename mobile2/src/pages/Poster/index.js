import React, { useState, useEffect, useContext, Children } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

import PosterContext from '../../contexts/posters';
import styles from './styles';

export default function Poster() {
    const route = useRoute();

    const poster = route.params.poster
    return (
        <View>
            <Text>{poster.title}</Text>
        </View>
    )
}
