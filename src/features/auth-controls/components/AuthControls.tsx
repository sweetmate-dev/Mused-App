import React, { Component } from 'react';
import { Facebook, Constants } from 'expo';
import {
    Platform,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import theme from '../theme';
import {
    loginViaFBProvider,
    updateUser } from '../../../services'

type Props = {
    userProfile: () => any;
    setUserDetails: (userId: string, userProfile: UserProfile) => void;
}

type State = {
    userData: any;
    errorMsg: string
};

export default class AuthControls extends Component<Props, State> {
    state: State = {
        userData: null,
        errorMsg: null
    };

    _handleFBLogin = async () => {
        let authData;
        try {
             authData = await Facebook.logInWithReadPermissionsAsync('2127807207434704', {
                permissions: ['public_profile', 'email'],
                behavior: this.isAStandaloneApp() ? 'native' : 'web'
            });
        } catch (err) {
            console.error(err)
        }
        const { type, token } = authData;

        if (type === 'success') {
            // login into Stitch app using FB token
            loginViaFBProvider(token).then((data: any) => {
                const userId = data.auth.authInfo.userId;
                const userProfile = data.auth.authInfo.userProfile.data;

                this._updateUser(userId, userProfile);
            }, (error: Error) => this.setState({errorMsg: error.message}))
        } else {
            console.error(`Facebook.logInWithReadPermissionsAsync: ${type}`);
        }
    };

    _updateUser = (userId: string, userProfile: any) => {
        updateUser(userProfile).then(
            () => {
                this.props.setUserDetails(userId, userProfile)
            },
            error => console.log(error)
        );
    };

    isAStandaloneApp = () => {
        return !(Platform.OS === 'ios' && Constants.appOwnership === 'expo');
    };

    render() {
        return (
            <View style={theme.container}>
                { this.state.errorMsg && <View><Text>{ this.state.errorMsg }</Text></View> }
                <View>
                    <TouchableWithoutFeedback
                        onPress={this._handleFBLogin}
                    >
                        <View style={theme.signInTouchable}>
                            <Text style={theme.signInText}>
                                Sign in with Facebook
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    };
}
