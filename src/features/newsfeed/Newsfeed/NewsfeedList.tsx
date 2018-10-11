import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated
} from 'react-native';

import  NewsfeedItem from './NewsfeedItem';
import theme from '../theme';

type State = {
    fadeIn: any
};

type Props = {
    listOfPosts: Post[];
    goToCollection: (params: any) => void;
    getPosts: () => void;
    getBookmarksByUserId: () => void;
    getCollection: (slots: Slot[]) => void;
}
export default class NewsfeedList extends Component<Props, State> {

    state: State = {
        fadeIn: new Animated.Value(1)
    }

    componentDidMount() {  
        this.props.getPosts();
        this.props.getBookmarksByUserId();
    }
    render() {

        return (
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {(this.props.listOfPosts && this.props.listOfPosts.length) && <FlatList
                    data={this.props.listOfPosts}
                    renderItem={this._renderItem}
                    keyExtractor={ (item) => `${item._id}`}
                    ItemSeparatorComponent={this._renderSeparator}
                />}
            </Animated.View>
        )
    }

    _renderItem = (props: {item: Post}) => 
        <NewsfeedItem  
            item={props.item}
            goToCollection={this._goToCollection}
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