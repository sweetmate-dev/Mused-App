import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { thumbnailImage } from '../../shared';
const { width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',    
    padding: 15,    
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listItemWrapper: {
    width: (width - 50) / 2,
    height: (width - 50) / 2,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  listItem: {
    width: (width - 50) / 2,
    height: (width - 50) / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'cover',
    width: width / 3,
    height: width / 3,
  },
  headerView: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    flex: 1
  },
  title: {
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'Raleway',
    letterSpacing: 2,
    lineHeight: 20,
    fontSize: 14,
  },
  separator: { 
    width: width, 
    height: 30, 
    backgroundColor: '#fafafa',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  buttonView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5
  },
  buttonText: {
    fontFamily: 'RalewayBold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 2
  }
})

type Props = {
  products: Product[];
  onClickProduct: (product: Product) => void;
  onClickViewAll: () => void;
};

export default class NewProductList extends Component<Props> {

    render() {
      const { products } = this.props;
      return (
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={styles.line} />
            <Text style={styles.title}>NEW IN</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.listView}>
          {
            products.map((post: Product, index) => {
              return(
                <Ripple
                  key={index}
                  style={styles.listItemWrapper}
                  onPress={() => this.props.onClickProduct(post)}
                  rippleColor={'rgb(255, 255, 255)'}
                  rippleDuration={300}
                  rippleCentered={true}
                  rippleContainerBorderRadius={width}>
                  <View style={styles.listItem}>
                    <Image
                        source={{uri: `${thumbnailImage}${post.id}`}}
                        style={styles.image}
                        resizeMode={'contain'}
                    />  
                  </View>
                </Ripple>
              )
            })
          }
          </View>
          <Ripple
              style={styles.buttonView}
              rippleSize={240} 
              rippleColor='#FFFFFF'
              rippleCentered={true} 
              rippleDuration={1000}
              onPress={() => this.props.onClickViewAll()}
          >
              <Text style={styles.buttonText}>VIEW ALL</Text>   
          </Ripple> 
        </View>
      )
    }
 }
