import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { AuthorItem, } from '../../shared';
import theme from '../theme';
const { width} = Dimensions.get('window');
const defaultNewsImage = require('../../../../assets/images/newsfeed/newsfeed.jpg');

type Props = {
    item: Post;
    goToCollection: (params: any) => void;
    goToBrowseDirectly: (productIds: any) => void;
    goToZoomDirectly: (productId: number) => void;
};

export default class NewsfeedItem extends Component<Props> {

    render() {
        const { timeAgo, authorProfilePhoto, authorName, inspirationalImage, title, postType } = this.props.item;
        return (
            <View style={theme.container}>
                <View style={theme.titleView}>
                    <View style={theme.lineView}></View>
                    <Text style={theme.titleText}>{(title === undefined || title.length === 0) ? 'No Title' : title}</Text>
                    <View style={theme.lineView}></View>
                </View>
                <View style={theme.itemImageContainer}>
                    <Ripple
                        onPress={this._navigateToCollection}
                        rippleColor={'rgb(255, 255, 255)'}
                        rippleDuration={300}
                        rippleCentered={true}
                        rippleContainerBorderRadius={width}>
                        {
                            inspirationalImage.length === 0 &&
                            <Image
                                source={defaultNewsImage}
                                style={theme.itemImage}
                            />
                        }
                        {
                            inspirationalImage.length > 0 &&
                            <Image
                                source={{uri: inspirationalImage + ' '}}
                                style={theme.itemImage}
                            />
                        }
                    </Ripple>
                </View>
                <AuthorItem
                    postType={postType}
                    author={authorName}
                    time={timeAgo}
                    imgAuthorUrl={{uri: authorProfilePhoto}}
                    authorContainer={theme.authorContainer}
                />
            </View>
        )
    }

    _navigateToCollection = () => {
        const { 
            goToBrowseDirectly, 
            goToCollection, 
            goToZoomDirectly,
            item: {timeAgo, authorProfilePhoto, authorName, slots, postType, productIds, productId } 
        } = this.props;
        console.log('postType: ', postType)
        if(postType === 'list') {
            goToBrowseDirectly(productIds)
            return;
        } else if(postType === 'product') {
            goToZoomDirectly(productId)
            return;
        }
        goToCollection(
        {
            productIds: slots,
            authorItem: {
                timeAgo,
                authorProfilePhoto,
                authorName
            }
        });
    }
 }
