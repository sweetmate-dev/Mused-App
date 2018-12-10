import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Permissions, Notifications } from 'expo';
// import AuthControls from './AuthControls';
import { NavigatorStack } from '../../navigation';
import { Footer, FooterButtons, ContextMenu } from '../../shared';
import { ROOT_STORE } from '../../stores';
import { getAuthUserData, autoLogOut } from '../../../services';
import DotIndicator from '../../shared/components/Indicators/dot-indicator'
import { Onboarding } from '../../onboarding';
import AuthControls from './AuthControls';
import ReSignIn from './ResignIn';

const DAY_TIME = 24 * 3600 * 1000;
const iconURL = 'http://www.mused-app.com/assets/notification-icon.png';

type Props = {
    root?: RootStore;
};
type State = {
    newUser: boolean,
    skipped: boolean,
    token: string,
    notification: any,
};

function AuthControlsHOC(Onboarding: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComponent extends Component<Props, State> {
        state: State = {
            newUser: false,
            skipped: false,
            token: null,
            notification: null,
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
            // this.registerForPushNotifications()
        }

        async registerForPushNotifications() {
            const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        
            if (status !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                if (status !== 'granted') {
                    return;
                }
            }
        
            const token = await Notifications.getExpoPushTokenAsync();        
            Notifications.addListener(this.handleNotification);
        
            this.setState({
                token,
            });
            // this.sendPushNotification(token)
            Notifications.scheduleLocalNotificationAsync({
                title: 'Mused',
                body: 'Hi, it‘s Mused. 15 new looks are ready to edit',
                icon: iconURL
            }, {
                time: (new Date().getTime()) + DAY_TIME * 1
            })
            Notifications.scheduleLocalNotificationAsync({
                title: 'Mused',
                body: 'Create an outfit from these 10 Balenciaga faves',
                icon: iconURL
            }, {
                time: (new Date().getTime()) + DAY_TIME * 2
            })
            Notifications.scheduleLocalNotificationAsync({
                title: 'Mused',
                body: 'Try styling this trend?',
                icon: iconURL
            }, {
                time: (new Date().getTime()) + DAY_TIME * 3
            })
        }

        handleNotification = (notification: any) => {
            this.setState({
                notification,
            });
            console.log('Notification Data', notification)
        };

        sendPushNotification = (token = this.state.token) => {
            return fetch('https://exp.host/--/api/v2/push/send', {
              body: JSON.stringify({
                to: token,
                title: 'Mused',
                body: 'Welcome to You!',
                data: { message: 'Welcome to You!' },
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
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
            this.registerForPushNotifications();
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
