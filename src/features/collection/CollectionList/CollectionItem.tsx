import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import AutoHeightImage from 'react-native-auto-height-image';
import { thumbnailImage } from '../../shared';
import theme from '../theme';

const likeIconUrl = require('../../../../assets/images/star.png');
const notLikeIconUrl = require('../../../../assets/images/star2.png');

type Props = {
    item: Product;
    countAlter: string;
    goToBrowse: (slotNumber: number, alternatives: number[]) => void;
    alternatives: number[];
    index: number;
    listOfBookmarks: Bookmark[];
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
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
        const { countAlter } = this.props;
        const { brand, unbrandedName, id } = this.props.item;
        const { isLiked } = this.state;
        return (
            <View style={theme.containerItem}>
                <View style={theme.alterContainer}>

                    <Ripple
                        onPress={this._goToBrowse}
                        rippleSize={40}
                        rippleDuration={300} 
                        rippleContainerBorderRadius={40}>
                        <View style={theme.alterItem}>
                            <Text style={theme.countText}>{countAlter}</Text>
                        </View>
                    </Ripple>
                    <Text style={[theme.countText, {marginTop: 3, marginLeft: 12}]}>alternatives</Text>
                </View>

                <View style={theme.imageContainer}>
                    <View style={theme.clickableImageContainer}>
                        <AutoHeightImage
                                source={{uri: `${thumbnailImage}${id}`}}
                                width={160}
                            />
                        <Text style={theme.clickableTitle}>{brand.toUpperCase()}</Text>
                        <Text style={theme.clickableSubTitle}>{unbrandedName}</Text>
                    </View>
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
        const { goToBrowse, item, alternatives } = this.props;
        goToBrowse(item.id, alternatives);
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
