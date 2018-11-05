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

const productImage = require('../../../../assets/images/newsfeed/newsfeed1.jpg');
const buttonLogo = require('../../../../assets/images/button-logo.png');
const arrow4GIF = require('../../../../assets/images/arrow4.gif');

const {width} = Dimensions.get('window');

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
  matchButtonWrapper: {
      width: width * 0.65,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'black',
      height: 50,
  },
  matchLine: {
      marginHorizontal: 20,
      height: 1,
      backgroundColor: 'white',
      flex: 1,
  },
  matchButtonText: {
      color: 'white',
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
    opacity: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 10,    
  },
  arrowIcon: {
      position: 'absolute',
      bottom: 85,
      left: width * 0.35,
      width: 35,
      height: 35,
      resizeMode: 'contain'
  }
})

type Props = {
  continue: () => void;
}
type State = {
  textLength: number,
};

export default class Step5 extends Component<Props, State> {
  
    state: State = {
      textLength: 0
    }

    componentDidMount() {

    }

    render() {
      return (
        <View style={styles.container}>
            <View style={styles.content}>                
              <Image source={productImage} style={styles.productImage} />
              <View style={styles.markTextView}>
                <Text style={styles.markText}>
                  ...you can style any piece you like
                </Text>
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