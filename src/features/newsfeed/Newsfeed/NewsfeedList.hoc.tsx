import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Linking } from 'expo';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';
import NewsfeedList from './NewsfeedList';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM, INSTAGRAM, BROWSE } from '../../shared';
import * as API from '../../../services/api';

import { ROOT_STORE } from '../../stores';
import theme from '../theme';

type Props = {
    navigation: any;
    root: RootStore;
};

type State = {
  redirecting: boolean,
};

function NewsfeedHOC(Newsfeed: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props, State> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };      

      state: State = {
        redirecting: false
      }

      componentDidMount() {
        const { root: { ui, user, products: { getNewProducts } } } = this.props;
        ui.setNavigation(this.props.navigation);
        getNewProducts('all');
        setTimeout(() => {
          API.setIdentify(user.userProfile.email);
          API.RegisterEvent("Login", {
            actionType: 'Login',
            email: user.userProfile.email,
            userId: user.userId,
          })
          API.RegisterEvent("Nf-View", {
            actionType: 'View screen',
          })
        }, 1000) 

        Linking.addEventListener('url', this._handleOpenUrl)
        // this.registerForPushNotifications();
        // this._handleOpenUrl({url: 'musedapp://styleit?productId=751828991'})
        this._checkNewUser();

      }

      _checkNewUser = async () => {
        try {
            const isNew = await AsyncStorage.getItem('newUser');
            if (isNew === 'no') {
              const { root: { user: {setNewUser}}} = this.props;
              setNewUser(false)
            }
        } catch (error) {}
      }

      _handleOpenUrl = (event: any) => {
        const { root: { ui: {navigate}, slots: {setSlotNumber}, products } } = this.props;
        let { path, queryParams } = Linking.parse(event.url);
        const { getDetailByProductId, createStyleWithMused, getNewProducts } = products;
        this.setState({redirecting: true});
        console.log('deep linking event', event);
        switch(path) {
            case 'styleit':
                const productId = queryParams.productId;
                getDetailByProductId(Number(productId)).then((product: any) => {                    
                    const params = {
                        id: productId,
                        img: {uri: product.image}
                    }
                    createStyleWithMused(params);
                    getNewProducts(product.category);
                    setSlotNumber(-1);
                    this.setState({redirecting: false}, () => {
                      navigate(BROWSE, ZOOM, {from: 'zoom'});
                    })                    
                });
                break;
            default:
                this.setState({redirecting: false});
                break;
        }
    }

    getInstagramInspirationalImage = () => {
      const { root: { posts } } = this.props;
      const { listOfPosts } = posts;
      let imageUrl: string = '';      
      _.reverse(_.sortBy(listOfPosts, "date")).map((post: Post) => {            
        if(post.postType === 'instagram') {  
          imageUrl = post.inspirationalImage;                 
        }
      })
      return imageUrl;
    }

    render() {
        const { root: { posts, products } } = this.props;
        const { listOfPosts, listOfRetailerPosts, getPosts } = posts;
        const { getBookmarksByUserId, getCollection, listOfAlternatives, listOfRecentNewProducts } = products;
        if(this.state.redirecting) {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={theme.redirectText}>Redirecting...</Text>
            </View>
          )
        }
        const inspirationalImage = this.getInstagramInspirationalImage();

        return <Newsfeed 
                  goToCollection={this._goToCollection}
                  goToBrowseDirectly={this._goToBrowseDirectly}
                  goToZoomDirectly={this._goToZoomDirectly}
                  getPosts={getPosts}
                  getCollection={getCollection}
                  goToInstagramSlide={this._goToInstagramSlide}
                  listOfPosts={listOfPosts}
                  instagramInspirationalImage={inspirationalImage}
                  listOfRetailerPosts={listOfRetailerPosts}
                  getBookmarksByUserId={getBookmarksByUserId}
                  onClickRetailerPost={this._onClickRetailerPost}
                  listOfAlternatives={listOfAlternatives}
                  listOfRecentNewProducts={listOfRecentNewProducts}
                  onClickNewProduct={this._onClickNewProduct}
                  onViewAllNewProduct={this._onViewAllNewProduct}
                />
      }

      _goToCollection = (params: any) => {
        const { root: { ui, slots: { removeSixthSlot }, products: { setFromOutfit } } } = this.props;
        const { navigate } = ui;
        removeSixthSlot();
        setFromOutfit(false);
        navigate(COLLECTION, NEWSFEED, params);   
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'inspire',
        })       
      }

      _onClickRetailerPost = async (post: RetailerPost) => {
        const { getCollection, setFromOutfit, resetArrayImages } = this.props.root.products;
        setFromOutfit(false)
        await resetArrayImages();
        getCollection(post.slots);
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'Retailer',
        });
        this.props.root.ui.navigate(COLLECTION, NEWSFEED, {
          productIds: post.slots,
          from: 'instagram'
        });        
      }

      _onClickNewProduct = (item: Product) => {
        const { root: { ui, products } } = this.props;
        const { navigate } = ui;
        const { getDetailByProductId } = products;
        getDetailByProductId(item.id)
        .then((product: any) => {
          navigate(ZOOM, NEWSFEED, {product});
        })
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'New Product',
        })
      }

      _onViewAllNewProduct =  () => {
        const { root: { ui } } = this.props;
        const { navigate } = ui;
        navigate(BROWSE_ONLY, NEWSFEED, {});
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'View All New Products',
        })
      }

      _goToInstagramSlide = () => {
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'Instagram',
        }) 
        // combine all instagram slots
        const { root: { posts } } = this.props;
        const { listOfPosts } = posts;
        let slots: any = [];
        _.reverse(_.sortBy(listOfPosts, "date")).map((post: Post) => {
          if(post.postType === 'instagram') {
            post.slots.map((slot: any) => {
              slots.push({
                date: moment(new Date(post.date)).fromNow(false),
                slot,
                key: String(post.postId) + String(JSON.parse(slot.instagramURL).media_id)
              })
            })            
          }
        })
        this.props.root.ui.navigate(INSTAGRAM, NEWSFEED, {slots});  
      }

      _goToBrowseDirectly = (productIds: any) => {
        const { root: { ui } } = this.props;
        const { navigate } = ui;
        navigate(BROWSE_ONLY, NEWSFEED, {productIds});  
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'list',
        })   
      }

      _goToZoomDirectly = (productId: number) => {
        const { root: { ui, products } } = this.props;
        const { navigate } = ui;
        const { getDetailByProductId } = products;
        getDetailByProductId(productId)
        .then((product: any) => {
          navigate(ZOOM, NEWSFEED, {product});
        })
        API.RegisterEvent("Nf-ClickPost", {
          event: 'Click post',
          postType: 'product',
        })
      }
    }
    return NewComp;
  }

export default NewsfeedHOC(NewsfeedList);