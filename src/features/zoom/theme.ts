import {
    Dimensions,
    StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',        
        padding: 0,
        paddingBottom: 50,
    },
    wrapper: {
        width: width,
        height: width * 1.2,
    },
    image: {
        width: width,
        height: width * 1.2,
        resizeMode: 'contain'
    },
    headerView: {
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        height: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    likeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    infoView: {
        padding: 30,
        flexDirection: 'row'
    },
    brandView: {
        flex: 4,
    },
    priceView: {
        flex: 1,
    },
    brandText: {
        color: 'gray',
        fontSize: 20,
    },
    unbrandText: {
        color: 'darkgray',
        fontSize: 16
    },
    priceText: {
        color: 'darkgray',
        fontSize: 20
    },
    buttonsContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
});
