import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import NewsfeedList from './NewsfeedList';
import { Header, COLLECTION, NEWSFEED } from '../../shared';

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
        this.props.root.ui.setNavigation(this.props.navigation);
      }
      render() {
          const { root: { posts, products } } = this.props;
          const { listOfPosts, getPosts } = posts;
          const { getBookmarksByUserId, getCollection } = products;
        return <Newsfeed 
                    goToCollection={this._goToCollection}
                    getPosts={getPosts}
                    getCollection={getCollection}
                    listOfPosts={listOfPosts}
                    getBookmarksByUserId={getBookmarksByUserId}
                />
      }
      _goToCollection = (params: any) => {
        const { root: { ui} } = this.props;
          const { navigate } = ui;
          navigate(COLLECTION, NEWSFEED, params);
          
      }
    }
    return NewComp;
  }

export default NewsfeedHOC(NewsfeedList);