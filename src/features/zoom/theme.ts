import {
    Dimensions,
    StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    swiperView: {
        position: 'absolute',
        width: width,
        height: width * 900 / 675,
        paddingHorizontal: 10,
    },
    wrapper: {
        alignItems: 'center',
        width: width,
        height: (width - 20) * 900 / 675,
    },
    firstImage: {
        width: width - 20,
        height: (width - 20) * 900 / 675,
        resizeMode: 'contain'
    },
    secondImage: {
        width: width - 10,
        height: width * 0.85,
        resizeMode: 'contain'
    },
    backButtonView: {
        position: 'absolute',
        top: 10,
        left: 0,
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    likeButtonView: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    likeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    scrollTopView: {
        width: width,
        height: width * 900 / 675,
        backgroundColor: 'transparent'
    },
    infoView: {
        paddingTop: 15,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    brandView: {
        flex: 4,
    },
    priceView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    brandText: {
        fontSize: 16,
        fontFamily: 'RalewayBold',
        color: '#333',
        letterSpacing: 2
    },
    unbrandText: {
        fontSize: 12,
        fontFamily: 'QuickSandRegular',
        color: '#000',
        marginTop: 5,
        lineHeight: 16
    },
    priceText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'QuickSandBold',
    },
    markView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 70,
        height: 20,
        opacity: 0.7,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'black'
    },
    descContainer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 15,
        backgroundColor: 'white',
    },
    descTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 14,
        marginBottom: 10
    },
    descText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 13,
        lineHeight: 22,
    },
    leftButton: {
        flex: 1,        
    },
    rightButton: {
        flex: 1
    },
    dottedLine: {
        height: 30,
        width: width,
        resizeMode: 'contain'
    },
    buttonView: {
        position: 'relative',
        width: width - 30,
        height: 60,
    },
    backButton: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 7,
        bottom: 7
    },
    frontButton: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 3,
        top: 3,
        borderColor: 'white',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogo: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },
    buttonText: {
        fontFamily: 'RalewayBold',
        fontSize: 18,
        color: 'white',
        paddingLeft: 10,
        letterSpacing: 2
    },
    faintText: {
        fontSize: 12,
        opacity: 0.39,
        fontFamily: 'Lato',
        paddingHorizontal: 30,
        paddingTop: 5
    },
    linkIcon: {
        width,
        height: 22, 
        marginVertical: 10,
        resizeMode: 'contain',
    },
    linkView: {
        alignItems: 'center',
        paddingBottom: 60
    }
});
