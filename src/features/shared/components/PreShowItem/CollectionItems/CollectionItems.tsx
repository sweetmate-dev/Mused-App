import React, { Component } from 'react';
import {
  Image,
} from 'react-native';

import theme from '../theme';

type Props = {
    arrayImgs: ProductImage[];
}
export default class CollectionItems extends Component<Props> {

    render() {
        return this._renderCollectionList()
    }

    _renderCollectionList = () => {
        const style =  { 
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
        }
        return this.props.arrayImgs.map( (imgUrl, index) => {
            return (
                  <Image
                    style={[theme.itemImage, style, {marginHorizontal: 4}]}
                    source={imgUrl.img}
                    key={index} 
                    resizeMode={'contain'}/>
            );
        }
        )}

 }