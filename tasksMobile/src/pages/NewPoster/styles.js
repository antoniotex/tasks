import { StyleSheet, Platform } from 'react-native';

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
        fontSize:15,
        paddingBottom:5,
        fontWeight:'bold'
    },
    inputBox:{
        flexDirection:'column',
        marginVertical:5,
        alignItems:'flex-start',
        marginHorizontal:15,
    },
    input:{
        borderWidth:.7,
        borderColor:'#f73859',
        borderRadius:10,
        padding:0,
        paddingVertical: Platform.OS === 'ios' ? 10 : 4,
        paddingHorizontal:4,
        color:'#000',
        width:'100%',
        fontSize:16
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
    selectCategoryText:{
        fontSize: 18,
        textAlign:'center'
    },
    addFile:{
        borderWidth:.7,
        borderColor:'#f73859',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:5,
        marginHorizontal:50,
        borderRadius:10,
        paddingVertical:5
    },
    addFileText:{
        fontSize:15,
        marginHorizontal:5
    }
})

export default styles;