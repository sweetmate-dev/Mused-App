import React, { Component } from 'react';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import theme from '../../zoom/theme';
import TypeWriterText from './Typewriter'

const productImage = require('../../../../assets/images/newsfeed/newsfeed1.jpg');
const buttonLogo = require('../../../../assets/images/button-logo.png');
const arrow4GIF = require('../../../../assets/images/Arrow_DOWN.gif');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
      flex: 1,
      alignItems: 'center',
      position: 'relative'
  },
  markTextView: {
      padding: 30,
      backgroundColor: 'white',
      position: 'absolute',
      left: 0,
      width,
      top: 120
  },
  markText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'gray'
  },
  productImage: {
      width: width - 20,
      flex: 1,
      resizeMode: 'cover',
      marginTop: Platform.OS === 'ios' ? 20 : 5,
  },
  buttonsContainer: {
      backgroundColor: 'black',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      height: 60,
  },
  infoView: {
    opacity: 0.1,
    paddingHorizontal: 20,
    paddingVertical: 10,    
  },
  arrowIcon: {
      position: 'absolute',
      bottom: 90,
      left: width * 0.35,
      width: 35,
      height: 35,
      resizeMode: 'contain'
  }
})

type Props = {
  continue: () => void;
}

export default class Step5 extends Component<Props> {

    render() {
      return (
        <View style={styles.container}>
            <View style={styles.content}>                
              <Image source={productImage} style={styles.productImage} />
              <View style={styles.markTextView}>
                <TypeWriterText text={['...you can style any', 'piece you like']} />
              </View>
            </View>
            <View style={[theme.infoView, styles.infoView]}>
                <View style={theme.brandView}>
                    <Text style={theme.brandText}>STELLA MCCARTNEY</Text>
                    <Text style={theme.unbrandText}>ASOS 4505 Tralning </Text>
                </View>
                <View style={theme.priceView}>
                    <Text style={theme.priceText}>£540</Text>
                </View>                
            </View>
            <Image source={arrow4GIF} style={styles.arrowIcon} />
            <Ripple
                style={styles.buttonsContainer}
                rippleSize={240} 
                rippleColor='#FFFFFF'
                rippleCentered={true} 
                rippleDuration={1000}
                onPress={() => this.props.continue()}
            >
              <Image source={buttonLogo} style={theme.buttonLogo} />
              <Text style={theme.buttonText}>STYLE IT</Text>              
            </Ripple> 
          </View>
      )
    }
}
