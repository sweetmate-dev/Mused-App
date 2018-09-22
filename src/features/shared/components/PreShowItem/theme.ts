import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width, height } = Dimensions.get('window');

 export default StyleSheet.create({
    itemImage: {
         width: 66, 
         height: 85,
         marginHorizontal: 4,
         marginVertical: 2
    },
    imagesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 130,
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        width: width,
        paddingLeft: 5,
        paddingRight: 5,
        position: 'relative'
    },
    buttonPlus: {
        position: 'absolute',
        zIndex: 9999,
        top:   ((height * 0.17) / 12),
        right: 10,
        width: 22,
        height: 22,
        backgroundColor: '#fff',
        borderRadius: 22 / 2,
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,
        borderLeftColor: '#dcdcdc',
        borderLeftWidth: 1,
        borderRightColor: '#dcdcdc',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    scrolledItemWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 74,
        height: 85
    },
    collectionItem: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderTopWidth: 1,
        borderLeftColor: 'transparent',
        borderLeftWidth: 1,
        borderRightColor: 'transparent',
        borderRightWidth: 1,
        height: 91,
        width: 74,
        flexDirection: 'row',
        alignItems: 'center'
    },
    collectionItemWithBorder: {
        borderBottomColor: '#d7d7d7',
        borderTopColor: '#d7d7d7',
        borderLeftColor: '#d7d7d7',
        borderRightColor: '#d7d7d7',
     }
  });