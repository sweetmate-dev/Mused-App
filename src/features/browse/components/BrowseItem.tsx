import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { thumbnailImage } from '../../shared';
import theme from '../theme';

const likeIconUrl = require('../../../../assets/images/star_like.png');
const notLikeIconUrl = require('../../../../assets/images/star.png');
type Props = {
    index: number;
    likedItemIndex: number;
    likeItem: (index: number) => void;
    item: Product;
    navigateToProductSingle: (product: Product) => void;
    setNewImgUrl: (newImgUrl: any) => void;
    hideContextMenu: () => void;
    isSlotMachine: boolean;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
    contextMenuIsVisible: boolean
}
type State = {
    isLiked: boolean;
    bookmark: Bookmark | null;    
}
export default class BrowseItem extends Component<Props, State> {
    state: State = {
        isLiked: false,
        bookmark: null,
    };


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
        const {item: { brand, unbrandedName, id, /*priceLabel*/ }, index} =  this.props;
        let borderStyle = {};
        if(index % 2 === 0) {
            borderStyle = {
                borderRightWidth: 1.5,
                borderBottomWidth: 2,
                borderColor: '#f9f9f9'
            }
        } else {
            borderStyle = {
                borderBottomWidth: 2,
                borderColor: '#f9f9f9'
            }
        }
        return (
            <View style={[theme.productContainer, borderStyle]}>
                {this._renderLikeIcon()}
                <View style={theme.imageContainer}>
                    <Ripple
                        onPress={this._likeIt} style={theme.image}
                        rippleSize={120}
                        rippleDuration={300} 
                        rippleCentered={true}
                        rippleContainerBorderRadius={40}>
                        <View style={theme.imageWrapper}>
                            <Image
                                source={{uri: `${thumbnailImage}${id}`}}
                                style={theme.image}
                                resizeMode={'contain'}
                            />                        
                        </View>
                    </Ripple>
                </View>
                {/* <View style={theme.imgDivider} /> */}
                <View style={theme.descContainer}>
                    <Ripple
                        onPress={this._navigateToProductSingle}
                        rippleSize={40}
                        rippleDuration={300} 
                        rippleContainerBorderRadius={40}>
                        <View style={theme.descWrapper}>
                            <Text style={theme.designerTxt}>{brand.toUpperCase()}</Text>
                            <Text style={[theme.descTxt, {paddingVertical: 3}]}>{unbrandedName}</Text>
                            {/* <Text style={theme.descTxt}>{priceLabel}</Text> */}
                        </ View>
                    </Ripple>
                </View>

            </View>
        )
    };

    _renderLikeIcon = () => {
        const { isLiked } = this.state;
        return (
            <TouchableHighlight 
                style={theme.likeContainer}
                underlayColor={'transparent'}
                onPress={this._createBookmark}
                >
                <Image
                    source={isLiked ? likeIconUrl : notLikeIconUrl}
                    style={theme.likeIcon}
                />
            </TouchableHighlight>
        )
    }  

    _navigateToProductSingle = () => {
        const { navigateToProductSingle, item } = this.props;
        navigateToProductSingle(item);
    }

    _likeIt = () => {
        const {  isSlotMachine, item, setNewImgUrl, hideContextMenu, contextMenuIsVisible } = this.props;
        if (isSlotMachine) {
            return;
        }
        if(contextMenuIsVisible) {
            hideContextMenu();
        } else {
            setNewImgUrl({img: {uri: item.image}, id: item.id, category: item.category});
        }
    };

    _createBookmark = () => {
        const { createBookmark, deleteBookmarkById, item: { id } } = this.props;
        const { isLiked, bookmark } = this.state;
        
        if ( isLiked) {
            deleteBookmarkById(bookmark._id);
            this.setState({isLiked: false, bookmark: null});
            return;
        }
        createBookmark(id);
    }    
}
