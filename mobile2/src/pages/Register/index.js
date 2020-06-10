import React, { useContext, useState } from 'react';
import { View, Button, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { AntDesign } from '@expo/vector-icons';

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
        <View style={styles.container}>
            <Image style={styles.logo} source={logoImg} />
            <KeyboardAvoidingView style={styles.login}>
                <Text style={{ textAlign: 'center' }}>Entre com sua conta</Text>
                <View style={styles.inputBox}>
                    {/* <AntDesign name="user" size={30} color="#ccc" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nome" value={name} textContentType="name"
                        autoCapitalize="words"
                        onChangeText={value => setName(value)} />
                </View>
                <View style={styles.inputBox}>
                    {/* <AntDesign name="smileo" size={30} color="#ccc" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Apelido" value={username} textContentType="name"
                        autoCapitalize="none"
                        onChangeText={value => setUsername(value)} />
                </View>
                <View style={styles.inputBox}>
                    {/* <AntDesign name="mail" size={30} color="#ccc" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail" value={email} textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={value => setEmail(value)} />
                </View>
                <View style={styles.inputBox}>
                    {/* <AntDesign name="lock1" size={30} color="#ccc" /> */}
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Senha" secureTextEntry
                        autoCapitalize="none"
                        onChangeText={value => setPassword(value)} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister} >
                    <Text style={styles.textLoginButton}>Cadastrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
