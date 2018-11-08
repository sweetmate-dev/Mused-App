import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import theme from '../theme';
import TypeWriterText from './Typewriter'

const shirtImage = require('../../../../assets/images/collection/shirt.jpg');
const shoesImage = require('../../../../assets/images/collection/shoes.jpg');
const bagImage = require('../../../../assets/images/collection/bag.jpg');
const browseImage1 = require('../../../../assets/images/browse/browse1.png');
const browseImage2 = require('../../../../assets/images/browse/browse3.jpg');
const browseImage3 = require('../../../../assets/images/browse/browse4.png');
const browseImage4 = require('../../../../assets/images/browse/browse5.jpeg');
const arrow4GIF = require('../../../../assets/images/arrow4.gif');

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative'
  },
  scrollView: {
    flex: 1,
  },
  clickableImageContainer: {
    flex: 1, 
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    overflow: 'hidden'
  },
  itemImage: {
    width: width / 3, 
    height: 180,
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
  imageView: {
    width: width / 3, 
    height: 180,
    position: 'relative'
  },
  touchableView: {
    alignItems: 'center',
  },
  gifIcon: {
    position: 'absolute',
    bottom: -12,
    left: -30,
    width: 60,
    height: 50,
    resizeMode: 'contain',
  }
})

type Props = {
  continue: () => void;
}

export default class Step4 extends Component<Props> {

    render() {
      return (
        <View style={{flex: 1}}>
        <TypeWriterText text={['for details on a product', 'just tap it‘s name']} />
        <View style={styles.content}>
          <ScrollView style={styles.scrollView} scrollEnabled={false}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.clickableImageContainer}>
                <View style={styles.imageView}>
                  <Image
                      source={browseImage1}
                      resizeMode={'contain'}
                      style={styles.itemImage}
                  />
                  <Image source={arrow4GIF} style={styles.gifIcon} />
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.continue()}>
                  <View style={styles.touchableView}>
                    <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
                    <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
                    
                  </View>
                </TouchableWithoutFeedback>                
              </View>
              <View style={styles.clickableImageContainer}>
                <Image
                    source={browseImage2}
                    resizeMode={'contain'}
                    style={styles.itemImage}
                />
                <Text style={styles.clickableTitle}>DOLCE & GABBANA</Text>
                <Text style={styles.clickableSubTitle}>Floral embroidered lace midi dress</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.clickableImageContainer}>
                <Image
                    source={browseImage3}
                    resizeMode={'contain'}
                    style={styles.itemImage}
                />
                <Text style={styles.clickableTitle}>RICK OWENS</Text>
                <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>            
              </View>
              <View style={styles.clickableImageContainer}>
                <Image
                    source={browseImage4}
                    resizeMode={'contain'}
                    style={styles.itemImage}
                />
                <Text style={styles.clickableTitle}>RICK OWENS</Text>
                <Text style={styles.clickableSubTitle}>sleeveless long dress</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.preItemView}>
            <Image
                source={shirtImage}
                resizeMode={'contain'}
                style={styles.preItemImage}
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
