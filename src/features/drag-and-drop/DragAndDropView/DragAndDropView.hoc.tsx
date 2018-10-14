import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DragAndDropView from './DragAndDropView';
import { Header, ZOOM, VIEW } from '../../shared';
import { ROOT_STORE } from '../../stores';

type Props = {
    navigation: any;
    root: RootStore;
};
function DragAndDropViewHOC(DragAndDropView: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };
      render() {
          const { root: { products, slots } } = this.props;
          const {  getProductsByCategory, categoryInDrag, listOfProductsByCategories, arrayImages, resetProductsByCategory } = products;
          const { getSixthSlot, addOrReplaceSixthSlot } = slots;
          const _dragrabbleItems = 
            Boolean(getSixthSlot)
              ? [...arrayImages, getSixthSlot]
              : arrayImages
        return <DragAndDropView
                    dragrabbleItems={_dragrabbleItems}
                    sixthSlot={getSixthSlot}
                    listOfProductsByCategories={listOfProductsByCategories}
                    getProductsByCategory={getProductsByCategory}
                    addOrReplaceSixthSlot={addOrReplaceSixthSlot}
                    navigateToProductSingle={this._navigateToProductSingle}
                    resetProductsByCategory={resetProductsByCategory}
                    hasSixthSlot={Boolean(getSixthSlot)}
                    categoryInDrag={categoryInDrag}
                />
      }
      _navigateToProductSingle = (product: Product) => {
        const { root: { ui } } = this.props;
        const {  navigate } = ui;
        navigate(ZOOM, VIEW, {product});
    }
    }
    return NewComp;
  }

export default DragAndDropViewHOC(DragAndDropView);