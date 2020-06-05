import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker'

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import PosterContext from '../../contexts/posters';

export default function NewPoster() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cep, setCep] = useState(null)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [category, setCategory] = useState(null)

    const { signed, register } = useContext(AuthContext);
    const { categories, loadCategories } = useContext(PosterContext)
    const navigation = useNavigation();

    useEffect(() => {
        loadCategories()
        console.log('dentro new poster', categories)
    }, [])

    function handleRegister() {
        register({ name, username, email, password });
    }

    return (
        <KeyboardAvoidingView style={{ height: '100%' }} behavior={Platform.Os == "ios" ? "padding" : "height"} enabled>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={styles.logo} source={logoImg} />
                <View style={styles.login}>
                    <Text style={{ textAlign: 'center' }}>Novo anúncio</Text>

                    <View style={styles.inputBox}>
                        <AntDesign name="pushpino" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Título" value={title}
                            autoCapitalize="sentences"
                            onChangeText={value => setTitle(value)}
                            maxLength={30} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="filetext1" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição" value={description}
                            autoCapitalize="sentences"
                            onChangeText={value => setDescription(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="home" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP" value={cep} textContentType="postalCode"
                            keyboardType="number-pad"
                            onChangeText={value => setCep(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="lock1" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={state}
                            placeholder="Estado"
                            autoCapitalize="words"
                            onChangeText={value => setState(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="lock1" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={city}
                            placeholder="Cidade"
                            onChangeText={value => setCity(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="lock1" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={neighborhood}
                            placeholder="Bairro"
                            onChangeText={value => setNeighborhood(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <AntDesign name="lock1" size={30} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={category}
                            placeholder="Categoria"
                            onChangeText={value => setCategory(value.toString())} />
                    </View>

                    <Picker
                        style={{ width: '100%', height: 100 }}
                        selectedValue={category}
                        onValueChange={(value, index) => { setCategory(value) }}
                        itemStyle={{ color: 'blue' }}
                    >
                        <Picker.Item itemStyle={{ color: 'blue' }} label="Selecione uma categoria..." value="" />
                        {categories.map((item, index) => (
                            <Picker.Item key={index} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                    <Text>{category}</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={handleRegister} >
                        <Text style={styles.textLoginButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
