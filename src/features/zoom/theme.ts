import {
    Dimensions,
    StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',        
        paddingTop: 5,
        paddingBottom: 50,
        margin: 0
    },
    wrapper: {
        width: width,
        height: width * 900 / 675,
        paddingHorizontal: 10,
        // justifyContent: 'center'
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
    infoView: {
        paddingHorizontal: 30,
        // paddingTop: 5,
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
        fontSize: 18,
        fontFamily: 'RalewayBold',
        color: '#333',
    },
    unbrandText: {
        fontSize: 13,
        fontFamily: 'Lato',
        color: '#000',
        marginTop: 5
    },
    priceText: {
        color: '#000',
        fontSize: 13,
        fontFamily: 'LatoBold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    descContainer: {
        padding: 30
    },
    descTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 14,
        marginBottom: 10
    },
    descText: {
        fontFamily: 'Lato',
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
        fontFamily: 'Lato',
        fontSize: 16,
        lineHeight: 48,
        textAlign: 'center',
        color: 'white',
        paddingLeft: 10
    }
});
