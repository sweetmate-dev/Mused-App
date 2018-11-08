import React, { Component } from 'react';
import {
    BackHandler,
    Animated,
    Image,
    View,
    Platform
} from 'react-native';
import { Facebook, Constants } from 'expo';
import theme from '../theme';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import { loginViaFBProvider, loginViaAnonProvider, updateUser } from '../../../services'

const logoImage = require('../../../../assets/images/logo.png');

type Props = {
    navigation: any;
    setUserDetails: (userId: string, userProfile: UserProfile) => void;
    onSkipSignUp: () => void;
    setLoading: (value: boolean) => void
}

type State = {
  screenIndex: number;
  fadeIn: any
};
export default class Onboarding extends Component<Props, State> {
    state: State = {
      screenIndex: 0,
      fadeIn: new Animated.Value(1)
    }

    componentWillMount() {

    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._goBack);
    }

    onNext = () => {
      this.state.fadeIn.setValue(1)
      Animated.timing(                 
          this.state.fadeIn,            
          {
              toValue: 0,                   
              duration: 300, 
              useNativeDriver: true             
          }
      ).start(); 
      setTimeout(() => {
        this.setState({screenIndex: this.state.screenIndex + 1});
        Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 200, 
                useNativeDriver: true             
            }
        ).start(); 
      }, 350) 
    }

    onFacebookSignUp = async () => {
      let authData;
      try {
           authData = await Facebook.logInWithReadPermissionsAsync('2127807207434704', {
              permissions: ['public_profile', 'email'],
              behavior: this.isAStandaloneApp() ? 'native' : 'web'
          });
      } catch (err) {
          console.log(err.toString())
      }
      const { type, token } = authData;

      if (type === 'success') {
          // login into Stitch app using FB token
          this.props.setLoading(true)
          loginViaFBProvider(token).then((data: any) => {
              const userId = data.auth.authInfo.userId;
              const userProfile = data.auth.authInfo.userProfile.data;
              this._updateUser(userId, userProfile);
              this.props.setLoading(false)
          }, (error: Error) => {
            this.props.setLoading(false)
            console.log(error.message)
          })
      } else {
          console.error(`Facebook.logInWithReadPermissionsAsync: ${type}`);
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

    onSkipSignUp = () => {
      this.props.setLoading(true)
      loginViaAnonProvider().then((data: any) => {
        const userId = data.auth.authInfo.userId;
        const userProfile = data.auth.authInfo.userProfile.data;
        this._updateUser(userId, userProfile);
        this.props.onSkipSignUp()
        this.props.setLoading(false)
      }, (error: Error) => {
        this.props.setLoading(false)
        console.log(error.message)
      })
    }

    render() {
      const { screenIndex } = this.state;
        return (
          <View style={theme.container}>
            {screenIndex === 5 || <Image source={logoImage} style={theme.logo} />  }
            <Animated.View style={[theme.container, {opacity: this.state.fadeIn}]}>
            
            { 
              screenIndex === 0 && 
              <Step0 continue={this.onNext}/> 
            }
            { 
              screenIndex === 1 && 
              <Step1 continue={this.onNext}/> 
            }
            { 
              screenIndex === 2 && 
              <Step2 continue={this.onNext}/> 
            }
            { 
              screenIndex === 3 && 
              <Step3 continue={this.onNext}/> 
            }
            { 
              screenIndex === 4 && 
              <Step4 continue={this.onNext}/> 
            }
            { 
              screenIndex === 5 && 
              <Step5 continue={this.onNext}/> 
            }
            { 
              screenIndex === 6 && 
              <Step6 continue={this.onNext}/> 
            }
            { 
              screenIndex === 7 && 
              <Step7 continue={this.onNext}/> 
            }
            { 
              screenIndex === 8 && 
              <Step8 
                continue={this.onNext}
                onFacebookSignUp={this.onFacebookSignUp}
                onSkipSignUp={this.onSkipSignUp}
              /> 
            }
            </Animated.View>  
          </View>           
        )
    }

    _goBack = () => {

    }
    
}
