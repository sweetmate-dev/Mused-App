import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { thumbnailImage } from '../../shared';
import theme from '../theme';

const likeIconUrl = require('../../../../assets/images/star.png');
const notLikeIconUrl = require('../../../../assets/images/star2.png');

type Props = {
    item: Product;
    countAlter: string;
    goToVideo: (slotNumber: number, alternatives: number[]) => void;
    onLoadImage: () => void;
    alternatives: number[];
    index: number;
    listOfBookmarks: Bookmark[];
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    navigateToProductSingle: (product: Product) => void;
}

type State = {
    isLiked: boolean;
    bookmark: Bookmark | null;
    fadeIn: any
}
export default class CollectionItem extends Component<Props, State> {
    state: State = {
        isLiked: false,
        bookmark: null,
        fadeIn: new Animated.Value(1)
    }
    componentDidMount() {
        const { listOfBookmarks } = this.props;
        const {  id } = this.props.item;
        const bookmark: Bookmark = listOfBookmarks.find(( bookmark: Bookmark) => bookmark.productId === id);
        Boolean(bookmark) && this.setState({isLiked: true, bookmark })
    }
    componentWillReceiveProps(newProps: Props) {
        const { listOfBookmarks } = this.props;
        const {  id } = this.props.item;
        if (newProps.listOfBookmarks.length !== listOfBookmarks.length ) {
            const bookmark: Bookmark = newProps.listOfBookmarks.find(( bookmark: Bookmark) => bookmark.productId === id);
            Boolean(bookmark) && this.setState({isLiked: true, bookmark })
        }  
    }
    render() {
        const { countAlter, item } = this.props;
        const { brand, unbrandedName, id } = this.props.item;
        const { isLiked } = this.state;
        return (
            <View style={theme.containerItem}>

                <Ripple 
                    onPress={this._goToBrowse} 
                    style={theme.alterContainer}
                    rippleSize={80}
                    rippleDuration={300} 
                    rippleContainerBorderRadius={40}>
                    <View style={{alignItems: 'center'}}>
                        <View style={theme.alterItem}>
                            <Text style={theme.countText}>{countAlter}</Text>
                        </View>
                        <Text style={[theme.countText, {marginTop: 3}]}>alternatives</Text>
                    </View>                        
                </Ripple>                    
                    
                <View style={theme.imageContainer}>
                    <Ripple 
                        onPress={() => this.props.navigateToProductSingle(item)}
                        style={[theme.clickableImageContainer, {opacity: this.state.fadeIn}]}
                        rippleSize={150}
                        rippleDuration={300} 
                        rippleCentered={true}
                        rippleContainerBorderRadius={40}>
                        <Image
                            source={{uri: `${thumbnailImage}${id}`}}
                            resizeMode={'contain'}
                            style={theme.itemImage}
                            onLoadEnd={this.props.onLoadImage}
                        />
                        <Text style={theme.clickableTitle}>{brand.toUpperCase()}</Text>
                        <Text style={theme.clickableSubTitle}>{unbrandedName}</Text>
                    </Ripple>
                </View>

                <View style={theme.likeContainer}>
                    <TouchableHighlight 
                        style={theme.likeImageContainer} 
                        underlayColor={'transparent'} 
                        onPress={this._createBookmark}>
                        <Image
                            source={isLiked ? likeIconUrl : notLikeIconUrl}
                            style={theme.likeImage}
                            /> 
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    _goToBrowse = () => {
        const { goToVideo, item, alternatives } = this.props;
        // Animated.sequence(
        //     [ Animated.timing(                 
        //     this.state.fadeIn,
        //     {
        //       toValue: 0.3,
        //       duration: 250,
        //       easing: Easing.cubic
        //     }
        //   ),
        //   Animated.timing(                  
        //     this.state.fadeIn,            
        //     {
        //       toValue: 1,                   
        //       duration: 250,
        //       easing: Easing.cubic           
        //     }
        //   ),
        // ]).start(() => {
        //     goToVideo(item.id, alternatives);
        // });      
        goToVideo(item.id, alternatives);
    }    

    _createBookmark = () => {
        const { createBookmark, deleteBookmarkById, item: { id } } = this.props;
        const { isLiked, bookmark } = this.state;
        if ( isLiked && bookmark) {
            deleteBookmarkById(bookmark._id);
            this.setState({isLiked: false, bookmark: null});
            return;
        }
        createBookmark(id);
    }
 }
