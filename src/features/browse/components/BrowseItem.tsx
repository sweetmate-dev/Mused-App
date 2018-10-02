import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,    
    TouchableHighlight
} from 'react-native';
import { thumbnailImage } from '../../shared';
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
        const {item: { brand, unbrandedName, id, priceLabel }} =  this.props;
        return (
            <View style={[theme.productContainer]}>
                {this._renderLikeIcon()}
                <View style={theme.imageContainer}>
                    <TouchableWithoutFeedback onPress={this._likeIt} style={{height: 120, width: 80, backgroundColor: '#000'}}>
                        <View style={theme.imageWrapper}>
                        <Image
                            source={{uri: `${thumbnailImage}${id}`}}
                            style={[theme.image, {marginBottom: 10}]}
                            resizeMode={'contain'}
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
                        <Text style={[theme.descTxt, {height: 27}]}>{unbrandedName}</Text>
                        <Text style={theme.descTxt}>{priceLabel}</Text>
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
        setNewImgUrl({img: {uri: item.image}, id: item.id, category: item.category});
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
