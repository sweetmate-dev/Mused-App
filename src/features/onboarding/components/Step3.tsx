import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Video } from 'expo';
import theme from '../theme';
import TypeWriterText from './Typewriter'

const videoSource = require('../../../../assets/videos/optimised.mp4');
const headerText = 'moving pieces to help visualise the outfit';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative'
  },
  videoView: {
    marginVertical: 30,
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

type Props = {
  continue: () => void;
}
type State = {
  textLength: number,
};

export default class Step3 extends Component<Props, State> {
  
    state: State = {
      textLength: 0
    }

    componentDidMount() {

    }

    render() {
      return (
        <View style={{flex: 1}}>
          <TypeWriterText text={headerText} />
          <View style={styles.content}>
            <View style={styles.videoView}>
              <Video
                  shouldPlay={true}
                  resizeMode={Video.RESIZE_MODE_COVER}
                  source={videoSource}
                  isLooping
                  style={{
                      height: width,
                      backgroundColor: '#ffffff',
                      width: width,
                  }}
                  width={width}
                  useNativeControls={false}
                  usePoster={false}
              />
            </View>
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
