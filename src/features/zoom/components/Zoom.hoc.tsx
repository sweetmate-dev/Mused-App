import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Zoom from './Zoom';

import { ROOT_STORE } from '../../stores';
import { ZOOM, BROWSE } from '../../shared/routesKeys';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function ZoomHOC(Zoom: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
      
        render() {
            const { root: { ui }, navigation } = this.props;
            const { setPrevCurrentRoutes, prevRoute, goBack } = ui;
            return <Zoom
                    setPrevCurrentRoutes={setPrevCurrentRoutes}
                    prevRoute={prevRoute}
                    navigation={navigation}
                    createNewStyle={this.createStyleWithMused}
                    goBack={goBack}
                  />
        }

        createStyleWithMused = (product: ProductImage) => {
            const { root: { products, slots, ui } } = this.props;
            const { createStyleWithMused, getNewProducts } = products;
            const { setSlotNumber } = slots;
            const { navigate } = ui;
            createStyleWithMused(product);
            getNewProducts();
            setSlotNumber(-1);
            navigate(BROWSE, ZOOM, {from: 'zoom'});
        }
    }
    return NewComp;
  }

export default ZoomHOC(Zoom);
