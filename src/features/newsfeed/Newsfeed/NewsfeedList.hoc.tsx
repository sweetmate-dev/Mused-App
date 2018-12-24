import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import NewsfeedList from './NewsfeedList';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM, INSTAGRAM } from '../../shared';
import * as API from '../../../services/api';

import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function NewsfeedHOC(Newsfeed: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };      

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
      }
      render() {
        const { root: { posts, products } } = this.props;
        const { listOfPosts, listOfRetailerPosts, getPosts } = posts;
        const { getBookmarksByUserId, getCollection, listOfAlternatives, listOfRecentNewProducts } = products;
        return <Newsfeed 
                    goToCollection={this._goToCollection}
                    goToBrowseDirectly={this._goToBrowseDirectly}
                    goToZoomDirectly={this._goToZoomDirectly}
                    getPosts={getPosts}
                    getCollection={getCollection}
                    goToInstagramSlide={this._goToInstagramSlide}
                    listOfPosts={listOfPosts}
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

      _goToInstagramSlide = (slots: any) => {
        API.RegisterEvent("Nf-ClickPost", {          
          event: 'Click post',
          postType: 'Instagram',
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