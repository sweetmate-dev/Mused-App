import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Permissions, Notifications } from 'expo';

import  NewsfeedItem from './NewsfeedItem';
import theme from '../theme';
import RetailerPosts from './RetailerPost';
import NewProductList from './NewProductList';

const DAY_TIME = 24 * 3600 * 1000;

type State = {
    fadeIn: any,
    numberOfcontent: number,
    token: string,
    notification: any,
    slots: any[],
    instagram_inspirationalImage: string
};

type Props = {
    listOfPosts: Post[];
    listOfRetailerPosts: RetailerPost[];
    listOfAlternatives: Product[];
    listOfRecentNewProducts: Product[];
    instagramInspirationalImage: string;
    goToCollection: (params: any) => void;
    getPosts: () => void;
    getBookmarksByUserId: () => void;
    getCollection: (slots: Slot[]) => void;
    goToBrowseDirectly: (productIds: any) => void;
    goToZoomDirectly: (productId: number) => void;
    goToInstagramSlide: () => void;
    onClickRetailerPost: (post: RetailerPost) => void;
    onClickNewProduct: (product: Product) => void;
    onViewAllNewProduct: () => void;
}
export default class NewsfeedList extends Component<Props, State> {

    state: State = {
        fadeIn: new Animated.Value(1),
        numberOfcontent: 1,
        token: null,
        notification: null,
        slots: [],
        instagram_inspirationalImage: ''
    }

    componentDidMount() {  
        this.props.getPosts();
        this.props.getBookmarksByUserId();        
    }    

    async registerForPushNotifications() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    
        if (status !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          if (status !== 'granted') {
            return;
          }
        }
    
        const token = await Notifications.getExpoPushTokenAsync();
    
        Notifications.addListener(this.handleNotification);
    
        this.setState({
          token,
        });
        // this.sendPushNotification(token)
        Notifications.scheduleLocalNotificationAsync({
            title: 'Mused',
            body: 'Hi, it‘s Mused. 15 new looks are ready to edit',
        }, {
            time: (new Date().getTime()) + DAY_TIME * 1
        })
        Notifications.scheduleLocalNotificationAsync({
            title: 'Mused',
            body: 'Create an outfit from your Balenciaga faves',
        }, {
            time: (new Date().getTime()) + DAY_TIME * 2
        })
        Notifications.scheduleLocalNotificationAsync({
            title: 'Mused',
            body: 'Try styling this trend?',
        }, {
            time: (new Date().getTime()) + DAY_TIME * 3
        })
    }

    sendPushNotification = (token = this.state.token) => {
        return fetch('https://exp.host/--/api/v2/push/send', {
          body: JSON.stringify({
            to: token,
            title: 'Mused',
            body: 'Welcome to You!',
            data: { message: 'Welcome to You!' },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
    }
    
    handleNotification = (notification: any) => {
        this.setState({
            notification,
        });
        console.log('Notification Data', notification)
    };

    //sort newsfeed by pin field
    /*
        if 0 please treat as normal, no speical treatment needed
        if 1 please place at the top of newfeed
        if 2 please place 2nd on newsfeed
        if 3 please place 3rd on newsfeed
    */
    sortData = (data: any) => {
        if(data === undefined) return [];
        for(let i = 0; i < data.length; i++){
            for(let j = i + 1; j < data.length; j++){
                if(data[j].pin === 0) continue;
                if(data[i].pin > data[j].pin || (data[i].pin === 0)) {
                    const temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
        return data;
    }
    
    render() {
        // console.log(this.sortData(this.props.listOfPosts))
        return (
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {(this.props.listOfPosts && this.props.listOfPosts.length) && <FlatList
                    data={this.sortData(this.props.listOfPosts)}
                    renderItem={this._renderItem}
                    keyExtractor={ (item) => `${item._id}`}
                    scrollEventThrottle={1000}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter.bind(this)}
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
            goToInstagramSlide={this.props.goToInstagramSlide}
        />

    _renderHeader = () => {
        const { instagramInspirationalImage } = this.props;
        if(instagramInspirationalImage.length === 0) return null;
        return (
            <View>
                <View style={theme.titleView}>
                    <View style={theme.lineView}></View>
                    <Text style={theme.titleText}>Today's Instagram Looks</Text>
                    <View style={theme.lineView}></View>
                </View>
                <TouchableOpacity 
                    onPress={this.props.goToInstagramSlide}
                >
                    <Image source={{uri: instagramInspirationalImage}} style={theme.instagramImage} />
                </TouchableOpacity>                
                <View style={theme.separator}></View>
            </View>
        )
    }        

    _renderFooter = () => {
        const {listOfRetailerPosts, listOfRecentNewProducts} = this.props;
        if(listOfRetailerPosts){
            return(
                <View>
                    <RetailerPosts
                        posts={listOfRetailerPosts}
                        onClickPost={this.props.onClickRetailerPost}
                    />
                    <View style={theme.separator}></View>
                    <NewProductList
                        products={listOfRecentNewProducts}
                        onClickProduct={this.props.onClickNewProduct}
                        onClickViewAll={this.props.onViewAllNewProduct}
                    />
                </View>
            )
        } else {
            return null
        }
    }    

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