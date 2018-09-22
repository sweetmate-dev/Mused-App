import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AuthControls from './AuthControls';
import { NavigatorStack } from '../../navigation';
import { Footer, FooterButtons, ContextMenu } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { getAuthUserData } from '../../../services';

type Props = {
    root?: RootStore;
};

function AuthControlsHOC(AuthControls: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComponent extends Component<Props> {

        componentDidMount() {
            const userAuthData = getAuthUserData();
            // user logged in
            if (userAuthData) {
                const { userId, userProfile } = userAuthData;
                const { setUserDetails } =  this.props.root.user;
                this.setState({ userId });
                setUserDetails(userId, userProfile);
            }
        }

        render() {
            const { root: { user } } = this.props;
            const { setUserDetails, userId, userProfile } = user;

            // user Auth ID
            if (!userId || ! userProfile) {
                return <AuthControls
                    setUserDetails={setUserDetails}
                    userProfile={userProfile}
                />
            }

            return (
                <>
                    <NavigatorStack />
                    <Footer />
                    <FooterButtons />
                    <ContextMenu />
                </>
            )
      }
    }
    return NewComponent;
}

export default AuthControlsHOC(AuthControls);
