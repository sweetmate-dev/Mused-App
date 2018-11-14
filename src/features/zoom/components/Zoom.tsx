import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    BackHandler,
    Animated
    // TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
import theme from "../theme";
import * as API from '../../../services/api';
import { zoomFaceImage, zoomAdditionalImage } from '../../shared';

const arrowIcon = require('../../../../assets/images/arrow-icon.png');
const starIcon = require('../../../../assets/images/star.png');
const starLikeIcon = require('../../../../assets/images/star_like.png');
const buttonLogo = require('../../../../assets/images/button-logo.png');


type Props = {
    navigation: any;
    prevRoute: string;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
    createNewStyle: (id: ProductImage) => void;
    goBack: () => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
}
type State = {
    marginTop: any,
    isLiked: boolean,
};
export default class Zoom extends Component<Props, State> {
    product: Product;

    state: State = {
        marginTop: new Animated.Value(0),
        isLiked: false
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
        console.log('JOHN: ', this.product)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
        const { listOfBookmarks } = this.props;
        const { id } = this.product;
        const bookmark: Bookmark = listOfBookmarks.find(( bookmark: Bookmark) => bookmark.productId === id);
        Boolean(bookmark) && this.setState({isLiked: true })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }

    onScroll(nativeEvent: any) {
        const { contentOffset } = nativeEvent;    
        // const maxScrollHeight = contentSize.height - layoutMeasurement.height;
        // const currentRestHeight = layoutMeasurement.height + contentOffset.y - contentSize.height;
        // console.log(maxScrollHeight + ', ' + currentRestHeight);
        this.state.marginTop.setValue(0 - contentOffset.y * 2 / 3);
    }

    _onChangeSwiperIndex = (index: number) => {
        API.RegisterEvent("Zm-swipe", {
            actionType: 'Swipe photo',
            index
        })
    }

    render() {
        const { id, description, priceLabel, brand, unbrandedName } = this.product;
        return (
            <View style={theme.container}>
                <ScrollView 
                    style={{flex: 1}}
                    onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
                    scrollEventThrottle={100}
                > 
                    <Swiper
                        style={theme.wrapper} 
                        dotStyle={{width: 6, height: 6}}
                        activeDotStyle={{width: 6, height: 6}}
                        dotColor='#CACACA'
                        paginationStyle={{marginBottom: -15}}
                        onIndexChanged={this._onChangeSwiperIndex}
                        activeDotColor='#949494'>
                        <View style={theme.wrapper}>
                            <Image source={{uri: `${zoomFaceImage}${id}.jpg`}} style={theme.firstImage} />                        
                        </View>
                        <View style={[theme.wrapper, {justifyContent: 'center'}]}>
                            <Image source={{uri: `${zoomAdditionalImage}${id}_1.jpg`}} style={theme.secondImage} />
                        </View>
                        <View style={[theme.wrapper, {justifyContent: 'center'}]}>
                            <Image source={{uri: `${zoomAdditionalImage}${id}_2.jpg`}} style={theme.firstImage} />
                        </View>
                        <View style={[theme.wrapper, {justifyContent: 'center'}]}>
                            <Image source={{uri: `${zoomAdditionalImage}${id}_3.jpg`}} style={theme.firstImage} />
                        </View>
                    </Swiper>
                    <Ripple 
                        style={theme.backButtonView}
                        rippleContainerBorderRadius={15 / 2} 
                        rippleSize={20} 
                        rippleCentered={true} 
                        onPress={this._goBack}>
                        <Image
                            style={{width: 13, height: 13, marginLeft: 22}}
                            source={arrowIcon}
                        />
                    </Ripple>
                    <Ripple
                        style={theme.likeButtonView}
                        rippleContainerBorderRadius={15 / 2} 
                        rippleSize={20} 
                        rippleCentered={true} 
                        onPress={this._onClickBookMark}>
                        <Image
                            style={{width: 20, height: 20}}
                            source={this.state.isLiked ? starLikeIcon : starIcon}
                        />
                    </ Ripple>                 
                    <Animated.View style={[theme.infoView, {marginTop: this.state.marginTop}]}>
                        <View style={theme.brandView}>
                            <Text style={theme.brandText}>{brand.toUpperCase()}</Text>
                            <Text style={theme.unbrandText}>{unbrandedName}</Text>
                        </View>
                        <View style={theme.priceView}>
                            <Text style={theme.priceText}>{priceLabel}</Text>
                        </View>
                    </Animated.View>
                    {/* <Image source={dottedLine} style={theme.dottedLine} /> */}              
                    <View style={theme.descContainer}>
                        <Text style={theme.descText}>{description}</Text>
                    </View>
                </ScrollView>
                <View style={theme.markView}></View>
                <Ripple
                    style={theme.buttonsContainer}
                    rippleSize={240} 
                    rippleColor='#FFFFFF'
                    rippleCentered={true} 
                    rippleDuration={1000}
                    onPress={() => this.createNewStyle(this.product)}
                >
                    <Image source={buttonLogo} style={theme.buttonLogo} />
                    <Text style={theme.buttonText}>STYLE IT</Text>   
                </Ripple> 
                {/* <Button style={theme.rightButton} themeType='light' text='ADD TO CART'/> */}
            </View>
        )
    }

    createNewStyle = (product: Product) => {
        const newProduct: ProductImage = {
            id: product.id,
            img: {uri: product.image}
        }
        API.RegisterEvent("Zm-style", {
            actionType: "Click 'Style' button",
            productID: product.id,
        })
        this.props.createNewStyle(newProduct);
    }

    _goBack = () => {
        const { 
            navigation,
            goBack
        } = this.props;
        goBack()
        navigation.goBack();
        return true;
    }

    _onClickBookMark = () => {
        const { createBookmark, deleteBookmarkById } = this.props;
        const { id } = this.product;
        const { isLiked } = this.state;
        API.RegisterEvent("Zm-bookmark", {
            actionType: 'Click bookmark button',
            productID: id
        })
        if (isLiked) {
            deleteBookmarkById(id);
        } else {
            createBookmark(id);
        }
        this.setState({isLiked: !isLiked}); 
    }
}
