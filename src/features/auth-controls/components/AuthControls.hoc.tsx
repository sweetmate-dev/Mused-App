import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
// import AuthControls from './AuthControls';
import { NavigatorStack } from '../../navigation';
import { Footer, FooterButtons, ContextMenu } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { getAuthUserData, autoLogOut } from '../../../services';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import { Onboarding } from '../../onboarding';
import AuthControls from './AuthControls';
import ReSignIn from './ResignIn';

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
            this.checkAutoLoggedOut()
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

        

        checkAutoLoggedOut = async () => {
            try {
                const autoLoggedOut = await AsyncStorage.getItem('autoLoggedOut');
                if (autoLoggedOut !== null) {
                  if(autoLoggedOut === 'true') autoLogOut();
                  this.setState({newUser: false})
                }
            } catch (error) {
                // Error retrieving data
                console.log(error.toString())
            }
        }

        _onSkipSignUp = async () => {
            this.setState({newUser: false});
        }

        render() {
            const { root: { user, ui } } = this.props;
            const { loading, setUserDetails, autoLoggedOut, removeAuthLogOut } = user;
            const { requireAuth, requestAuth, setLoading, navigate } = ui;
            const { newUser } = this.state;
            // user Auth ID
            if(autoLoggedOut) {
                return (
                    <ReSignIn 
                        setUserDetails={setUserDetails}
                        requestAuth={requestAuth}
                        setLoading={setLoading}
                        removeAuthLogOut={removeAuthLogOut}
                        navigate={navigate}
                    />
                )
            } else if(!newUser && loading) {
                return <DotIndicator size={6} count={3}/>
            }
            else if (newUser) {
                return <Onboarding onSkipSignUp={this._onSkipSignUp}/>
            }
            return (
                <>
                    <NavigatorStack />
                    <Footer />
                    <FooterButtons />
                    <ContextMenu />
                    {   
                        requireAuth &&
                        <AuthControls 
                            setUserDetails={setUserDetails}
                            requestAuth={requestAuth}
                            setLoading={setLoading}
                        /> 
                    }
                </>
            )
      }
    }
    return NewComponent;
}

export default AuthControlsHOC(Onboarding);
