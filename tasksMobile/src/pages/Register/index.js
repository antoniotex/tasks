import React, { useContext, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Register() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signed, signIn, register } = useContext(AuthContext);
    const navigation = useNavigation();

    function handleRegister() {
        register({ name, username, email, password });
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.login}>
                <Text style={styles.signupTitle}>Criar Conta</Text>
                <View style={styles.inputBox}>
                    <Icon name="user" size={30} color="#7ac7c4" />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome" value={name} textContentType="name"
                        placeholderTextColor="#c4edde"
                        autoCapitalize="words"
                        onChangeText={value => setName(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="smileo" size={30} color="#7ac7c4" />
                    <TextInput
                        style={styles.input}
                        placeholder="Apelido" value={username} textContentType="name"
                        placeholderTextColor="#c4edde"
                        autoCapitalize="none"
                        onChangeText={value => setUsername(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="mail" size={30} color="#7ac7c4" />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail" value={email} textContentType="emailAddress"
                        placeholderTextColor="#c4edde"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={value => setEmail(value)} />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="lock1" size={30} color="#7ac7c4" />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Senha" secureTextEntry
                        placeholderTextColor="#c4edde"
                        autoCapitalize="none"
                        onChangeText={value => setPassword(value)} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister} >
                    <Text style={styles.textLoginButton}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signupText}>Já tem uma conta?  Clique para entrar!</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
