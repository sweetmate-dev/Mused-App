import {
    Dimensions,
    StyleSheet,
    StyleProp
  } from 'react-native';

 const { width } = Dimensions.get('window');

 const styles: StyleProp<any> = StyleSheet.create({
    footerCheckImage: {
         width: 16, 
         height: 14,
         marginBottom: 5
    },
    footerViewImage: {
        width: 16, 
        height: 23,
        marginBottom: -4
   },
    footerCheckText: {
        fontSize: 11,
        fontFamily: 'Lato'
    },
    footerButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 54,
        width: width / 5,
        backgroundColor: '#fff',
    },
    footerButtonConfirmContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        width: width,
        height: 54,
        backgroundColor: '#fff',
    }
  });

  export default styles;