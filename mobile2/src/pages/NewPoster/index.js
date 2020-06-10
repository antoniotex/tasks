import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, AsyncStorage, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/AntDesign'
// import * as DocumentPicker from 'expo-document-picker';

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import PosterContext from '../../contexts/posters';
import api from '../../services/api';

export default function NewPoster() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cep, setCep] = useState(null)
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [category, setCategory] = useState(null)
    const [imagesUpload, setImagesUpload] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const imageDefault = 'https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG'

    const { signed, register } = useContext(AuthContext);
    const { categories, loadCategories } = useContext(PosterContext)
    const navigation = useNavigation();

    useEffect(() => {
        loadCategories()
    }, [])

    async function handleSubmit() {
        const images = new FormData()
        for (let i = 0; i < imagesUpload.length; i++) {
            await images.append(`images`, imagesUpload[0])
        }

        images.append('title', title)
        images.append('description', description)
        images.append('cep', cep)
        images.append('state', state)
        images.append('city', city)
        images.append('neighborhood', neighborhood)
        images.append('category_id', category)

        const storageToken = await AsyncStorage.getItem('@RNAuth:token');

        try {
            const response = await api.post('/2/posters', images, {
                headers: {
                    'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
                    'Authorization': `Bearer ${storageToken}`
                }
            })
            console.log('response.data', response.data)
        } catch (error) {
            console.log(error.response.data.success)
        }
    }

    async function handlePicker() {
        const options = {
            type: 'image/*',
            copyToCacheDirectory: false,
            multiple: true
        }
        const fileSelected = await DocumentPicker.getDocumentAsync(options)

        if (fileSelected.type == 'cancel') return

        const file = {
            name: fileSelected.name,
            uri: fileSelected.uri,
            type: `image/${fileSelected.name.split('.').pop()}`
        }
        console.log('fileselected: ', fileSelected)

        const teste = [...imagesUpload, file]
        await setImagesUpload(teste)
    }

    const changeImage = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        setImageIndex(slide + 1)
    }

    const { width } = Dimensions.get('window')
    const height = width * 0.7 //60%

    return (
        <KeyboardAvoidingView style={{ height: '100%' }} behavior={Platform.Os == "ios" ? "padding" : "height"} enabled>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={{ textAlign: 'center' }}>Adicione até 4 imagens</Text>

                <View style={{ width, height, alignSelf: 'flex-start' }}>
                    <ScrollView pagingEnabled horizontal onScroll={changeImage} style={{ width, height }}>
                        {
                            imagesUpload.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image.uri }}
                                    style={{ width, height, resizeMode: 'cover' }}
                                />
                            ))
                        }
                        <TouchableOpacity style={styles.addFile} onPress={handlePicker}>
                            <Icon name="addfile" size={70} color="#E02041" />
                        </TouchableOpacity>
                    </ScrollView>
                    {imageIndex <= imagesUpload.length && <View style={{
                        width: 50,
                        borderColor: '#E02041', backgroundColor: '#E02041',
                        position: 'absolute', bottom: 5, left: width * 0.5 - 25,
                        padding: 10, borderRadius: 20
                    }}>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 16 }}>{imageIndex}/{imagesUpload.length}</Text>
                    </View>}
                </View>

                <View style={styles.login}>
                    <View style={styles.inputBox}>
                        <Icon name="pushpino" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Título" value={title}
                            autoCapitalize="sentences"
                            onChangeText={value => setTitle(value)}
                            maxLength={30} />
                    </View>

                    <View style={styles.inputBox}>
                        <Icon name="filetext1" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição" value={description}
                            autoCapitalize="sentences"
                            onChangeText={value => setDescription(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <Icon name="home" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP" value={cep} textContentType="postalCode"
                            keyboardType="number-pad"
                            onChangeText={value => setCep(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <Icon name="lock1" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={state}
                            placeholder="Estado"
                            autoCapitalize="words"
                            onChangeText={value => setState(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <Icon name="lock1" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={city}
                            placeholder="Cidade"
                            onChangeText={value => setCity(value)} />
                    </View>

                    <View style={styles.inputBox}>
                        <Icon name="lock1" size={20} color="#ccc" />
                        <TextInput
                            style={styles.input}
                            value={neighborhood}
                            placeholder="Bairro"
                            onChangeText={value => setNeighborhood(value)} />
                    </View>

                    <Picker
                        style={{ width: '100%', height: 100 }}
                        selectedValue={category}
                        onValueChange={(value, index) => { setCategory(value) }}
                        itemStyle={{ color: 'blue' }}
                    >
                        <Picker.Item itemStyle={{ color: 'blue' }} label="Selecione uma categoria..." color="#bbb" value="" />
                        {categories.map((item, index) => (
                            <Picker.Item key={index} label={item.name} value={item.id} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.textLoginButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}