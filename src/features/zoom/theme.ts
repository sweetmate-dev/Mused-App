import {
    Dimensions,
    StyleSheet
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        backgroundColor: '#fff',
        paddingBottom: 50
    },
    productContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
        flex: 0.6,
        width: width,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    productImage: {
        height: 300,
        width: 224,
        marginTop: 10,
    },
    brandContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        paddingRight: 20,
        paddingLeft: 30,
        flex: 0.15,
        paddingTop: 40
    },
    brand: {
        fontFamily: 'RalewayBold',
        fontSize: 16,
    },
    brandDesc: {
        fontFamily: 'Lato',
        fontSize: 11,
        marginTop: 5,
        marginBottom: 5,
        lineHeight: 20
    },
    price: {
        fontFamily: 'Lato',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center'
    },
    priceDesc: {
        fontFamily: 'Lato',
        fontSize: 10,
        lineHeight: 20,
        textAlign: 'center'
    },
    buttonsContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descContainer: {
        width: width - 60,
        flex: 0.2,
        marginBottom: 50
    },
    descTitle: {
        fontFamily: 'RalewayBold',
        fontSize: 14,
    },
    descText: {
        fontFamily: 'Lato',
        fontSize: 13,
        marginTop: 5,
        lineHeight: 22,
    },
    brandLeftColumn: {
        flex: 0.7
    },
    brandRightColumn: {
        flex: 0.3
    },
    likeContainer: {
        position: 'absolute',
        top: 0,
        right: 40,
        width: 20,
        height: 20
    },
    likeIcon: {
        width: 20,
        height: 18,
    },
    firstItem: {
        height: height - 90,
        flex: 1,
        flexDirection: 'column'
    }
});
