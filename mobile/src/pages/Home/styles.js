import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        width: '100%',
        paddingTop: Constants.statusBarHeight
    }
})