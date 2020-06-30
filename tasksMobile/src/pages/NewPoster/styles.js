import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    NewPosterTitle:{
        fontSize:35,
        textAlign:'center',
        color: '#f73859',
        fontWeight:'bold',
        marginTop:30,
        marginBottom:20
    },
    label:{
        fontSize:17,
        paddingBottom:5
    },
    inputBox:{
        flexDirection:'column',
        marginVertical:10,
        alignItems:'flex-start',
        marginHorizontal:15,
    },
    input:{
        borderWidth:.7,
        borderColor:'#f73859',
        borderRadius:10,
        padding:0,
        paddingVertical:10,
        paddingLeft:5,
        color:'#000',
        width:'100%',
        fontSize:18,
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
})

export default styles;