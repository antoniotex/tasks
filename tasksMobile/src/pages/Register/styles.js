import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signupTitle:{
        fontSize:35,
        textAlign:'center',
        color: '#f73859',
        fontWeight:'bold',
        marginTop:40,
        marginBottom:40
    },
    inputBox:{
        borderWidth:.7,
        borderColor:'#f73859',
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
        paddingLeft:5,
        borderRadius:10,
        alignItems:'center'
    },
    input:{
        color:'#000',
        width:'90%',
        fontSize:18,
        padding:0,
        paddingLeft:5,
        height:'100%',
        marginVertical:15
    },
    loginButton:{
        alignSelf:'center',
        backgroundColor:'#f73859',
        borderRadius:10,
        marginVertical:30,
        width:'90%',
        marginHorizontal:20,
    },
    textLoginButton:{
        fontSize:25,
        color:'#fff',
        paddingVertical:20,
        textAlign:'center'
    },
    signupText:{
        fontSize:17,
        textAlign:'center',
        marginTop:40,
        color:'#f73859'
    },
})

export default styles;