import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: Constants.statusBarHeight,
    },
    list: {
        borderWidth: 2,
        borderColor: 'red'
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    }
})