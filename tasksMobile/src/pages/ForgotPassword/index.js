import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api'
import Toast from 'react-native-tiny-toast'

export default function ForgotPassword(){
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [flagCode, setFlagCode] = useState(false)

    const navigation = useNavigation()

    async function handleSubmit(){
        const emailValidate = await emailValidation(email)

        if(!emailValidate){
            Toast.show('Insira um endereço de e-mail válido')
            return
        }
        try {
            const response = await api.post('/users/forgot_password', {email})
            await setFlagCode(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCodeSubmit(){
        if(code.length < 6){
            Toast.show('Código inválido')
            return
        }
        try {
            const response = await api.post('/users/reset_password', {email, token: code, password})
            navigation.navigate('SignIn')
        } catch (error) {
            console.log(error)
        }
    }

    async function emailValidation(email){
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    return (
        <View style={styles.container}>
            <View style={styles.forgotBox}>
                <Text style={styles.forgotTitle}>Vamos lá!</Text>
                { !flagCode && <Text style={styles.forgotTextDefault}>Insira o endereço de e-mail utilizado no cadastro</Text> }
                { flagCode && <Text style={styles.forgotTextDefault}>Insira o código gerado e a nova senha</Text> }
                <TextInput
                    style={{...styles.forgotEmailInput, display: flagCode ? 'none' : 'flex'}}
                    placeholder='Endereço de e-mail'
                    placeholderTextColor='#ccc'
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    autoCorrect={false}
                    onChangeText={(value) => setEmail(value)}
                    editable={flagCode ? false : true}
                />
                <TextInput
                    style={{...styles.forgotEmailInput, display: flagCode ? 'flex' : 'none'}}
                    placeholder='Insira o código gerado'
                    placeholderTextColor='#ccc'
                    onChangeText={(value) => setCode(value)}
                    textContentType='postalCode'
                    maxLength={6}
                    
                />
                <TextInput
                    style={{...styles.forgotEmailInput, display: flagCode ? 'flex' : 'none'}}
                    placeholder='Insira a nova senha'
                    placeholderTextColor='#ccc'
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry
                    maxLength={6}
                    
                />
                <TouchableOpacity 
                    style={styles.forgotSendButton} 
                    onPress={flagCode ? () => handleCodeSubmit() : () => handleSubmit()}>
                    <Text style={styles.forgotSendButtonText}>
                        { flagCode ? 'Enviar' : 'Gerar código'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}