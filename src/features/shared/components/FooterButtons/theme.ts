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
        width: width, 
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center', 
        flexDirection: 'row',
        alignItems: 'center'
    }
  });