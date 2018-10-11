import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
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
}
export default class CollectionItem extends Component<Props, State> {
    state: State = {
        isLiked: false,
        bookmark: null
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
                        style={theme.alterContainer}
                        onPress={this._goToBrowse}
                        rippleSize={60}
                        rippleDuration={300} 
                        rippleCenter={true}
                        rippleContainerBorderRadius={40}>
                        <View style={theme.alterItem}>
                            <Text style={theme.countText}>{countAlter}</Text>
                        </View>
                        <Text style={[theme.countText, {marginTop: 3, marginLeft: 12}]}>alternatives</Text>
                    </Ripple>
                    
                <View style={theme.imageContainer}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigateToProductSingle(item)}
                        style={theme.clickableImageContainer}>
                        <Image
                            source={{uri: `${thumbnailImage}${id}`}}
                            resizeMode={'contain'}
                            style={theme.itemImage}
                            onLoadEnd={this.props.onLoadImage}
                        />
                        <Text style={theme.clickableTitle}>{brand.toUpperCase()}</Text>
                        <Text style={theme.clickableSubTitle}>{unbrandedName}</Text>
                    </TouchableOpacity>
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
        setTimeout(() => {
            goToVideo(item.id, alternatives);
        }, 250)        
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
