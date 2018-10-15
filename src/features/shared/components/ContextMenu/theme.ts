import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width } = Dimensions.get('window');

 export default StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0, 
        height: 45,
        zIndex: 2,
        width: width, 
        backgroundColor: '#E2E2E2',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000000',
        fontSize: 9,
        marginTop: 2,
        fontFamily: 'Lato'
    },
    mockImage: {
        width: 15,
        height: 15,
        marginBottom: 4
    },
    menuItem: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
  });