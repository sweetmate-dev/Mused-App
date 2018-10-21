import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Zoom from './Zoom';

import { ROOT_STORE } from '../../stores';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function ZoomHOC(Header: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
      
        render() {
            const { root: { ui }, navigation } = this.props;
            const { setPrevCurrentRoutes, prevRoute } = ui;
            return <Header
                    setPrevCurrentRoutes={setPrevCurrentRoutes}
                    prevRoute={prevRoute}
                    navigation={navigation}
                    createNewStyle={this.createStyleWithMused}
                  />
        }

        createStyleWithMused = (product: ProductImage) => {
            const { root: { products, slots } } = this.props;
            const { createStyleWithMused } = products;
            const { setSlotNumber } = slots;
            createStyleWithMused(product);
            setSlotNumber(-1);
        }
    }
    return NewComp;
  }

export default ZoomHOC(Zoom);
