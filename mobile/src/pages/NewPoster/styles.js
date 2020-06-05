import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: '#ddd',
        paddingTop: Constants.statusBarHeight + 7,
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 20
    },
    login: {
        width: '93%',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    inputBox: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginVertical: 10,
        alignItems: 'center'
    },
    input: {
        fontSize: 20,
        width: '93%',
        padding: 10
    },
    loginButton: {
        width: 200,
        height: 50,
        backgroundColor: '#E02041',
        alignSelf: 'center',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textLoginButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    socialNetwork: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20
    },
    signup: {
        marginTop: 40,
        marginBottom: 80
    },
    selectCategory: {
        fontSize: 20,
        borderBottomWidth: 2
    }
})

export default styles;