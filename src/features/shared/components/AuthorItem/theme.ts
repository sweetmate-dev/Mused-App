import {
    StyleSheet,
  } from 'react-native';
 const styles = StyleSheet.create({
    authorImage: {
         width: 30, 
         height: 30
        },
    authorTextContainer: {
        alignItems: 'flex-start',
         justifyContent: 'space-between',
          flexDirection: 'column',
          marginLeft: 7
        },
    authorText: {
        fontFamily: 'Lato',
        fontSize: 11,
        lineHeight: 15
    },
    authorWrapper: {
        flex: 1,
        flexDirection: 'row', 
        width: 330,
        paddingTop: 15,
        paddingBottom: 15
    }
  });

  export default styles;