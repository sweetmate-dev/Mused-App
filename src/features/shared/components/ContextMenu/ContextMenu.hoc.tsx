import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ContextMenu from './ContextMenu';
import { ROOT_STORE } from '../../../stores';
import { ZOOM, BROWSE, FILTER } from '../../routesKeys';

type Props = {
    root?: RootStore;
};
function ContextMenuHOC(ContextMenu: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui } } = this.props;
          const { contextMenuIsVisible, currentRoute }  = ui;
          const isBrowse: boolean = currentRoute === BROWSE;
        return (
            contextMenuIsVisible &&  isBrowse && 
            <ContextMenu
                goToZoomPage={this._goToZoomPage}
                goToFilterPage={this._goToFilterPage}
                moveImage={this._moveImage}
            />
              )
      }
      _goToZoomPage = () => {
        const { root: { products, ui: { navigate}, slots: { secondSlotNumber } } } = this.props;
        const { listOfAlternatives, listOfCollection} = products;
        const product: Product = [...listOfAlternatives, ...listOfCollection].find(
          (product: Product) => product.id === secondSlotNumber);
        navigate(ZOOM, BROWSE, {product});
      }
      _goToFilterPage = () => {
        const { root: { ui: { navigate, toggleContextMenu}, slots: { secondSlotNumber, setSlotNumber}}} = this.props;
        navigate(FILTER, BROWSE);
        toggleContextMenu(false);
        secondSlotNumber && setSlotNumber(secondSlotNumber);
      }
      _moveImage =  () => {
        const { root: { slots: { setMoveProduct} } } = this.props;
        setMoveProduct(true);
      }
    }
    return NewComp;
  }

export default ContextMenuHOC(ContextMenu);