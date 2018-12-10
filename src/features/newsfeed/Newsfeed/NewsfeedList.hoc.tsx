import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import NewsfeedList from './NewsfeedList';
import { Header, COLLECTION, NEWSFEED, BROWSE_ONLY, ZOOM } from '../../shared';
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
        const { root: { ui, user } } = this.props;
        ui.setNavigation(this.props.navigation);
        
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
        const { listOfPosts, getPosts } = posts;
        const { getBookmarksByUserId, getCollection } = products;
        return <Newsfeed 
                    goToCollection={this._goToCollection}
                    goToBrowseDirectly={this._goToBrowseDirectly}
                    goToZoomDirectly={this._goToZoomDirectly}
                    getPosts={getPosts}
                    getCollection={getCollection}
                    listOfPosts={listOfPosts}
                    getBookmarksByUserId={getBookmarksByUserId}
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