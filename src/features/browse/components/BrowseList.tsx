import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
} from 'react-native';

import BrowseItem from './BrowseItem';
import theme from '../theme';

type State = {
    likedItemIndex: null | number;
};
type Props = {
    navigation: any;
    navigateToProductSingle: (product: Product) => void;
    setNewImgUrl: (newImgUrl: HashMap<string>) => void;
    hideContextMenu: () => void;
    isSlotMachine: boolean;
    listOfAlternatives: Product[];
    getAlternatives: (ids: number[]) => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    listOfBookmarks: Bookmark[];
};
export default class Browser extends Component<Props, State> {
    state: State = {
        likedItemIndex: null
    }
    componentDidMount() {
        const {getAlternatives, navigation} = this.props;
        const productIds: number[] = navigation.getParam('alternatives', []);
        getAlternatives(productIds);
    }
    render() {
        const headerComponent = (
            <View style={theme.listTitleContainer}>
                {/* <View style={theme.videoPlayer}>
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                            },
                            isLooping: true,
                            style: {
                                margin: 20
                            }
                        }}                    
                        isPortrait={true}
                        playFromPositionMillis={0}
                    />
                </View>                 */}
                <Text style={theme.listTitle}>{`${this.props.listOfAlternatives.length } items found`.toUpperCase()}</Text>
            </View>);
        const _listOfAlternatives = [...this.props.listOfAlternatives];
        return (
            <View style={theme.container}>
                <View style={theme.productListContainer}>
                    {
                    _listOfAlternatives.length > 0 && 
                    <FlatList
                        data={_listOfAlternatives}
                        ListHeaderComponent={headerComponent}
                        ListFooterComponent={() => <View style={theme.footerComponent} />}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                        numColumns={2}
                        scrollEventThrottle={300}
                    />}
                </View>
            </View>
        )
    }

    _renderItem = (props: {item: Product, index: number}) =>
        <BrowseItem item={props.item} index={props.index}
            likedItemIndex={this.state.likedItemIndex}
            likeItem={this._likeItem}
            navigateToProductSingle={this.props.navigateToProductSingle}
            setNewImgUrl={this.props.setNewImgUrl}
            hideContextMenu={this.props.hideContextMenu}
            isSlotMachine={this.props.isSlotMachine}
            createBookmark={this.props.createBookmark}
            listOfBookmarks={this.props.listOfBookmarks}
            deleteBookmarkById={this.props.deleteBookmarkById}
        />
    _likeItem = (index: number) =>
        this.setState({likedItemIndex: index});

}
