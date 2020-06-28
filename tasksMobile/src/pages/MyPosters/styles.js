import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    counter: {
        fontSize: 25,
        marginVertical: 10,
        textAlign:'center'
    },
    list: {
        borderTopWidth: .2,
        paddingVertical: 10,
    },
    card: {
        borderWidth: .4,
        borderColor: '#E02041',
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(224,32,65,.1)'
    },
    cardInfo: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 5,
        paddingLeft: 10
    },
    titleDate: {
        flex: 4,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    cardActions: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 15,
        justifyContent: 'space-around'
    },
    cardTitle: {
        fontSize: 17
    },
    cardDate: {
        marginTop: 10,
        color: '#aaa'
    }
})

export default styles