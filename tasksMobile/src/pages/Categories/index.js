import React, { useState, useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function Categories() {
    const route = useRoute()
    const navigation = useNavigation();

    useEffect(() => {
        console.log('Dentro categories', route.params)
    }, [])

    return (
        <SafeAreaView>
            { route.params.categories.map((item, index) => (
                <TouchableOpacity key={index}>
                    <Text>{ item.name }</Text>
                </TouchableOpacity>
            )) }
        </SafeAreaView>
    )
}