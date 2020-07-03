import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    defaultText:{
        fontSize:17,
        textAlign:'center',
        marginTop:20
    },
    signupText:{
        fontSize:17,
        textAlign:'center',
        marginTop:40,
        color:'#f73859'
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
        marginVertical:15,
        height:'100%'
    },
    loginButton:{
        alignSelf:'center',
        backgroundColor:'#f73859',
        borderRadius:10,
        marginVertical:30,
        width:'90%',
        marginHorizontal:20,
        height:60,
        justifyContent:'center'
    },
    textLoginButton:{
        fontSize:25,
        color:'#fff',
        textAlign:'center'
    },
    socialNetwork:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:20
    }
})

export default styles;