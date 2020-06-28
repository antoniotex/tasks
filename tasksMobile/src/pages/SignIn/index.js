import React, { useContext, useState } from 'react';
import { View, SafeAreaView, Dimensions, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'

import AuthContext from '../../contexts/auth';
import logoImg from '../../assets/logo-nome-3.png'

import styles from './styles';

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signed, signIn } = useContext(AuthContext);
    const navigation = useNavigation();

    function handleSignIn() {
        signIn({ email, password });
    }

    const { width } = Dimensions.get('window')

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.login}>
                <Image source={logoImg} style={{width: width*.9, height:width*.5, alignSelf:'center'}} />
                <Text style={styles.defaultText}>Entre com sua conta</Text>
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
                <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} >
                    <Text style={styles.textLoginButton}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.defaultText}>Ou utilize sua rede social</Text>
                <View style={styles.socialNetwork}>
                    <Icon name="facebook-square" size={45} color="#4267B2" />
                    <Icon style={{ marginHorizontal: 30 }} name="google" size={45} color="#DB4437" />
                    <Icon name="twitter" size={45} color="#1DA1F2" />
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupText}>Não tem uma conta?  Clique para criar!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}