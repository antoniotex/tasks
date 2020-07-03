import React, { useContext, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-tiny-toast'

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Register() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone_number, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signed, signIn, register, loading } = useContext(AuthContext);
    const navigation = useNavigation();

    function handleRegister() {
        if(!name || !username || !phone_number || !email || !password){
            Toast.show('Todos os campos são obrigatórios')
            return
        }
        console.log(phone_number)
        return
        register({ name, username, phone_number, email, password });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <KeyboardAvoidingView style={styles.login}>
                <Text style={styles.signupTitle}>Crie sua conta</Text>
                <View style={styles.inputBox}>
                    <Icon name="user" size={30} color="#ccc" />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="Nome" value={name} textContentType="name"
                        placeholderTextColor="#ccc"
                        autoCapitalize="words"
                        onChangeText={value => setName(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="smileo" size={30} color="#ccc" />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="Apelido" value={username} textContentType="name"
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        onChangeText={value => setUsername(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="phone" size={30} color="#ccc" />
                    <TextInputMask 
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholderTextColor='#ccc'
                        type={'cel-phone'}
                        value={phone_number}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                          }}
                        onChangeText={value => setPhoneNumber(value)}
                        placeholder='Telefone'

                    />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="mail" size={30} color="#ccc" />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        placeholder="E-mail" value={email} textContentType="emailAddress"
                        placeholderTextColor="#ccc"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={value => setEmail(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="lock1" size={30} color="#ccc" />
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.input}
                        value={password}
                        placeholder="Senha" secureTextEntry
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        onChangeText={value => setPassword(value)} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister} >
                    {loading && <ActivityIndicator style={styles.textLoginButton} size='small' />}
                    {!loading && <Text style={styles.textLoginButton}>Cadastrar</Text> }
                </TouchableOpacity>
                <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signupText}>Já tem uma conta?  Clique para entrar!</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                </ScrollView>
        </SafeAreaView>
    )
}
