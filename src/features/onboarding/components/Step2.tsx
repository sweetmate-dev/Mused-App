import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import theme from '../theme';
import Ripple from 'react-native-material-ripple';
import TypeWriterText from './Typewriter'

const shirtImage = require('../../../../assets/images/collection/shirt.jpg');
const shoesImage = require('../../../../assets/images/collection/shoes.jpg');
const bagImage = require('../../../../assets/images/collection/bag.jpg');
const browseImage1 = require('../../../../assets/images/browse/browse1.png');
const browseImage2 = require('../../../../assets/images/browse/browse3.jpg');
const browseImage3 = require('../../../../assets/images/browse/browse4.png');
const browseImage4 = require('../../../../assets/images/browse/browse5.jpeg');
const arrow2GIF = require('../../../../assets/images/arrow2.gif');
const arrow3GIF = require('../../../../assets/images/arrow3.gif');
const headerText1 = '...then pick something to switch';
const headerText2 = 'Now tap the photos to create new looks!'

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerItem: {
    flex: 1, 
    justifyContent: 'space-between', 
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: 10
  },
  alterContainer: {
    flex: 0.3,
  },
  alterItem: {
    borderWidth: 1,
    borderColor: '#000',
    width: 30,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
  },
  imageContainer: {
    flex: 0.4,
  },
  clickableImageContainer: {
    flex: 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden'
  },
  itemImage: {
    width: width / 3, 
    height: 180,
  },
  preItemView: {
    height: 120,
    flexDirection: 'row',
    padding: 5,
    overflow: 'hidden'
  },
  preItemImage: {
    width: width / 6, 
    height: 100,
    padding: 5,
    marginHorizontal: 5
  },
  clickableTitle: {
    fontFamily: 'LatoBold',
    fontSize: 11,
    color: '#000',
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'center'
  },
  clickableSubTitle: {
      fontFamily: 'Lato',
      fontSize: 11,
      color: '#000',
      textAlign: 'center'
  },
  scrollView: {
    flex: 1,
  },
  collectionLine: {
    flex: 1,
    flexDirection: 'row',
  },
  gifIcon: {
    width: 25,
    height: 30,
    resizeMode: 'contain'
  },
  arrow3: {
    position: 'absolute',
    top: -10,
    left: width / 8,
    width: 25,
    height: 30,
    resizeMode: 'contain'
  }
})

type Props = {
  continue: () => void;  
}
type State = {
  textLength: number,
  fadeIn: any,
  itemMarginTop: any,
  selectedImage: any,
  GifMarginTop: any,
  step: number,
  slideCount: number
};

export default class Step2 extends Component<Props, State> {
  
    state: State = {
      textLength: 0,
      fadeIn: new Animated.Value(1),
      itemMarginTop: new Animated.Value(0),
      GifMarginTop: new Animated.Value(0),
      step: 1,
      selectedImage: shirtImage,
      slideCount: 0
    }
    
    timer: any;
    gifTimer: any;

    componentDidMount() {
      
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
      clearTimeout(this.gifTimer);
    }

    onPressClick = () => {
      if(this.state.step === 1) {
        Animated.timing(                 
          this.state.fadeIn,            
          {
              toValue: 0,                   
              duration: 1000, 
          }
        ).start();
        setTimeout(() => {
          this.setState({step: 2})
          Animated.timing(                 
            this.state.fadeIn,            
            {
                toValue: 1,                   
                duration: 500, 
            }
          ).start();
        }, 1000)
      } else {
        this.props.continue()
      }
    }

    onClickImage = (image: any) => {
      
      this.state.itemMarginTop.setValue(0)
      Animated.timing(                 
        this.state.itemMarginTop,            
        {
          toValue: 300,
          duration: 300,
          easing: Easing.cubic
        }
      ).start(() => {
        this.state.itemMarginTop.setValue(0);        
        if(this.state.slideCount === 3) this.props.continue();
        this.setState({selectedImage: image, slideCount: this.state.slideCount + 1});
      });
    }

