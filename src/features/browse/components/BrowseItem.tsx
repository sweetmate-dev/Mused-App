import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,    
    TouchableHighlight
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import theme from '../theme';

const likeIconUrl = require('../../../../assets/images/star.png');
const notLikeIconUrl = require('../../../../assets/images/star2.png');
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
    
}
type State = {
    isLiked: boolean;
    bookmark: Bookmark | null;
}
export default class BrowseItem extends Component<Props, State> {
    state: State = {
        isLiked: false,
        bookmark: null
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
        const {index, item: { brand, description, image }} =  this.props;
        const borderStyleRight = !(index % 2) ? {
            borderRightWidth: 1,
            borderRightColor: '#f9f9f9',
           } : {};

        const borderStyleTop = (index === 0 || index === 1) ? {
            borderTopWidth: 1,
            borderTopColor: '#f9f9f9',
            } : {};
        return (
            <View style={[theme.productContainer, borderStyleRight, borderStyleTop]}>
                {this._renderLikeIcon()}
                <View style={theme.imageContainer}>
                    <TouchableWithoutFeedback onPress={this._likeIt} style={{height: 120, width: 80, backgroundColor: '#000'}}>
                        <View style={theme.imageWrapper}>
                        <AutoHeightImage
                            source={{uri: image}}
                            style={{marginBottom: 10}}
                            width={105}
                        />
                        
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={theme.imgDivider} />
                <View style={theme.descContainer}>
                <TouchableWithoutFeedback
                    onPress={this._navigateToProductSingle}>
                    <View style={theme.descWrapper}>
                        <Text style={theme.designerTxt}>{brand}</Text>
                        <Text style={theme.descTxt}>{description}</Text>
                    </ View>
                    </TouchableWithoutFeedback>
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
        const {  isSlotMachine, item, setNewImgUrl, hideContextMenu } = this.props;
        if (isSlotMachine) {
            return;
        }
        setNewImgUrl({img: {uri: item.image}, id: item.id});
        hideContextMenu();
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
