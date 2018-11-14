import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { Video } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// import TypeWriterText from './Typewriter'

const logoImage = require('../../../../assets/images/onboarding-welcome-logo.jpg');
const welcomeImage = require('../../../../assets/images/welcome-video-bg.jpg');
const videoSource = require('../../../../assets/videos/wink-optimised.mp4');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    width,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end'
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
    justifyContent: 'center',
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
    padding: 10,
    paddingRight: 0
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  skipButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'RalewayBold'
  },
  avatar: {
    height: 50,
    width: 50,
    resizeMode: 'stretch'
  },
  logoImage: {
    width: width * 0.7,
    height: width * 0.7 * 96 / 566,
    resizeMode: 'stretch',
    marginVertical: 40
  }
})

type Props = {
  firstName: string;
  continue: () => void;
  onFacebookSignUp: () => void;
  onSkipSignUp: () => void;
  facebookId: string;
}

export default class Step8 extends Component<Props> {
  
    onClickFacebook = () => {
      this.props.onFacebookSignUp();
    }

    onClickSkip = () => {
      this.props.onSkipSignUp();
    }

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
                      height: width * 1.5 / 3,
                      backgroundColor: '#ffffff',
                      width: width * 0.75 + 4,
                      borderColor: 'black',
                      borderWidth: 2,
                      borderRightWidth: 2,
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
                    {this.props.firstName.length > 0 ? 'Continue as ' + this.props.firstName : 'Continue with Facebook'}
                  </Text>
                </View>
                <Image source={{uri: 'https://graph.facebook.com/'+this.props.facebookId+'/picture?type=large'}} style={styles.avatar}/>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.onClickSkip()}>
              <View style={styles.skipButton}>
                  <Text style={styles.skipButtonText}>GO TO NEWSFEED</Text>                
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
    }
}
