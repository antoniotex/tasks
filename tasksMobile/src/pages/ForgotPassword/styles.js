import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    forgotBox:{
        marginHorizontal:20,
        marginTop:30
    },
    forgotTitle:{
        fontSize:35,
        textAlign:'center',
        color: '#f73859',
        fontWeight:'bold',
        marginVertical:10
    },
    forgotTextDefault:{
        fontSize:16,
        textAlign:'center'
    },
    forgotEmailInput:{
        borderWidth:.7,
        borderColor:'#f73859',
        color:'#000',
        fontSize:18,
        padding:0,
        paddingLeft:5,
        paddingVertical:10,
        marginVertical:15,
        borderRadius:10
    },
    forgotSendButton:{
        alignSelf:'center',
        backgroundColor:'#f73859',
        borderRadius:10,
        marginVertical:30,
        width:'90%',
        marginHorizontal:20,
    },
    forgotSendButtonText:{
        fontSize:25,
        color:'#fff',
        paddingVertical:20,
        textAlign:'center'
    },
})    

export default styles