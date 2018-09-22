import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import { Header } from '../../shared';
import { Button } from '../../shared';
import theme from "../theme";

const brandDesc = 'ASOS 4505 Training Vest Top Strings';
const likeIconUrl = require('../../../../assets/images/heart-icon.jpg');

type Props = {
    navigation: any; 
}
export default class Zoom extends Component<Props> {
    product: Product;

    static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} showContent={false} />
        }
    };

    componentWillMount() {
        const { navigation } = this.props;
        this.product = navigation.getParam('product', {});
        
    }
    render() {
        const { description, image, priceLabel, brand } = this.product;
        return (
            <ScrollView contentContainerStyle={theme.container}>
                <View style={theme.firstItem}>

                <View style={theme.productContainer}>
                    <AutoHeightImage
                        source={{uri: image}}
                        style={{marginTop: 10}}
                        width={224}
                    />
                    <View style={theme.likeContainer}>
                        <Image
                            source={likeIconUrl}
                            style={theme.likeIcon}
                        />
                    </View>
                </View>

                <View style={theme.brandContainer}>
                    <View style={theme.brandLeftColumn}>
                        <Text style={theme.brand}>{brand}</Text>
                        <Text style={theme.brandDesc}>{brandDesc}</Text>
                    </View>
                    <View style={theme.brandRightColumn}>
                        <Text style={theme.price}>{priceLabel}</Text>
                        <Text style={theme.priceDesc}>at Net-a-Porter</Text>
                    </View>
                </View>

                <View style={theme.buttonsContainer}>
                    <Button style={{marginRight: 10}} themeType='light' text='Visit Retailer'/>
                    <Button style={{marginLeft: 10}} themeType='dark' text='Style This'/>
                </View>

                </View>

                <View style={theme.descContainer}>
                    <Text style={theme.descTitle}>DESCRIPTION</Text>
                    <Text style={theme.descText}>{description}</Text>
                </View>

            </ScrollView>
        )
    }
}
