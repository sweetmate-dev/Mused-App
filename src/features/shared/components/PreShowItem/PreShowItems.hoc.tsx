import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PreShowItems from './PreShowItems';

import { ROOT_STORE } from '../../../stores';
type Props = {
    root?: RootStore;
};
function PreShowItemsHOC(PreShowItems: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui} } = this.props;
          const { currentRoute }  = ui;
  
        return <PreShowItems currentRoute={currentRoute} />
      }
    }
    return NewComp;
  }

export default PreShowItemsHOC(PreShowItems);