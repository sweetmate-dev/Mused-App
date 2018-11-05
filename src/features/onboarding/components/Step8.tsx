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
import TypeWriterText from './Typewriter'

const welcomeImage = require('../../../../assets/images/welcome-video-bg.jpg');
const videoSource = require('../../../../assets/videos/wink-optimised.mp4');
const headerText = '...so welcome to Mused!';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  videoView: {
    marginVertical: 30,
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    height: height - 340,
    width: (height - 340) * 476 / 623,
    resizeMode: 'contain'
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
  skipButton: {
    borderWidth: 1,
    borderColor: 'black',
    width: width * 0.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  skipButtonText: {
    fontSize: 16,
    color: 'black'
  }
})

type Props = {
  continue: () => void;
  onFacebookSignUp: () => void;
  onSkipSignUp: () => void
}
type State = {
  textLength: number,
};

export default class Step8 extends Component<Props, State> {
  
    state: State = {
      textLength: 0
    }

    componentDidMount() {

    }

    onClickFacebook = () => {
      this.props.onFacebookSignUp();
    }

    onClickSkip = () => {
      this.props.onSkipSignUp();
    }

    render() {
      return (
        <View style={styles.container}>
          <TypeWriterText text={headerText} />
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
                  <Text style={styles.facebookText}>CONNECT WITH FACEBOOK</Text>
                </View>                
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.onClickSkip()}>
              <View style={styles.skipButton}>
                  <Text style={styles.skipButtonText}>or... continue to newsfeed</Text>                
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
    }
}
