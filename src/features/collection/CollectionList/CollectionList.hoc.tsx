import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionList from './CollectionList';
import { Header, COLLECTION, VIDEOPLAYER } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function CollectionHOC(Collection: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {

    static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        }
        };

      render() {
          const { root: { ui, products }, navigation } = this.props;
          const { currentRoute }  = ui;
          const { listOfCollection, getCollection, listOfBookmarks, createBookmark, deleteBookmarkById} = products;
        return <Collection 
                    listOfCollection={listOfCollection} 
                    getCollection={getCollection} 
                    navigation={navigation}
                    currentRoute={currentRoute}
                    goToVideo={this._goToVideo}
                    listOfBookmarks={listOfBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmarkById={deleteBookmarkById}
                />
      }

      _goToVideo = (slotNumber: number, alternatives: number[]) => {
        const { root: { ui, slots } } = this.props;
        const { navigate } = ui;
        const { setSlotNumber } = slots;
        setSlotNumber(slotNumber);
        navigate(VIDEOPLAYER, COLLECTION, {alternatives});
      }      

    //   _goToBrowse = (slotNumber: number, alternatives: number[]) => {
    //     const { root: { ui, slots } } = this.props;
    //     const { navigate } = ui;
    //     const { setSlotNumber } = slots;
    //     setSlotNumber(slotNumber);
    //     navigate(BROWSE, COLLECTION, {alternatives, transition: 'opacityTransition'});
    //   }
    }
    return NewComp;
  }

export default CollectionHOC(CollectionList);