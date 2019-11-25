import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        borderColor: '#f0f0f0',
        borderStyle: 'solid',
        borderWidth: 1,

        width: '50%',
        paddingLeft: 8,
        borderRadius: 8,

        marginTop: 3,
        marginBottom: 3,

        backgroundColor: '#fbfbfb'
    },

    textInputWide: {
        borderColor: '#f0f0f0',
        borderStyle: 'solid',
        borderWidth: 1,

        width: '80%',
        paddingLeft: 8,
        borderRadius: 8,

        marginTop: 3,
        marginBottom: 3,

        backgroundColor: '#fbfbfb'
    },

    button: {
        width:'50%',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    },

    aText: {
        color: '#0000ff'
    },
    
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },

    image: {
        width: '50%',
        resizeMode: 'contain',
        marginBottom: -100
    },

    marginTop30: {
        marginTop: 30
    },

    fontSize20: {
        fontSize: 20
    },




    border: {
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1
    }
});

export default styles;