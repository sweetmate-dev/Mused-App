import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionList from './CollectionList';
import { Header, BROWSE, COLLECTION } from '../../shared';
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
          const { root: { products }, navigation } = this.props;
          const { listOfCollection, getCollection, listOfBookmarks, createBookmark, deleteBookmarkById} = products;
        return <Collection 
                    listOfCollection={listOfCollection} 
                    getCollection={getCollection} 
                    navigation={navigation}
                    goToBrowse={this._goToBrowse}
                    listOfBookmarks={listOfBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmarkById={deleteBookmarkById}
                />
      }

      _goToBrowse = (slotNumber: number, alternatives: number[]) => {
        const { root: { ui, slots } } = this.props;
        const { navigate } = ui;
        const { setSlotNumber } = slots;
        setSlotNumber(slotNumber);
        navigate(BROWSE, COLLECTION, {alternatives});
      }
    }
    return NewComp;
  }

export default CollectionHOC(CollectionList);