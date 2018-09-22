import {
    Dimensions,
    StyleSheet
} from 'react-native';

const ITEM_CONT_PADDING: number = 4;
const IMAGE_WIDTH: number = 84;

const deviceWidth: number = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
        marginBottom: 170
    },
    filterListContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },

    // item
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        width: 86,
        flex: 0.24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 20,
        paddingLeft: ITEM_CONT_PADDING,
        paddingRight: ITEM_CONT_PADDING
    },
    imageContainer: {
        width: IMAGE_WIDTH,
        display: 'flex',
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: IMAGE_WIDTH,
        height: 100,
    },
    itemName: {
        fontFamily: 'Lato',
        fontSize: 11,
        color: '#000',
        textAlign: 'center',
        lineHeight: 14,
        marginTop: 4,
        marginBottom: 4,
    },

    //
    preShowContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    //
    footerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth,
        backgroundColor: '#000'
    },

    footerComponent: {
        width: deviceWidth,
        height: 20
    },
    tabNavigationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'column',
        height: 300
    },
    categoryWrapper: {
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'column',
        paddingTop: 25
    },
    textTabNavigation: {
        fontSize: 15,
        fontFamily: 'Raleway',
        lineHeight: 15
    },
    textTabHeader: {
        fontSize: 16,
        fontFamily: 'RalewayBold',
        lineHeight: 16 
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        flexDirection: 'row',
        flex: 1,
        height: 60,
        paddingLeft: 25
    },
    designerItemContainer: {
        width: deviceWidth,
        paddingLeft: 30,
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    designerItemText: {
        fontSize: 11,
        color: '#000'
    },
    designerItemSeparator: {
        borderBottomColor: '#efefef',
        borderBottomWidth: 2
    },
    topSearchSeparator: { 
        height: 30, 
        width: deviceWidth,
        backgroundColor: '#f7f7f7'
    },
    buttonTabNavigation: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.23
    },
    textFieldStyle: {
        fontSize: 14,
         color: '#000'
        },
    tabItem: {
        width: deviceWidth - 140,
        minHeight: 50,
        justifyContent: 'center'
    },
    subCategoryText: {
        fontFamily: 'Raleway',
        fontSize: 11,
        paddingLeft: 5,
        paddingTop: 3,
        paddingBottom: 3
    },
    subCategoryItem: {
        marginBottom: 10,
        width: 130
    },
    tabFilterCategories: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between'

    },
    categoryTouchable: {
        height: 50, 
        alignItems: 'center',
        flexDirection: 'row', 
        width: 120
    },
    subCategoriesList: {
        paddingLeft: 14, 
        paddingBottom: 15
    },
    selectionText: {
        paddingRight: 10, 
        fontSize: 11, 
        lineHeight: 11, 
        fontFamily: 'Lato'
    }
});
