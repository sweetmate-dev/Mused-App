import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';

import  NewsfeedItem from './NewsfeedItem';
import theme from '../theme';

type Props = {
    listOfPosts: Post[];
    goToCollection: (params: any) => void;
    getPosts: () => void;
    getBookmarksByUserId: () => void;
}
export default class NewsfeedList extends Component<Props> {
    componentDidMount() {  
        this.props.getPosts();
        this.props.getBookmarksByUserId();
        }
    render() {

        return (
            <View style={theme.container}>
                {(this.props.listOfPosts && this.props.listOfPosts.length) && <FlatList
                    data={this.props.listOfPosts}
                    renderItem={this._renderItem}
                    keyExtractor={ (item) => `${item.postId}`}
                    ItemSeparatorComponent={this._renderSeparator}
                />}
            </View>
        )
    }

    _renderItem = (props: {item: Post}) => 
        <NewsfeedItem  
            item={props.item}
            goToCollection={this.props.goToCollection}
            />

    _renderSeparator = () =>
        <View style={theme.separator}></View>
 }