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
import theme from '../theme';
// import TypeWriterText from './Typewriter'

const videoSource = require('../../../../assets/videos/Move.mp4');
const logoImage = require('../../../../assets/images/onboarding-3-logo.jpg');
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative'
  },
  videoView: {
    marginVertical: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: width * 0.8,
    height: width * 0.8 * 296 / 804,
    resizeMode: 'stretch',
    marginLeft: width * 0.1
  },
})

type Props = {
  continue: () => void;
}

export default class Step3 extends Component<Props> {

    render() {
      return (
        <View style={{flex: 1}}>
          {/* <TypeWriterText text={["The 'view' screen helps you", 'visualise your look‘ IMAGE']} /> */}
          <Image source={logoImage} style={styles.logoImage} />     
          <View style={styles.content}>
            <View style={styles.videoView}>
              <Video
                  shouldPlay={true}
                  resizeMode={Video.RESIZE_MODE_CONTAIN}
                  source={videoSource}
                  isLooping
                  style={{
                      height: width,
                      backgroundColor: '#ffffff',
                      width: width * 448 / 554,
                      borderWidth: 4,
                      borderColor: 'white'
                  }}
                  useNativeControls={false}
                  usePoster={false}
              />
            </View>
          </View>
          <View style={theme.buttonButtonView}>
            <TouchableWithoutFeedback onPress={() => this.props.continue()} >
              <View style={theme.buttonWrapper}>
                <Text style={theme.bottomButtonText}>----------- CONTINUE ------------</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
    }
}
