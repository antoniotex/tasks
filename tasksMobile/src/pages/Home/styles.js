import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        marginLeft: 10
    },
    noPosters:{
        borderColor:'#ddd',
        borderWidth:2,
        borderStyle: 'dashed',
        marginHorizontal:20,
        marginTop:50
    },
    noPostersText:{
        fontSize:25,
        marginVertical:70,
        textAlign:'center',
        color:'#bbb'
    }
})