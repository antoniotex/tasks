import React, { useContext, useState } from 'react';
import { View, Button, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signed, signIn } = useContext(AuthContext);
    const navigation = useNavigation();

    console.log(signed)


    function handleSignIn() {
        signIn({ email, password });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logoImg} />
            <KeyboardAvoidingView style={styles.login}>
                <Text style={{ textAlign: 'center' }}>Entre com sua conta</Text>
                <View style={styles.inputBox}>
                    <AntDesign name="mail" size={30} color="#ccc" />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail" textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={value => setEmail(value)} />
                </View>
                <View style={styles.inputBox}>
                    <AntDesign name="lock1" size={30} color="#ccc" />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha" secureTextEntry
                        autoCapitalize="none"
                        onChangeText={value => setPassword(value)} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} >
                    <Text style={styles.textLoginButton}>Fazer login</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>Ou utilize sua rede social</Text>
                <View style={styles.socialNetwork}>
                    <AntDesign name="facebook-square" size={35} color="#4267B2" />
                    <AntDesign name="google" size={35} color="#DB4437" />
                    <AntDesign name="twitter" size={35} color="#1DA1F2" />
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Register')}>
                <Text>Não tenho cadastro? Crie sua conta!</Text>
            </TouchableOpacity>
        </View>
    );
}
