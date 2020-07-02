import React, { useState, useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import styles from './styles';

export default function Categories() {
    const route = useRoute()
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={styles.container}>
                { route.params.categories.map((item, index) => (
                    <TouchableOpacity 
                        style={styles.categoryItem} 
                        key={index}
                        onPress={() => navigation.navigate('NewPoster', { id: item.id, name: item.name })}>
                        <Text style={styles.categoryText}>{ item.name }</Text>
                    </TouchableOpacity>
                )) }
            </ScrollView>
        </SafeAreaView>
    )
}