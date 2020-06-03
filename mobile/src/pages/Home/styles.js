import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    }
})