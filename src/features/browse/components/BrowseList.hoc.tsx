import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import BrowseList from './BrowseList';
import { Header, ZOOM, BROWSE } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function BrowseHOC(Browse: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };
      render() {
          const { root: { slots, products, ui }, navigation } = this.props;
          const { contextMenuIsVisible } = ui;
          const { setNewImgUrl, isSlotMachine } = slots;
          const { listOfAlternatives, getAlternatives, createBookmark, listOfBookmarks, deleteBookmarkById } = products;
        return <Browse
                    navigation={navigation}
                    setNewImgUrl={setNewImgUrl}
                    navigateToProductSingle={this._navigateToProductSingle}
                    hideContextMenu={this._hideContextMenu}
                    isSlotMachine={isSlotMachine}
                    listOfAlternatives={listOfAlternatives}
                    getAlternatives={getAlternatives}
                    createBookmark={createBookmark}
                    listOfBookmarks={listOfBookmarks}
                    deleteBookmarkById={deleteBookmarkById}
                    contextMenuIsVisible={contextMenuIsVisible}
                />
      }

      _navigateToProductSingle = (product: Product) => {
        const { root: { ui } } = this.props;
        const {  navigate } = ui;
        navigate(ZOOM, BROWSE, {product});
    }
    _hideContextMenu = () => {
        const { root: { ui, slots } } = this.props;
        const {  toggleContextMenu, contextMenuIsVisible  } = ui;
        const { setSecondSlotNumber } = slots;
        if (contextMenuIsVisible) {
            toggleContextMenu(false);
        }
        setSecondSlotNumber(null);
    }
    }
    return NewComp;
  }

export default BrowseHOC(BrowseList);