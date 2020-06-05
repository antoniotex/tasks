import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 7,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    }
})