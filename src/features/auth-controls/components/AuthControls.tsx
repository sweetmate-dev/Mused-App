import React, { Component } from 'react';
import { Facebook, Constants } from 'expo';
import {
    Platform,
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Video } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
    loginViaFBProvider,
    updateUser 
} from '../../../services'
import * as API from '../../../services/api';

const { width } = Dimensions.get('window');
const logoImage = require('../../../../assets/images/join-mused.jpg');
const welcomeImage = require('../../../../assets/images/welcome-video-bg.jpg');
const videoSource = require('../../../../assets/videos/join.mp4');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        marginTop: 45,
        width: width * 0.6,
        height: width * 0.6 * 96 / 380,
        resizeMode: 'stretch'
    },
    welcomeImage: {
        flex: 1,
        width,
        resizeMode: 'cover'
    },
    videoContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonButtonView: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    facebookButton: {
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4A56B8',
        marginBottom: 20,
        padding: 10
    },
    facebookTextView: {
        flex: 1,
        height: 50,
        borderLeftColor: 'white',
        borderLeftWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    facebookText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'RalewayBold'
    },
    skipButton: {
        width: width * 0.8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    skipButtonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'RalewayBold'
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
    setLoading: (value: boolean) => void
}

type State = {
    userData: any;
    errorMsg: string;
    firstName: string;
    token: string;
};

export default class AuthControls extends Component<Props, State> {
    state: State = {
        userData: null,
        errorMsg: null,
        firstName: '',
        token: ''
    };

    componentDidMount() {
        this.backupFacebookAPIToken();
    }

    backupFacebookAPIToken = async () => {
        try {
            const data = await AsyncStorage.getItem('FacebookAPIToken');
            if (data !== null) {
                // We have data!!
                const value = JSON.parse(data);
                const CT = new Date().getTime();
                console.log(CT)
                if(CT < value.expires * 1000){
                    const firstName = await AsyncStorage.getItem('FacebookAsName');
                    this.setState({firstName, token: value.token})
                }
            }
        } catch (error) {
            // Error retrieving data
            console.log('Error in getting saved Facebook API Token', error.toString())
        }
    }

    onClickFacebook = () => {        
        if(this.state.firstName.length > 0){
            this.FBLogin(this.state.token, 'Login');            
        }
        else{
            this.ShowFacebookSignUpModal()
        } 
    }

    ShowFacebookSignUpModal = async () => {
        let authData;
        try {
            authData = await Facebook.logInWithReadPermissionsAsync('2127807207434704', {
                permissions: ['public_profile', 'email'],
                behavior: this.isAStandaloneApp() ? 'native' : 'web'
            });
        } catch (err) {
            console.log(err.toString())
        }
        const { type, token, expires } = authData;
        this.saveFacebookAPIToken(token, expires);
        if (type === 'success') {
            this.FBLogin(token, 'Signup')
        } else {
            console.log(`Facebook.logInWithReadPermissionsAsync: ${type}`);
        }
    }

    saveFacebookAPIToken = async (token: string, expires: number) => {
        try {
          await AsyncStorage.setItem('FacebookAPIToken', JSON.stringify({token, expires}))
        } catch (error) {
          console.log('Error in saving Facebook API Token', error.toString())
        }    
    }

    FBLogin = (token: string, actionType: string) => {
        this.props.setLoading(true)
        loginViaFBProvider(token).then((data: any) => {
            const userId = data.auth.authInfo.userId;
            const userProfile = data.auth.authInfo.userProfile.data;
            console.log(userProfile)
            this.saveFacebookAsName(userProfile.first_name);
            this._updateUser(userId, userProfile);
            API.setIdentify(userProfile.email);
            API.RegisterEvent(actionType, { actionType })            
            this.props.requestAuth(false);
            this.props.setLoading(false);
        }, (error: Error) => {
          console.log(error.message)
          this.props.setLoading(false)
        })
    }

    saveFacebookAsName = async (name: string) => {
        try {
          await AsyncStorage.setItem('FacebookAsName', name)
        } catch (error) {
          console.log('Error in saving Facebook AsName', error.toString())
        }   
    }

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
            <Image source={logoImage} style={styles.logoImage} />
            <View style={styles.content}>
              <Image source={welcomeImage} style={styles.welcomeImage} />
              <View style={styles.videoContainer}>            
                <Video
                    shouldPlay={true}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    source={videoSource}
                    isLooping
                    style={{
                        height: width * 0.65 * 480 / 378,
                        backgroundColor: '#ffffff',
                        width: width * 0.65,
                    }}
                    useNativeControls={false}
                    usePoster={false}
                />            
              </View>
            </View>
            <View style={styles.buttonButtonView}>
              <TouchableWithoutFeedback onPress={() => this.onClickFacebook()}>
                <View style={styles.facebookButton}>
                  <Ionicons name="logo-facebook" size={40} color='white' />
                  <View style={styles.facebookTextView}>
                    <Text style={styles.facebookText}>
                      {this.state.firstName.length > 0 ? 'Continue as ' + this.state.firstName : 'Continue with Facebook'}
                    </Text>
                  </View>                
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => console.log('')}>
                <View style={styles.skipButton}>
                    <Text style={styles.bottomText}>...or signup using <Text style={{textDecorationLine: 'underline'}}>your email</Text></Text>   
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )
      }
}
