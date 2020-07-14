import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, View, FlatList,Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView, ClippingRectangle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-tiny-toast'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'

import Icon from 'react-native-vector-icons/AntDesign'
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import PosterContext from '../../contexts/posters';
import api from '../../services/api';

export default function NewPoster() {
    const navigation = useNavigation();
    const route = useRoute()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cep, setCep] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [category, setCategory] = useState(null)
    const [imageIndex, setImageIndex] = useState(0)
    const [editId, setEditId] = useState(null)
    const [cepLoading, setCepLoading] = useState(false)
    
    const [imagesUpload, setImagesUpload] = useState([])
    const { categories, loadCategories, posterEditId, loading, setLoading, changePosterMode } = useContext(PosterContext)


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

    useEffect(() => {
        if(cep.length > 8){
            loadAddress()
        }
    }, [cep])

    async function handleSubmit() {
        setLoading(true)
        if(!title || !description || !cep || !state || !city || !neighborhood || (!category && !route.params)){
            Toast.show('Todos os campos são obrigatórios')
            return
        }

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
        images.append('category_id', route.params ? route.params.id : category.id)

        const storageToken = await AsyncStorage.getItem('@RNAuth:token');
        const storageUser = await AsyncStorage.getItem('@RNAuth:user');

        try {
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
            setLoading(false)
            navigation.navigate('MyPosters')

        } catch (error) {
            setLoading(false)
            Toast.show('Ocorreu um erro, tente novamente mais tarde')
            if(error.response.status == 401)
                signOut()

            console.log(error.response.data.error)
        }
    }

    async function handlePicker() {
        const options = {
            type: DocumentPicker.types.images
        }
        try {
            const fileSelected = await DocumentPicker.pickMultiple(options)

            if((fileSelected.length + imagesUpload.length) > 6){
                Toast.show('É permitido no máximo 6 imagens')
                return
            }

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

    async function deleteImage(index) {
        if (imagesUpload[index].id !== undefined) {
            await api.delete(`/posters/image/${imagesUpload[index].id}`)
        }

        const filteredImages = await imagesUpload.filter(item => item !== imagesUpload[index])
        await setImagesUpload(filteredImages)
    }

    async function editInputs() {
        const response = await api.get(`/posters/${posterEditId}`)
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

    async function loadAddress(){
        try {
            setCepLoading(true)
            const address = await axios.get(`https://viacep.com.br/ws/${cep.replace(/-/, '')}/json/`, {
                timeout: 5000
            })
            setCepLoading(false)

            if(address.data.erro){
                Toast.show('CEP não encontrado')
                return
            }
            Keyboard.dismiss()
            setState(address.data.uf)
            setCity(address.data.localidade)
            setNeighborhood(address.data.bairro)            
        } catch (error) {
            setCepLoading(false)
            setState('')
            setCity('')
            setNeighborhood('')
            Toast.show('Ocorreu um erro, por favor digite o restante do endereço')
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff'}}>
        <KeyboardAvoidingView style={{ height: '100%'}} behavior={Platform.Os == "ios" ? "padding" : "height"} enabled>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.NewPosterTitle}> Novo Anúncio</Text>

                <FlatList
                    data={imagesUpload}
                    horizontal
                    renderItem={({ item, index }) => (
                        <View key={index} style={{...styles.imageBoxItem}}>
                            <TouchableOpacity onPress={() => deleteImage(index)} style={{
                                position: 'absolute',
                                zIndex: 9999, right: 4, top: 4,
                                backgroundColor: '#f73859',
                                borderRadius: 15,
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <Icon name="delete" size={20} color="#fff" />
                            </TouchableOpacity>
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.posterImage}
                            />
                    </View>
                    )}
                    keyExtractor={item => item.id}
                />

                <TouchableOpacity style={styles.addFile} onPress={handlePicker} disabled={imagesUpload.length > 5}>
                    <Icon name="addfile" size={25} color="#E02041" />
                    <Text style={styles.addFileText}>Adicionar imagens {imagesUpload.length}/6</Text>
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
                            maxLength={85} />
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
                    
                    <View style={{...styles.inputBox, marginTop: -3, alignItems:'flex-end'}}>
                        <Text style={{fontSize:13, color: 3000 - description.length < 0 ? 'red' : 'green'}}>
                            Caracteres restantes: {3000 - description.length}
                        </Text>
                    </View>

                    <View style={styles.cepUfBox}>
                        <View style={{...styles.inputBox, flex:2}}>
                            <Text style={styles.label}>CEP</Text>
                            <TextInputMask
                                type={'zip-code'}
                                style={styles.input}
                                placeholder="Ex.: 04858-570"
                                placeholderTextColor="#ccc"
                                value={cep}
                                onChangeText={value => setCep(value)}
                            />
                            { cepLoading && <ActivityIndicator style={{alignSelf:'center', position:'absolute', top:25}} size='large' color='#ccc' />}
                        </View>

                        <View style={{...styles.inputBox, flex:1}}>
                            <Text style={styles.label}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                placeholder="Ex.: SP"
                                autoCapitalize='characters'
                                placeholderTextColor="#ccc"
                                maxLength={2}
                                onChangeText={value => setState(value)} />
                        </View>
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
                        <TouchableOpacity style={{...styles.input, paddingVertical:10}} onPress={() => navigation.navigate('Categories', { categories })}>
                            <Text style={styles.selectCategoryText}>
                                { route?.params ? `Categoria: ${route.params.name}` :
                                category?.name ? `Categoria: ${category.name}` : 'Selecione uma categoria...' }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        {loading && <ActivityIndicator style={styles.textLoginButton} size='small' color='#ccc' />}
                        {!loading && <Text style={styles.textLoginButton}>Anunciar</Text> }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
