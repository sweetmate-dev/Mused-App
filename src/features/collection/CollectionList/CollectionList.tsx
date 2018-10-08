import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import  CollectionItem from './CollectionItem.hoc';
import CollectionHeader from './CollectionHeader';
import CollectionFooter from './CollectionFooter';
import theme from '../theme';
 
const testDataHeader = {
    title: 'Product Matches',
    subTitle: 'This is some text inside of a div block.'
}

const testDataFooter = {
    title: 'Collection inspired by',
    author: 'Jennifer Stevens',
    time: '8hrs',
    imgUrl: require('../../../../assets/images/newsfeed/newsfeed-author.jpg')
};


type Props = {
    navigation: any;
    getCollection: (slots: Slot[]) => void;
    listOfCollection: Product[];
    listOfBookmarks: Bookmark[];
    authorItem: Author;
    goToVideo: (slotNumber: number, alternatives: number[]) => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
}

type State = {
    showFooter: boolean;
}

export default class CollectionList extends Component<Props, State> {

    slots: Slot[];

    state: State = {
        showFooter: false
    }
    
    componentDidMount() {
        const { navigation, getCollection } = this.props;
       this.slots = navigation.getParam('productIds', []);
       getCollection(this.slots);
    }

    render() {
        const {  listOfCollection } = this.props;        
        return (
            <View style={theme.container}>
                <View style={theme.collectionListContainer}>
                    { listOfCollection &&   <FlatList
                        data={listOfCollection}
                        renderItem={this._renderItem}
                        keyExtractor={ (item) => `${item.id}`}
                        ListHeaderComponent={this._renderHeader}
                        ListFooterComponent={this._renderFooter.bind(this)}
                    /> }
                </View>
            </View>
        )
    }

    _renderItem = (props: {item: Product, index: number}) =>
        <CollectionItem  
            item={props.item} 
            countAlter={`${this.slots[props.index].alternatives.length}`}
            index={props.index}
            goToVideo={this.props.goToVideo}
            alternatives={this.slots[props.index].alternatives}
            onLoadImage={this._onLoadImage}
        />;

    _renderHeader = () =>
        <CollectionHeader item={testDataHeader} />;

    _renderFooter = () => {
        const authorItem: Author = this.props.navigation.getParam('authorItem');
        return (
            <CollectionFooter item={authorItem} visible={this.state.showFooter} title={testDataFooter.title} onCollection={true} />
        )
    }
    _onLoadImage = () => {
        this.setState({showFooter: true})
    }
 }
