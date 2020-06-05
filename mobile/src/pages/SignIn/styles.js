import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    logo: {
        width: 200,
        height: 80,
        marginBottom: 50
    },
    login: {
        width: '95%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 40
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
        width: '100%'
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
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    signup: {
        marginTop: 40,
        marginBottom: 80
    }
})

export default styles;