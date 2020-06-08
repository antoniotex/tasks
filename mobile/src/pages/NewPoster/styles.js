import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        fontSize: 15,
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
    selectCategory: {
        fontSize: 20,
        borderBottomWidth: 2
    },
    addFile: {
        width: 360,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignSelf: 'center',
        alignItems: 'center',
        borderColor: '#E02041'
    }
})

export default styles;