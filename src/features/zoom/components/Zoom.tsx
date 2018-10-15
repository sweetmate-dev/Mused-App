import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    Text
} from 'react-native';
// import AutoHeightImage from 'react-native-auto-height-image';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
// import { Header } from '../../shared';
import { Button } from '../../shared';
import theme from "../theme";
import { COLLECTION, BROWSE, NEWSFEED, VIEW } from '../../shared/routesKeys';


const arrowIcon = require('../../../../assets/images/arrow-icon.png');
const startIcon = require('../../../../assets/images/star.png');
// const startLikeIcon = require('../../../../assets/images/star.png');
const ZOOM1 = require('../../../../assets/images/zoom_1.jpg');
const ZOOM2 = require('../../../../assets/images/zoom_2.jpg');


type Props = {
    navigation: any;
    prevRoute: string;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
}
export default class Zoom extends Component<Props> {
    product: Product;

    static navigationOptions: ([string]: any) => HashMap<Object> = ({}) => {
        return {
            header: null
        }
    };

    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
    }
    render() {
        const { /*id*/description, priceLabel, brand, unbrandedName } = this.product;
        return (
            <ScrollView contentContainerStyle={theme.container}>
                <Swiper style={theme.wrapper} paginationStyle={{ paddingBottom: 40 }}>
                    <View style={theme.wrapper}>
                        <Image source={ZOOM1} style={theme.image} />
                    </View>
                    <View style={theme.wrapper}>
                        <Image source={ZOOM2} style={theme.image} />
                    </View>
                </Swiper>
                <View style={theme.headerView}>
                    <Ripple 
                        rippleContainerBorderRadius={15 / 2} 
                        rippleSize={20} 
                        rippleCentered={true} 
                        onPress={this._goBack}>
                        <Image
                            style={{width: 20, height: 20}}
                            source={arrowIcon} />
                    </ Ripple>
                    <Image
                        source={startIcon}
                        style={theme.likeIcon}
                    />
                </View>
                <View style={theme.infoView}>
                    <View style={theme.brandView}>
                        <Text style={theme.brandText}>{brand}</Text>
                        <Text style={theme.unbrandText}>{unbrandedName}</Text>
                    </View>
                    <View style={theme.priceView}>
                        <Text style={theme.priceText}>{priceLabel}</Text>
                    </View>
                </View>

                <View style={theme.buttonsContainer}>
                    <Button style={{marginRight: 10, width: 180}} themeType='dark' text='-  MATCH IT  -' />
                    <Button style={{marginLeft: 10}} themeType='light' text='ADD TO CART'/>
                </View>

                <View style={theme.descContainer}>
                    <Text style={theme.descTitle}>DESCRIPTION</Text>
                    <Text style={theme.descText}>{description}</Text>
                </View>

            </ScrollView>
        )
    }

    _goBack = () => {
        const { 
            setPrevCurrentRoutes, 
            prevRoute,
            navigation
        } = this.props;

        if(prevRoute === BROWSE) setPrevCurrentRoutes(BROWSE, COLLECTION)
        else if(prevRoute === VIEW) setPrevCurrentRoutes(VIEW, BROWSE)
        else if(prevRoute === COLLECTION) setPrevCurrentRoutes(COLLECTION, NEWSFEED)
        navigation.goBack();
        return true;
    }
}
