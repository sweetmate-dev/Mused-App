import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { AuthorItem, } from '../../shared';
import theme from '../theme';
const { width} = Dimensions.get('window');

type Props = {
    item: Post;
    goToCollection: (params: any) => void;
};

export default class NewsfeedItem extends Component<Props> {

    render() {
        const { timeAgo, authorProfilePhoto, authorName, inspirationalImage } = this.props.item;
        return (
            <View style={theme.container}>
                    <View style={theme.itemImageContainer}>
                    <Ripple
                        onPress={this._navigateToCollection}
                        rippleColor={'rgb(255, 255, 255)'}
                        rippleDuration={300}
                        rippleCentered={true}
                        rippleContainerBorderRadius={width}>
                        <Image
                            source={{uri: inspirationalImage}}
                            style={theme.itemImage}
                        />
                        </ Ripple>
                    </View>
                    <AuthorItem
                        author={authorName}
                        time={timeAgo}
                        imgAuthorUrl={{uri: authorProfilePhoto}}
                        authorContainer={theme.authorContainer}
                    />
            </View>
        )
    }

    _navigateToCollection = () => {
        const { goToCollection, item: {timeAgo, authorProfilePhoto, authorName, slots} } = this.props;
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
