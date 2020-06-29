import React, { useContext, useState, useEffect, createRef } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PickerIOS } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/AntDesign'
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../contexts/auth';
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
    const { categories, loadCategories, posterEditId, loading, setLoading, changePosterMode } = useContext(PosterContext)

    const navigation = useNavigation();
    const route = useRoute()

    let scrollView = createRef < typeof ScrollView >

        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', async () => {
                if (posterEditId) {
                    editInputs()
                }

                loadCategories()
            })
            return unsubscribe
        }, [navigation])

    async function handleSubmit() {
        const images = new FormData()
        for (let i = 0; i < imagesUpload.length; i++) {
            if (imagesUpload[i].id === undefined) {
                await images.append(`images`, imagesUpload[i])
            }
        }

        images.append('title', title)
        images.append('description', description)
        images.append('cep', cep)
        images.append('state', state)
        images.append('city', city)
        images.append('neighborhood', neighborhood)
        images.append('category_id', category)

        const storageToken = await AsyncStorage.getItem('@RNAuth:token');
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');

        try {
            if (posterEditId) {
                const response = await api.post(`/posters/${posterEditId}`, images, {
                    headers: {
                        'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
                        'Authorization': `Bearer ${storageToken}`
                    }
                })
            } else {
                const response = await api.post(`/${JSON.parse(storageUser).id}/posters`, images, {
                    headers: {
                        'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
                        'Authorization': `Bearer ${storageToken}`
                    }
                })
            }
            navigation.navigate('MyPosters')

        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    async function handlePicker() {
        const options = {
            type: 'image/*'
        }
        try {
            const fileSelected = await DocumentPicker.pickMultiple(options)

            if (fileSelected.type == 'cancel') return

            if (imagesUpload.length == 0) {
                setImageIndex(1)
            }

            const teste = [...imagesUpload, ...fileSelected]
            await setImagesUpload(teste)
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
            } else {
                throw err;
            }
        }
    }

    const changeImage = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        setImageIndex(slide + 1)
    }

    async function deleteImage(index) {
        if (imagesUpload[index].id !== undefined) {
            await api.delete(`/posters/image/${imagesUpload[index].id}`)
        }

        let auxImages = imagesUpload
        auxImages.splice(index, 1)
        setImagesUpload(auxImages)
        if (index > 1) {

        }
        scrollView.scrollTo({ x: 0, y: 0, animated: true })
    }

    async function editInputs() {
        const response = await api.get(`/posters/${posterEditId}`)
        changePosterMode(null)
        setTitle(response.data.title)
        await setCategory(response.data.category_id)
        setCep(response.data.cep)
        setDescription(response.data.description)
        setState(response.data.state)
        setCity(response.data.city)
        setNeighborhood(response.data.neighborhood)

        const auxImages = response.data.images.map(image => {
            return { uri: image.location, id: image.id }
        })
        if (auxImages.length > 0) {
            setImageIndex(1)
        }
        setImagesUpload(auxImages)
        setLoading(false)
    }

    const { width } = Dimensions.get('window')
    const height = width * 0.7 //60%

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    else
        return (
            <SafeAreaView>
            <KeyboardAvoidingView style={{ height: '100%' }} behavior={Platform.Os == "ios" ? "padding" : "height"} enabled>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.NewPosterTitle}> Novo Anúncio</Text>
                    {/* <Text style={{ textAlign: 'center' }}>Adicione até 4 imagens</Text>

                    <View style={{ width, height, alignSelf: 'flex-start' }}>
                        <ScrollView
                            pagingEnabled
                            horizontal
                            ref={(ref) => scrollView = ref}
                            onContentSizeChange={() => {
                                if (imagesUpload.length == 0) {
                                    scrollView.scrollToEnd({ animated: true })
                                }
                            }}
                            onScroll={changeImage}
                            style={{ width, height }}>
                            {
                                imagesUpload.map((image, index) => (
                                    <View key={index} style={{ width, height }}>
                                        <TouchableOpacity onPress={() => deleteImage(index)} style={{
                                            position: 'absolute',
                                            zIndex: 9999, right: 10, top: 10,
                                            backgroundColor: '#E02041',
                                            borderRadius: 20,
                                            width: 40,
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name="delete" size={30} color="#fff" />
                                        </TouchableOpacity>
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={{ width, height, resizeMode: 'cover' }}
                                        />
                                    </View>
                                ))
                            }
                            <TouchableOpacity style={styles.addFile} onPress={handlePicker}>
                                <Icon name="addfile" size={70} color="#E02041" />
                            </TouchableOpacity>
                        </ScrollView>
                        {imageIndex <= imagesUpload.length && <View style={{
                            width: 50,
                            backgroundColor: '#E02041',
                            position: 'absolute', bottom: 5, left: width * 0.5 - 25,
                            padding: 10, borderRadius: 20
                        }}>
                            <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 16 }}>{imageIndex}/{imagesUpload.length}</Text>
                        </View>}
                    </View> */}

                    <View style={styles.login}>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: Tesoureiro Sênior" value={title}
                                placeholderTextColor="#c4edde"
                                autoCapitalize="sentences"
                                onChangeText={value => setTitle(value)}
                                maxLength={60} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: Ofereço meus serviços de tesouraria, tenho experiência em grandes empresas. Tenho ótimo raciocínio analítico na resolução de problemas" value={description}
                                autoCapitalize="sentences"
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="#c4edde"
                                onChangeText={value => setDescription(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>CEP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: 04858-570" value={cep} textContentType="postalCode"
                                keyboardType="number-pad"
                                placeholderTextColor="#c4edde"
                                onChangeText={value => setCep(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                placeholder="Ex.: SP"
                                autoCapitalize="words"
                                placeholderTextColor="#c4edde"
                                onChangeText={value => setState(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                value={city}
                                placeholder="Ex.: São Paulo"
                                placeholderTextColor="#c4edde"
                                onChangeText={value => setCity(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Bairro</Text>
                            <TextInput
                                style={styles.input}
                                value={neighborhood}
                                placeholder="Ex.: Grajaú"
                                placeholderTextColor="#c4edde"
                                onChangeText={value => setNeighborhood(value)} />
                        </View>

                        <PickerIOS
                            style={{ borderWidth:1 }}
                            selectedValue={category}
                            onValueChange={(value, index) => { setCategory(value) }}
                            itemStyle={{ color: '#f73859' }}
                        >
                            <PickerIOS.Item itemStyle={{ color: '#f73859' }} label="Selecione uma categoria..." color="#bbb" value="" />
                            {categories.map((item, index) => (
                                <PickerIOS.Item key={index} label={item.name} value={item.id} />
                            ))}
                        </PickerIOS>

                        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                            <Text style={styles.textLoginButton}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        )
}
