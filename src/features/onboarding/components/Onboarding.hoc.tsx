import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Onboarding from './Onboarding';

import { ROOT_STORE } from '../../stores';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
    onSkipSignUp: () => void
};
function ZoomHOC(Onboarding: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
      
        render() {
            const { navigation, onSkipSignUp } = this.props;
            const { setUserDetails } =  this.props.root.user;
            // const { root: {ui: {navigate}}} = this.props;
            return <Onboarding
                      navigation={navigation}
                      setUserDetails={setUserDetails}
                      onSkipSignUp={onSkipSignUp}
                    //   navigateToNewsFeed={navigate(NEWSFEED, '', {})}
                  />
        }
    }
    return NewComp;
  }

export default ZoomHOC(Onboarding);
