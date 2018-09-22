import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionItem from './CollectionItem';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation?: any;
    root?: RootStore;
    item: Product;
    countAlter: string;
    goToBrowse: (slotNumber: number, alternatives: number[]) => void;
    alternatives: number[];
    index: number;
};
function CollectionItemHOC(CollectionItem: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { products }, item, countAlter, goToBrowse, alternatives, index } = this.props;
          const { listOfBookmarks, createBookmark, deleteBookmarkById} = products;
        return <CollectionItem
                    listOfBookmarks={listOfBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmarkById={deleteBookmarkById}
                    item={item}
                    countAlter={countAlter}
                    goToBrowse={goToBrowse}
                    alternatives={alternatives}
                    index={index}
                />
      }
    }
    return NewComp;
  }

export default CollectionItemHOC(CollectionItem);