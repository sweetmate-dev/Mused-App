import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    BackHandler,
    // TouchableOpacity,
} from 'react-native';
// import AutoHeightImage from 'react-native-auto-height-image';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
// import { Button } from '../../shared';
import theme from "../theme";
// import { COLLECTION, BROWSE, NEWSFEED, VIEW } from '../../shared/routesKeys';
import { zoomFaceImage, zoomLargeImage } from '../../shared';

const arrowIcon = require('../../../../assets/images/arrow-icon.png');
const startIcon = require('../../../../assets/images/star_grey.png');
// const dottedLine = require('../../../../assets/images/dotted_line.png');
const buttonLogo = require('../../../../assets/images/button-logo.png');

// const ZOOM1 = require('../../../../assets/images/zoom_1.jpg');
// const ZOOM2 = require('../../../../assets/images/zoom_2.jpg');


type Props = {
    navigation: any;
    prevRoute: string;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
    createNewStyle: (id: ProductImage) => void;
    goBack: () => void;
}
export default class Zoom extends Component<Props> {
    product: Product;

    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }
    render() {
        const { id, description, priceLabel, brand, unbrandedName } = this.product;
        return (
            <ScrollView>
                <Swiper 
                    style={theme.wrapper} 
                    dotStyle={{width: 6, height: 6}}
                    activeDotStyle={{width: 6, height: 6}}
                    dotColor='gray'
                    paginationStyle={{marginBottom: -15}}
                    activeDotColor='black'>
                    <View style={theme.wrapper}>
                        <Image source={{uri: `${zoomFaceImage}${id}.jpg`}} style={theme.firstImage} />                        
                    </View>
                    <View style={[theme.wrapper, {justifyContent: 'center'}]}>
                        <Image source={{uri: `${zoomLargeImage}${id}.jpg`}} style={theme.secondImage} />
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
                    onPress={this._goBack}>
                    <Image
                        style={{width: 20, height: 20}}
                        source={startIcon}
                    />
                </ Ripple>
                <View style={theme.infoView}>
                    <View style={theme.brandView}>
                        <Text style={theme.brandText}>{brand.toUpperCase()}</Text>
                        <Text style={theme.unbrandText}>{unbrandedName}</Text>
                    </View>
                    <View style={theme.priceView}>
                        <Text style={theme.priceText}>{priceLabel}</Text>
                    </View>
                </View>
                {/* <Image source={dottedLine} style={theme.dottedLine} /> */}
                <View style={theme.buttonsContainer}>
                    <Ripple
                        rippleSize={240} 
                        rippleColor='#FFFFFF'
                        rippleCentered={true} 
                        rippleDuration={1000}
                        onPress={() => this.createNewStyle(this.product)}
                    >
                        <View style={theme.buttonView}>
                            <View style={theme.backButton} />
                            <View style={theme.frontButton}>
                                <Image source={buttonLogo} style={theme.buttonLogo} />
                                <Text style={theme.buttonText}>Style with Mused</Text>
                            </View>
                        </View>
                    </Ripple> 
                    {/* <Button style={theme.rightButton} themeType='light' text='ADD TO CART'/> */}
                </View>

                <View style={theme.descContainer}>
                    <Text style={theme.descTitle}>DESCRIPTION</Text>
                    <Text style={theme.descText}>{description}</Text>
                </View>
            </ScrollView>   
        )
    }

    createNewStyle = (product: Product) => {
        const newProduct: ProductImage = {
            id: product.id,
            img: {uri: product.image}
        }
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
}
