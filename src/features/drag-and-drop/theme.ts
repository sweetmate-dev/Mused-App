
import {
    StyleSheet,
    Dimensions
  } from 'react-native';

const { height} = Dimensions.get('window');

export default  StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow:'hidden',
        zIndex:-1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    dragContainer: {
        //backgroundColor: 'green',
        flex: 1.8,
        height: height - 200,

    },
    scrolllContainer: {
        flex: 1,
        height: height - 200,
        zIndex: 1,
    },
    scrollCell:{
        alignItems:'center',
        flex:1,

    },
    scrollCellBorder:{
        borderColor: '#c5c6c9',
        borderWidth: 0.5,
    },
    scrollCellText:{
        fontWeight:'bold',
        textAlign:'center',
    },
    scrollCellDivider:{
        backgroundColor:'black',
        height:2,
        width: 80
    },
    topLineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 30
    },
    topLineLeft: {
        flex: 0.7, 
        flexDirection: 'column',
        alignItems: 'center'
    },
    topLineLeftBoldTitle: {
        fontSize: 18,
        color: '#333', 
        fontFamily: 'RalewayBold'
    },
    topLineLeftText: {
        fontSize: 11,
        color: '#000',
        fontFamily: 'Lato'
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});