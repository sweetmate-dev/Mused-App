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
        marginTop: 5,
        width: width,
        height: width * 900 / 675,
        paddingHorizontal: 5,
    },
    image: {
        width: width - 10,
        height: (width - 10) * 900 / 675,
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
    likeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    infoView: {
        paddingHorizontal: 30,
        paddingTop: 5,
        paddingBottom: 30,
        flexDirection: 'row'
    },
    brandView: {
        flex: 4,
    },
    priceView: {
        flex: 1,
    },
    brandText: {
        fontSize: 18,
        fontFamily: 'RalewayBold',
        color: '#333',
    },
    unbrandText: {
        fontSize: 11,
        fontFamily: 'Lato',
        color: '#000'
    },
    priceText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Lato',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
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
        width: width * 0.55,
        marginRight: 10
    },
    rightButton: {
        flex: 1
    }
});
