import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width } = Dimensions.get('window');

 export default StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0, 
        height: 55,
        zIndex: 2,
        width: width, 
        backgroundColor: '#000',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 11,
        marginTop: 2,
        fontFamily: 'Lato'
    },
    mockImage: {
        width: 17,
        height: 17,
        marginBottom: 4
    },
    menuItem: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
  });