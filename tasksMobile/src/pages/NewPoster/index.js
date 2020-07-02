import React, { useContext, useState, useEffect, createRef } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView, ClippingRectangle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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
    const [imageIndex, setImageIndex] = useState(0)
    const [editId, setEditId] = useState(null)
    const imageDefault = 'https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG'
    
    const [imagesUpload, setImagesUpload] = useState([])
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

        useEffect(() => {
            setEditId(posterEditId)
        }, [])

    async function handleSubmit() {
        const images = new FormData()
        for (let i = 0; i < imagesUpload.length; i++) {
            if (imagesUpload[i].id === undefined) {
                await images.append(`images`, imagesUpload[i])
            }
        }
        debugger
        images.append('title', title)
        images.append('description', description)
        images.append('cep', cep)
        images.append('state', state)
        images.append('city', city)
        images.append('neighborhood', neighborhood)
        images.append('category_id', route.params.id)

        const storageToken = await AsyncStorage.getItem('@RNAuth:token');
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');

        try {
            debugger
            if (editId) {
                const response = await api.post(`/posters/${editId}`, images, {
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
            type: DocumentPicker.types.images
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
        console.log('entrei editinputs', response.data)
        changePosterMode(null)
        setTitle(response.data.title)
        await setCategory({id: response.data.category_id, name:response.data.category.name})
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
    const height = width * .7

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    else
        return (
            <SafeAreaView style={{backgroundColor:'#fff'}}>
            <KeyboardAvoidingView style={{ height: '100%'}} behavior={Platform.Os == "ios" ? "padding" : "height"} enabled>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.NewPosterTitle}> Novo Anúncio</Text>

                    { imagesUpload.length > 0 && <View style={{ width, height, alignSelf: 'flex-start' }}>
                        <ScrollView
                            pagingEnabled
                            horizontal
                            ref={(ref) => scrollView = ref}
                            showsHorizontalScrollIndicator={false}
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
                        </ScrollView>
                        {imageIndex <= imagesUpload.length && <View style={{
                            width: 50,
                            backgroundColor: '#E02041',
                            position: 'absolute', bottom: 5, left: width * 0.5 - 25,
                            padding: 10, borderRadius: 20
                        }}>
                            <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 16 }}>{imageIndex}/{imagesUpload.length}</Text>
                        </View>}
                    </View>}
                    <TouchableOpacity style={styles.addFile} onPress={handlePicker} disabled={imagesUpload.length > 3}>
                        <Icon name="addfile" size={25} color="#E02041" />
                        <Text style={styles.addFileText}>Adicionar imagens {imagesUpload.length}/4</Text>
                    </TouchableOpacity>

                    <View style={styles.login}>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: Tesoureiro Sênior" value={title}
                                placeholderTextColor="#ccc"
                                autoCapitalize="sentences"
                                onChangeText={value => setTitle(value)}
                                maxLength={60} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={{ ...styles.input, textAlignVertical:'top', minHeight:100 }}
                                placeholder="Ex.: Ofereço meus serviços de tesouraria, tenho experiência em grandes empresas. Tenho ótimo raciocínio analítico na resolução de problemas" value={description}
                                autoCapitalize="sentences"
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="#ccc"
                                onChangeText={value => setDescription(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>CEP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: 04858-570" value={cep} textContentType="postalCode"
                                keyboardType="number-pad"
                                placeholderTextColor="#ccc"
                                onChangeText={value => setCep(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                placeholder="Ex.: SP"
                                autoCapitalize="sentences"
                                placeholderTextColor="#ccc"
                                onChangeText={value => setState(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                value={city}
                                placeholder="Ex.: São Paulo"
                                placeholderTextColor="#ccc"
                                onChangeText={value => setCity(value)} />
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Bairro</Text>
                            <TextInput
                                style={styles.input}
                                value={neighborhood}
                                placeholder="Ex.: Grajaú"
                                placeholderTextColor="#ccc"
                                onChangeText={value => setNeighborhood(value)} />
                        </View>
                        
                        <View style={styles.inputBox}>
                            <Text style={{...styles.label, marginTop:20}}>Categoria</Text>
                            <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Categories', { categories })}>
                                <Text style={styles.selectCategoryText}>
                                    { route.params ? `Categoria: ${route.params.name}` :
                                    category?.name ? `Categoria: ${category.name}` : 'Selecione uma categoria...' }
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                            <Text style={styles.textLoginButton}>Anunciar!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        )
}
