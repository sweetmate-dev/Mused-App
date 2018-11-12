import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'
import * as API from '../../../services/api';

const { width } = Dimensions.get('window');
const dressImage = require('../../../../assets/images/browse/browse3.jpg');
const emptyImage = require('../../../../assets/images/empty.jpg');
const ShoesImage1 = require('../../../../assets/images/collection/shoes.jpg');
const ShoesImage2 = require('../../../../assets/images/collection/shoes1.jpg');
const ShoesImage3 = require('../../../../assets/images/collection/shoes2.jpg');
const ShoesImage4 = require('../../../../assets/images/collection/shoes3.jpg');
const BagImage1 = require('../../../../assets/images/collection/bag.jpg');
const BagImage2 = require('../../../../assets/images/collection/bag1.jpg');
const BagImage3 = require('../../../../assets/images/collection/bag2.jpeg');
const BagImage4 = require('../../../../assets/images/collection/bag3.jpeg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative'
  },
  clickableImageContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden'
  },
  itemImage: {
    width: width / 3, 
    height: width / 3,
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
    marginTop: -30
  },
  preItemView: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    overflow: 'hidden'
  },
  preItemImage: {
    width: width / 6, 
    height: 100,
    marginHorizontal: 4
  },
})

type Props = {
  continue: () => void;
}
type State = {
  step: number,
  selectedImage: any,
  selectedShoes: any,
  itemMarginTop: any,
  opacity: any
};

export default class Step7 extends Component<Props, State> {
  state: State = {
    step: 1,
    selectedImage: emptyImage,
    selectedShoes: emptyImage,
    itemMarginTop: new Animated.Value(0),
    opacity: new Animated.Value(1)
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
      this.setState({selectedImage: image});
    });
  }

  onClickContinue = () => {
    if(this.state.step === 1) {
      Animated.timing(                 
        this.state.opacity,            
        {
            toValue: 0,                   
            duration: 500, 
        }
      ).start(() => {
        this.state.opacity.setValue(1)
        this.setState({
          step: 2, 
          selectedShoes: this.state.selectedImage,
          selectedImage: emptyImage,
        })
        API.RegisterEvent('On-MatchBag', {userType: 'View screen'});
      }); 
      
    } else {
      this.props.continue()
    }
  }

  render() {
    const { step } = this.state;
      return (
          <View style={styles.container}>
            <TypeWriterText text={step === 1 ? ['now match the shoes', ''] : ['...and a bag', '']} />
            {
              step === 1 ?
              this.renderShoesScrollView()
              :this.renderBagScrollView()
            }            
            <View style={styles.preItemView}>
              <Image
                  source={dressImage}
                  resizeMode={'contain'}
                  style={styles.preItemImage}
              />
              {
                step === 1 ?
                <Animated.Image
                  source={this.state.selectedImage}
                  resizeMode={'contain'}
                  style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                />  
                :
                <Image
                  source={this.state.selectedShoes}
                  resizeMode={'contain'}
                  style={styles.preItemImage}
                />
              }
              {
                step === 2 &&
                <Animated.Image
                  source={this.state.selectedImage}
                  resizeMode={'contain'}
                  style={[styles.preItemImage, {marginTop: this.state.itemMarginTop}]}
                />  
              }                          
            </View>
            <View style={theme.buttonButtonView}>
              <TouchableWithoutFeedback onPress={() => this.onClickContinue()} >
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

  renderShoesScrollView = () => {
    return (
      <Animated.ScrollView style={[styles.scrollView, {opacity: this.state.opacity}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage1)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={ShoesImage1}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>JIMMY CHOO</Text>
              <Text style={styles.clickableSubTitle}>Romy 100 pumps</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage2)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={ShoesImage2}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>JIMMY CHOO</Text>
              <Text style={styles.clickableSubTitle}>Shar 85 sandal booties</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage3)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={ShoesImage3}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
              <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(ShoesImage4)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={ShoesImage4}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>RICK OWENS</Text>
              <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.ScrollView>
    )
  }

  renderBagScrollView = () => {
    return (
      <Animated.ScrollView style={[styles.scrollView, {opacity: this.state.opacity}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(BagImage1)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={BagImage1}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>MICHAEL MICHAEL KORS</Text>
              <Text style={styles.clickableSubTitle}>Saddle crossbody bag</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(BagImage2)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={BagImage2}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>MOSCHINO</Text>
              <Text style={styles.clickableSubTitle}>Toy Bear wallet</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(BagImage3)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={BagImage3}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
              <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onClickImage(BagImage4)}>
            <View style={[styles.clickableImageContainer, {width: width/2}]}>
              <Image
                  source={BagImage4}
                  resizeMode={'contain'}
                  style={styles.itemImage}
              />
              <Text style={styles.clickableTitle}>RICK OWENS</Text>
              <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.ScrollView>
    )
  }
}
