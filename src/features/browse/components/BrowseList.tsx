import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Animated
} from 'react-native';

import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import BrowseItem from './BrowseItem';
import theme from '../theme';

type State = {
    likedItemIndex: null | number;
    fadeIn: any
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
    contextMenuIsVisible: boolean;
};
export default class Browser extends Component<Props, State> {
    state: State = {
        likedItemIndex: null,
        fadeIn: new Animated.Value(0)
    }
    blackTimeOut: any
    componentDidMount() {
        const {getAlternatives, navigation} = this.props;
        const productIds: number[] = navigation.getParam('alternatives', []);
        getAlternatives(productIds);
        this.blackTimeOut = setTimeout(() => {
            this._fadeIn()
        }, 500)        
    }

    componentWillUnmount() {
        clearTimeout(this.blackTimeOut)
    }

    render() {
        const headerComponent = (
            <View style={theme.listTitleContainer}>
                <Text style={theme.listTitle}>{`${this.props.listOfAlternatives.length } items found`.toUpperCase()}</Text>
            </View>);
        const _listOfAlternatives = [...this.props.listOfAlternatives];
        return (
            <View style={[theme.container]}>
                <Animated.View style={[theme.productListContainer, {opacity: this.state.fadeIn}]}>
                    <FlatList
                        data={_listOfAlternatives}
                        ListHeaderComponent={headerComponent}
                        ListFooterComponent={() => <View style={theme.footerComponent} />}
                        ListEmptyComponent={this._renderEmptyView}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                        numColumns={2}
                        scrollEventThrottle={300}
                        onScroll={this.props.hideContextMenu}
                        initialNumToRender={10}
                    />
                </Animated.View>
            </View>
        )
    }

    _renderEmptyView = () =>
        <DotIndicator size={6} count={3} style={{paddingTop: 80}}/>

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
            contextMenuIsVisible={this.props.contextMenuIsVisible}
        />
    _likeItem = (index: number) =>
        this.setState({likedItemIndex: index});

    _fadeIn = () => {
        this.state.fadeIn.setValue(0)
        Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 1200, 
                useNativeDriver: true             
            }
        ).start();                        
    }

}
