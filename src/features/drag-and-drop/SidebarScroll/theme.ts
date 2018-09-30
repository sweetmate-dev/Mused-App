
import {
    StyleSheet,
    Dimensions
  } from 'react-native';
  const { height} = Dimensions.get('window');
export default StyleSheet.create({
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
        flex: 0.8,
        height: height - 150,
        zIndex: 1,
        backgroundColor:'#ffffff'
    },
    scrolllContainerZero: {
        zIndex: 1,
        backgroundColor:'red'
    },
    scrollCell:{
        alignItems:'center',
        flex:1,

    },
    scrollCellZero:{
        alignItems:'center',
        height: 40

    },
    scrollCellBorder:{
        borderColor: 'transparent',
        borderWidth: 0.5,
        borderTopWidth:0,
        borderBottomWidth:0,
        paddingBottom: 40
    },
    scrollCellText:{
        textAlign:'center',
        fontSize:8.5,
        marginHorizontal:20,
        marginTop:6

    },
    scrollCellDivider:{
        backgroundColor:'black',
        height:1,
        width: 13
    },
    scrollCellExtra:{
        marginTop:15,
        height:25,
    },
    imageLayout:{
        width:80,
        height:80
    },
    scrollCellTextFilter:{
        marginHorizontal:0,
        textAlign:'right'
    },
    imageLayout25:{
        width:25,
        height:25
    },
    categoriesFilterText: {
        fontSize: 11,
        fontFamily: 'RalewayBold'
    },
    categoriesFilterWrapper: {
        paddingBottom: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#303030',
        marginRight: 20
    }
});