    render() {
        return (
            <View style={theme.container}>
              <View style={styles.content}>                
                {this.state.step === 1 && this.renderStep1View()}
                {this.state.step === 2 && this.renderStep2View()}
                <View style={styles.preItemView}>
                  <Animated.Image
                      source={this.state.selectedImage}
                      resizeMode={'contain'}
                      style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                  />
                  <Image
                      source={shoesImage}
                      resizeMode={'contain'}
                      style={styles.preItemImage}
                  />
                  <Image
                      source={bagImage}
                      resizeMode={'contain'}
                      style={styles.preItemImage}
                  />
                </View>
                <View style={theme.buttonButtonView}>
                  <TouchableWithoutFeedback onPress={() => this.onPressClick()} >
                    <View style={theme.buttonWrapper}>
                      <View style={theme.line} />
                      <Text style={theme.bottomButtonText}>CONTINUE</Text>
                      <View style={theme.line} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>              
              </View>  
            </View>             
        )
    }

    renderStep1View = () => {
      return (
        <Animated.View style={[styles.content, {opacity: this.state.fadeIn}]}>
          <TypeWriterText text={headerText1} />
          <View style={styles.containerItem}>
            <TouchableWithoutFeedback onPress={() => this.onPressClick()}>
              <View style={[styles.alterContainer, {alignItems: 'center'}]}>
                <View style={styles.alterItem}>
                    <Text style={styles.countText}>10</Text>
                </View>
                <Text style={[styles.countText, {marginTop: 3}]}>alternatives</Text>
                <Animated.Image source={arrow2GIF} style={[styles.gifIcon, {marginTop: this.state.GifMarginTop}]} />
              </View>   
            </TouchableWithoutFeedback>
            <View style={styles.clickableImageContainer}>
              <Image
                  source={shirtImage}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>EMILIOPUCCI</Text>
              <Text style={styles.clickableSubTitle}>psychedelic print pleated dress</Text>
            </View>
            <View style={styles.alterContainer} />
          </View>
        </Animated.View>
      )
    }

    renderStep2View = () => {
      return (
        <Animated.View style={[styles.content, {opacity: this.state.fadeIn}]}>
          <TypeWriterText text={headerText2} />
          <ScrollView style={styles.scrollView}>
            <View style={{flexDirection: 'row'}}>
              <Ripple
                onPress={() => this.onClickImage(browseImage1)}
                rippleSize={120}
                rippleDuration={300} 
                rippleCentered={true}
                rippleContainerBorderRadius={40}>
              <View style={[styles.clickableImageContainer, {position: 'relative', width: width/2}]}>
                  <Image
                      source={browseImage1}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <Image
                    source={arrow3GIF}
                    resizeMode={'contain'}
                    style={styles.arrow3}
                  />
                  <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
                  <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
                </View>
              </Ripple>
              <Ripple
                onPress={() => this.onClickImage(browseImage2)}
                rippleSize={120}
                rippleDuration={300} 
                rippleCentered={true}
                rippleContainerBorderRadius={40}>
              <View style={[styles.clickableImageContainer, {width: width/2}]}>
                  <Image
                      source={browseImage2}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <Text style={styles.clickableTitle}>RICK OWENS</Text>
                  <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>
                </View>
              </Ripple>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Ripple
                  onPress={() => this.onClickImage(browseImage3)}
                  rippleSize={120}
                  rippleDuration={300} 
                  rippleCentered={true}
                  rippleContainerBorderRadius={40}>
                <View style={[styles.clickableImageContainer, {width: width/2}]}>
                  <Image
                      source={browseImage3}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
                  <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
                </View>
              </Ripple>
              <Ripple
                  onPress={() => this.onClickImage(browseImage4)}
                  rippleSize={120}
                  rippleDuration={300} 
                  rippleCentered={true}
                  rippleContainerBorderRadius={40}>
                <View style={[styles.clickableImageContainer, {width: width/2}]}>
                  <Image
                      source={browseImage4}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <Text style={styles.clickableTitle}>RICK OWENS</Text>
                  <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>
                </View>
              </Ripple>
            </View>
          </ScrollView>
        </Animated.View>
      )
    }
}