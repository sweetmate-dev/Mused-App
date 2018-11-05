import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Video } from 'expo';
import theme from '../theme';

const { width } = Dimensions.get('window');
const newfeedImage = require('../../../../assets/images/onboard/Screen1/static.jpg');
const videoSource = require('../../../../assets/videos/1st-onboarding.mp4');
type Props = {
    continue: () => void;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative'
  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 30
  },
  videoView: {
    height: width * 108 / 384,
    alignItems: 'center',
    marginTop: -100
  }
})

export default class Step0 extends Component<Props> {
  
    render() {
        return (
            <View style={theme.container}>
              <Text style={theme.headerText}>Style inspiration you<Text style={styles.italicText}> can edit</Text></Text>
              <View style={styles.content}>
                <Image source={newfeedImage} style={theme.fullWidthImage} />
              </View>
              <View style={styles.videoView}>
                <Video
                  shouldPlay={true}
                  resizeMode={Video.RESIZE_MODE_CONTAIN}
                  source={videoSource}
                  isLooping
                  style={{
                      height: width * 108 / 384,
                      backgroundColor: '#ffffff',
                      width: width / 2,
                  }}
                  useNativeControls={false}
                  usePoster={false}
                />  
              </View>
              <View style={theme.buttonButtonView}>
                <TouchableWithoutFeedback onPress={() => this.props.continue()} >
                  <View style={theme.buttonWrapper}>
                    <View style={theme.line} />
                    <Text style={theme.bottomButtonText}>CONTINUE</Text>
                    <View style={theme.line} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>             
        )
    }
}
