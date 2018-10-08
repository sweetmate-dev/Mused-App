import React, { Component } from 'react';
import {
  Animated,
  TouchableHighlight,
  Easing
} from 'react-native';

import theme from '../theme';
import { thumbnailImage } from '../../../imagesUrls';

type Props = {
    arrayImgs: ProductImage[];
    slotNumber: number;
    secondSlotNumber: number;
    contextMenuIsVisible: boolean;
    newImgUrl: ProductImage | null;
    isMoveProduct: boolean;
    setNewImgUrl: (newImgUrl: ProductImage) => void;
    changeArrayImages: (slotNumber: number, newSlot: ProductImage) => void;
    showContextMenu: (slotNumber: number | string) => void;
    setSlotNumber: (slotNumber: number | string) => void;
    moveImageToLeft: (slotNumber: number | string) => void;
    moveSlotLeft: () => void;
    fadeAnim: Animated.AnimatedValue;
    setSlotMachineEffect: (flag: boolean) => void;
}

type State = {
    marginTop: any;
}

export default class BrowseItems extends Component<Props, State> {
    state: State = {
        marginTop: new Animated.Value(0),
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isMoveProduct) {
            this._moveSlotLeft();
        }
      }
    
    render() {
        return this._renderBrowseList();
    }


    _renderBrowseList = () => {
        const { 
            arrayImgs, 
            slotNumber, 
            newImgUrl,  
            showContextMenu, 
        } = this.props;
        const _this = this;
        return arrayImgs.map( (slotProduct: ProductImage, index: number)  => {
            if (slotProduct.id === slotNumber && newImgUrl) { 
                this.startAnimation(newImgUrl)       
                return (
                    <TouchableHighlight 
                        style={[theme.itemImageContainer ]}
                        onPress={() => showContextMenu(slotProduct.id)}
                        underlayColor={'transparent'}
                        key={index} >
                        <Animated.Image
                            style={[theme.itemImage, {marginTop: _this.state.marginTop}]}
                            source={{uri: `${thumbnailImage}${slotProduct.id}`}}
                            resizeMode={'contain'}
                        />
                    </TouchableHighlight>
                )
            }
            return (
                <TouchableHighlight 
                    style={[theme.itemImageContainer ]}
                    onPress={() => showContextMenu(slotProduct.id)}
                    underlayColor={'transparent'}
                    key={slotProduct.id} >
                    <Animated.Image
                        style={[theme.itemImage]}
                        source={{uri: `${thumbnailImage}${slotProduct.id}`}}
                        resizeMode={'contain'}
                    />
                </TouchableHighlight>
            )
        }
           
    )};

    startAnimation = (newImgUrl: any) => {
        const { slotNumber, changeArrayImages, setSlotNumber, setNewImgUrl, setSlotMachineEffect } = this.props;
        this.state.marginTop.setValue(0);
        Animated.timing(                 
            this.state.marginTop,
            {
                toValue: 300,
                duration: 200,
                easing: Easing.cubic
            }
        ).start(async () => {
            this.state.marginTop.setValue(0);
            await changeArrayImages(slotNumber, newImgUrl);
            await setSlotNumber(newImgUrl.id);
            await setNewImgUrl(null);
            setSlotMachineEffect(false);
        })
    }

    _moveSlotLeft =  () =>
        this.props.moveSlotLeft();
 }