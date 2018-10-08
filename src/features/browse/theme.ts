import {
    Dimensions,
    StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_CONT_PADDING: number = 4;
const IMAGE_WIDTH: number = width / 3;
const IMAGE_HEIGHT: number = 150;


export default  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    listTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    videoPlayer: {
        width: width,
    },
    listTitle: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000',
    },
    productListContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 170
    },
    productContainer: {
        overflow: 'hidden',
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: ITEM_CONT_PADDING,
        paddingRight: ITEM_CONT_PADDING,
    },
    separator: {
        // borderStyle: 'dotted',
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
    },
    vSeparator: {
        position: 'absolute',
        right: 0,
        height: 140,
        borderRightWidth: 1,
        borderRightColor: '#525252',
        borderStyle: 'dotted'
    },
    likeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
    },
    likeIcon: {
        width: 17,
        height: 15,
    },
    imageContainer: {
        width: IMAGE_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },
    imgDivider: {
        width: 20,
        height: 1,
        marginBottom: 5,
        flex: 0.01,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#525252',
        borderBottomWidth: 1
    },
    descContainer: {
        alignItems: 'center',
        width: IMAGE_WIDTH * 1.2,
        height: 70,
        paddingBottom: 15,
    },
    designerTxt: {
        fontFamily: 'LatoBold',
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
        lineHeight: 14,
        marginTop: 4,
        marginBottom: 4,
    },
    descTxt: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000',
        textAlign: 'center'
    },

    //
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    //
    footerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 60
    },

    footerComponent: {
        width: width,
        height: 10
    },
    imageWrapper: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: IMAGE_HEIGHT,
        overflow: 'hidden'
    },
    descWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    backgroundVideo: {
        width: width - 40,
    }
});
