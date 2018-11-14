import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated
} from 'react-native';

import  NewsfeedItem from './NewsfeedItem';
import theme from '../theme';
// import * as API from '../../../services/api';

type State = {
    fadeIn: any,
    numberOfcontent: number
};

type Props = {
    listOfPosts: Post[];
    goToCollection: (params: any) => void;
    getPosts: () => void;
    getBookmarksByUserId: () => void;
    getCollection: (slots: Slot[]) => void;
    goToBrowseDirectly: (productIds: any) => void;
    goToZoomDirectly: (productId: number) => void;
}
export default class NewsfeedList extends Component<Props, State> {

    state: State = {
        fadeIn: new Animated.Value(1),
        numberOfcontent: 1
    }

    componentDidMount() {  
        this.props.getPosts();
        this.props.getBookmarksByUserId();
    }

    onScroll(nativeEvent: any) {
        const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;    
        const ScrollHeight = contentSize.height;
        const contentOffsetY = layoutMeasurement.height + contentOffset.y;
        const scrolledNewsfeedNum = Math.floor(this.props.listOfPosts.length * contentOffsetY / ScrollHeight);
        
        if(scrolledNewsfeedNum === this.state.numberOfcontent) return;
        else {
            // console.log('scroll index: ', scrolledNewsfeedNum)
            // API.RegisterEvent("Nf-ScrollPost", {
            //     actionType: 'Scroll depth',
            //     number_Of_content: scrolledNewsfeedNum
            // })
            // this.setState({numberOfcontent: scrolledNewsfeedNum});
        }
        
    }
    
    render() {
        return (
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {(this.props.listOfPosts && this.props.listOfPosts.length) && <FlatList
                    onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
                    data={this.props.listOfPosts}
                    renderItem={this._renderItem}
                    keyExtractor={ (item) => `${item._id}`}
                    ItemSeparatorComponent={this._renderSeparator}
                    scrollEventThrottle={1000}
                />}
            </Animated.View>
        )
    }

    _renderItem = (props: {item: Post}) => 
        <NewsfeedItem  
            item={props.item}
            goToCollection={this._goToCollection}
            goToBrowseDirectly={this.props.goToBrowseDirectly}
            goToZoomDirectly={this.props.goToZoomDirectly}
        />

    _goToCollection = (param: any) => {
        const { goToCollection, getCollection } = this.props;
        this.state.fadeIn.setValue(1)
        getCollection(param.productIds)
        setTimeout(() => {
            Animated.timing(           
                this.state.fadeIn,            
                {
                  toValue: 0,                   
                  duration: 500, 
                  useNativeDriver: true             
                }
             ).start(() => {            
                goToCollection(param)
                setTimeout(() => {
                    this.state.fadeIn.setValue(1)
                }, 300)            
            });  
        }, 300)
        
    }

    _renderSeparator = () =>
        <View style={theme.separator}></View>
 }