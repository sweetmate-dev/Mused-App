import React, { Component } from 'react';
import {
  View,
  FlatList,
  Animated
} from 'react-native';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
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
    goToNext: (slotNumber: number, alternatives: number[]) => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    currentRoute: string
}

type State = {
    showFooter: boolean;
    fadeIn: any
}

export default class CollectionList extends Component<Props, State> {

    slots: Slot[];

    state: State = {
        showFooter: false,
        fadeIn: new Animated.Value(1)
    }
    
    componentWillMount() {
        const { navigation } = this.props;
        this.slots = navigation.getParam('productIds', []);
        // getCollection(this.slots);
    }

    render() {
        const {  listOfCollection } = this.props;   
        return (
            <View style={theme.wrapper}>
                <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                    <View style={theme.collectionListContainer}>
                        { listOfCollection &&   <FlatList
                            data={listOfCollection}
                            renderItem={this._renderItem}
                            keyExtractor={ (item) => `${item.id}`}
                            ListHeaderComponent={this._renderHeader}
                            ListEmptyComponent={this._renderEmptyView}
                            ListFooterComponent={this._renderFooter.bind(this)}
                        /> }
                    </View>
                </Animated.View>
            </View>
            
        )
    }

    _renderItem = (props: {item: Product, index: number}) =>
        <CollectionItem  
            item={props.item} 
            countAlter={`${this.slots[props.index].alternatives.length}`}
            index={props.index}
            goToNext={this._goToNext}
            alternatives={this.slots[props.index].alternatives}
            onLoadImage={this._onLoadImage}
        />;

    _renderHeader = () =>
        <CollectionHeader item={testDataHeader} />;

    _renderEmptyView = () =>
        <DotIndicator size={6} count={3} style={{paddingTop: 80}}/>

    _renderFooter = () => {
        const authorItem: Author = this.props.navigation.getParam('authorItem');
        return (
            <CollectionFooter item={authorItem} visible={this.state.showFooter} title={testDataFooter.title} onCollection={true} />
        )
    }

    _goToNext = (slotNumber: number, alternatives: number[]) => {
        const { goToNext } = this.props;
        this.state.fadeIn.setValue(1);
        this.props.getCollection(this.slots);
        Animated.timing(                  
           this.state.fadeIn,            
           {
             toValue: 0,                   
             duration: 500, 
             useNativeDriver: true
           }
        ).start(() => {
            setTimeout(() => {
                goToNext(slotNumber, alternatives);
                setTimeout(() => {
                    this.state.fadeIn.setValue(1)
                }, 300)   
            }, 300)            
        });         
    }

    _onLoadImage = () => {
        this.setState({showFooter: true})
    }
}
