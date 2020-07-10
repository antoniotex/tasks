import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    pageTitle:{
        fontSize:35,
        textAlign:'center',
        color: '#f73859',
        fontWeight:'bold',
        marginBottom:20
    },
    defaultButton:{
        alignSelf:'center',
        backgroundColor:'#f73859',
        borderRadius:10,
        marginVertical:30,
        width:'90%',
        marginHorizontal:20,
    },
    textDefaultButton:{
        fontSize:20,
        color:'#fff',
        paddingVertical:15,
        textAlign:'center'
    },
    setOption:{
        padding:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
        borderWidth:0.7,
        borderColor:'#f73859',
        borderRadius:10,
        paddingLeft:5
    },
    setOptionText:{
        padding:0,
        fontSize:17,
        // color:'#f73859',
        paddingVertical:10
    }
})

export default styles;