import React, { Component } from 'react';
import { Facebook, Constants, BlurView } from 'expo';
import {
    Platform,
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    loginViaFBProvider,
    updateUser 
} from '../../../services'
import * as API from '../../../services/api';

const {width} = Dimensions.get('window');
const logoImage = require('../../../../assets/images/logo.png');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logoView: {
        padding: 20,
        position: 'relative'
    },
    logoBack: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        backgroundColor: 'white'
    },
    logoImage: {
        width: width / 3,
        height: width / 729 * 86,
        resizeMode: 'stretch'
    },
    facebookButton: {
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4A56B8',
        padding: 10
    },
    facebookTextView: {
        flex: 1,
        height: 50,
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    facebookText: {
        color: 'white',
        fontSize: 16,
    },
    bottomText: {
        fontSize: 14,
        color: 'black',
        backgroundColor: 'transparent'
    }
})

type Props = {
    setUserDetails: (userId: string, userProfile: UserProfile) => void;
    requestAuth: (value: boolean) => void;
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
                API.setIdentify(userProfile.email);
                this.props.requestAuth(false);
            }, (error: Error) => {
                this.setState({errorMsg: error.message});
                this.props.requestAuth(false);
            })
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
            <View style={styles.container}>
                <BlurView style={styles.blurView} tint="dark" intensity={80}>
                </BlurView>
                <View style={styles.logoView}>
                    <View style={styles.logoBack}>
                    </View>
                    <Image source={logoImage} style={styles.logoImage} />
                </View>
                <TouchableWithoutFeedback onPress={() => this._handleFBLogin()}>
                    <View style={styles.facebookButton}>
                        <Ionicons name="logo-facebook" size={40} color='white' />
                        <View style={styles.facebookTextView}>
                        <Text style={styles.facebookText}>CONNECT WITH FACEBOOK</Text>
                        </View>                
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.logoView}>
                    <View style={styles.logoBack}>
                    </View>
                    <Text style={styles.bottomText}>...or join using <Text style={{textDecorationLine: 'underline'}}>your email</Text></Text>
                </View>
            </View>
        )
    };
}
