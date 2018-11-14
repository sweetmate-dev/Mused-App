import React, { Component } from 'react';
import {
  View,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import theme from '../../zoom/theme';

const productImage = require('../../../../assets/images/onboarding-zoom.jpg');
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
    alignItems: 'center',
    width: width - 20,
    height: (width - 20) * 900 / 675,
    marginTop: Platform.OS === 'ios' ? 20 : 5,
    resizeMode: 'cover'
  },
  buttonsContainer: {
      backgroundColor: 'black',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
  },
  infoView: {
    paddingHorizontal: 20,
    paddingVertical: 10,    
  },
  arrowIcon: {
      position: 'absolute',
      bottom: 70,
      left: width * 0.4,
      width: 50,
      height: 50,
      resizeMode: 'contain'
  },
  descContainer: {
    paddingHorizontal: 30,
    paddingBottom: 60,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  markView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.85
  }
})

type Props = {
  continue: () => void;
}

export default class Step5 extends Component<Props> {

    render() {
      return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.content}>                
                <Image source={productImage} style={styles.productImage} />
                </View>
                <View style={[theme.infoView, styles.infoView]}>
                    <View style={theme.brandView}>
                        <Text style={theme.brandText}>MARNI</Text>
                        <Text style={theme.unbrandText}>Gathered T-shirt</Text>
                    </View>
                    <View style={theme.priceView}>
                        <Text style={theme.priceText}>£620</Text>
                    </View>                
                </View>
                <View style={styles.descContainer}>
                    <Text style={theme.descText}>
                        Having honed his creative eye at a number of high-profile fashion houses
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.markView} />
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
