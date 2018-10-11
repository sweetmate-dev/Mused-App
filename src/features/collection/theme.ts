import {
    Dimensions,
    StyleSheet
  } from 'react-native';

 const { width, height } = Dimensions.get('window');

 export default StyleSheet.create({
    wrapper: {
        flex: 1, 
        backgroundColor: '#ffffff',
    },
    container: { 
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        width: width,
        height: height
    },
    collectionListContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 170
    },
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    footerButtonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginTop: 10
    },
    containerHeader: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    containerFooter: {
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 50
    },
    containerFooterWithBorder: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        width: width - 100,
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center'
    },
    underlineTitle: { 
        backgroundColor: '#303030', 
        width: 45, 
        height: 1,
        marginTop: 10,
        marginBottom: 9
    },
    itemImage: {
        width: width / 3, 
        height: 180,
    },
    alterContainer: {
        flex: 0.2
    },
    imageContainer: {
        flex: 0.6,
    },
    likeContainer: {
        flex: 0.2
    },
    likeImage: {
        width: 17,
        height: 15,
        marginTop: 2
    },
    alterItem: {
        borderLeftWidth: 1,
        borderLeftColor: '#000',
        borderRightWidth: 1,
        borderRightColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderTopWidth: 1,
        borderTopColor: '#000',
        width: 30,
        height: 20,
        marginLeft: 28,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    countText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#000',
        // marginTop: 4
    },
    clickableImageContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingVertical: 20,
        overflow: 'hidden'
    },
    clickableTitle: {
        fontFamily: 'LatoBold',
        fontSize: 11,
        color: '#000',
        marginTop: 10,
        marginBottom: 2
    },
    clickableSubTitle: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000'
    },
    likeImageContainer: {
        flex: 0.2, 
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 25
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'RalewayBold',
        color: '#333',
        marginBottom: 2
    },
    headerSubTitle: {
        fontSize: 11,
        fontFamily: 'Lato',
        color: '#000'
    },
    footerTitle: {
        fontSize: 14,
        fontFamily: 'RalewayBold',
        color: '#000',
        marginTop: 35,
        marginBottom: 5
    },
        authorContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    }
  });