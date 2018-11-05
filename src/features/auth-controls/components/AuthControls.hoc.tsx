import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import AuthControls from './AuthControls';
import { NavigatorStack } from '../../navigation';
import { Footer, FooterButtons, ContextMenu } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { getAuthUserData } from '../../../services';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import { Onboarding } from '../../onboarding';

type Props = {
    root?: RootStore;
};
type State = {
    newUser: boolean;
    skipped: boolean
};

function AuthControlsHOC(Onboarding: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComponent extends Component<Props, State> {
        state: State = {
            newUser: false,
            skipped: false
        }
        componentDidMount() {
            const userAuthData = getAuthUserData();
            // user logged in            
            if (userAuthData) {
                const { userId, userProfile } = userAuthData;
                const { setUserDetails } =  this.props.root.user;
                setUserDetails(userId, userProfile);
            } else {
                this.setState({newUser: true})
            }
        }

        render() {
            const { root: { user } } = this.props;
            const { userId, userProfile, loading } = user;
            const { newUser, skipped } = this.state;
            // user Auth ID
            if(!newUser && loading) {
                return <DotIndicator size={6} count={3}/>
            }
            else if ((!userId || ! userProfile) && !skipped || 1) {
                return <Onboarding onSkipSignUp={() => this.setState({skipped: true})}/>
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

export default AuthControlsHOC(Onboarding);
