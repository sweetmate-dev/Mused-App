import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'
const templateImage = require('../../../../assets/images/onboard/Screen2/template.jpg');
const fadeImage = require('../../../../assets/images/onboard/Screen2/photo.jpg');

type Props = {
    continue: () => void;
}
type State = {
  fadeIn: any,
  textLength: number,
};

const {width} = Dimensions.get('window');
const headerText = 'Just tap to see the pieces used in a look';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  imageWrapper: {
    width: width,
    height: width * 1017 / 788 * 0.85,
    position: 'relative'
  },
  templateImage: {
    width: width,
    height: width * 1017 / 788,
    resizeMode: 'stretch'
  },
  fadeImageWrapper: {
    position: 'absolute',
    width: width * 536 / 788,
    height: width * 650 / 788,
    top: width * 148 / 788,
    left: width * 205 / 788
  },
  fadeImage: {
    width: width * 536 / 788,
    height: width * 650 / 788,
  }
})

export default class Step1 extends Component<Props, State> {
  
    state: State = {
      fadeIn: new Animated.Value(1),
      textLength: 0
    }
    
    timer: any;
    mounted: boolean;

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    startPhotoAnimation = () => {
      Animated.timing(                 
        this.state.fadeIn,            
        {
            toValue: 0,                   
            duration: 900, 
            useNativeDriver: true             
        }
      ).start(); 
      setTimeout(() => {
        Animated.timing(                 
          this.state.fadeIn,            
          {
              toValue: 1,                   
              duration: 500, 
              useNativeDriver: true             
          }
        ).start(() => {
          this.mounted && this.startPhotoAnimation()
        }); 
      }, 900)   
    }

    render() {
        return (
            <View style={theme.container}>
              <View style={styles.content}>
                <TypeWriterText text={headerText} onEndEffect={() => this.startPhotoAnimation()} />
                <View style={styles.imageWrapper}>
                  <Image source={templateImage} style={styles.templateImage} />
                  <TouchableOpacity style={styles.fadeImageWrapper} onPress={() => this.props.continue()}>
                    <Animated.Image source={fadeImage} style={[styles.fadeImage, {opacity: this.state.fadeIn}]} />
                  </TouchableOpacity>
                </View>                
              </View>  
            </View>             
        )
    }
}
