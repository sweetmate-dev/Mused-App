import {
    Dimensions,
    StyleSheet,
    StyleProp
  } from 'react-native';

 const { width} = Dimensions.get('window');

 const styles: StyleProp<any> = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#fff'
    },
    containerTitle: { 
        flex: 0.2, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'RalewayBold', 
        fontSize: 18,
        marginTop: 34
    },
    underlineTitle: { 
        backgroundColor: '#303030', 
        width: 25, 
        height: 1,
        marginTop: 5,
        marginBottom: 9
    },
    authorContainer: { 
        flex: 0.2, 
        alignItems: 'center', 
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    authorImage: {
         width: 36, 
         height: 36
        },
    authorTextContainer: {
        alignItems: 'flex-start',
         justifyContent: 'space-between',
          flexDirection: 'column',
          marginLeft: 7
        },
    itemImageContainer: { 
        paddingHorizontal: 15,
    },
    itemImage: {
        borderWidth: 1,
        borderColor: 'black'
    },
    authorText: {
        fontFamily: 'Lato',
        fontSize: 11,
        lineHeight: 15,
        fontStyle: 'italic'
    },
    separator: { 
        width: width, 
        height: 30, 
        backgroundColor: '#fafafa',
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    lineView: {
        height: 1,
        width: width / 8,
        backgroundColor: 'black',
    },
    titleText: {
        flex: 1,
        paddingHorizontal: 15,
        textAlign: 'center',
        fontFamily: 'Raleway',
        letterSpacing: 2,
        lineHeight: 20,
        fontSize: 14,
    }
  });

  export default styles;