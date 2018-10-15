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
        static navigationOptions: ([string]: any) => HashMap<Object> = ({}) => {
          return {
              header: null
          }
        };
        render() {
            const { root: { ui }, navigation } = this.props;
            const { setPrevCurrentRoutes, prevRoute } = ui;

            return <Header
                    setPrevCurrentRoutes={setPrevCurrentRoutes}
                    prevRoute={prevRoute}
                    navigation={navigation}
                  />
        }
    }
    return NewComp;
  }

export default ZoomHOC(Zoom);
