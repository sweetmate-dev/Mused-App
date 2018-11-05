import React, { Component } from 'react';
import {
  Animated,
  TouchableHighlight,
  Easing
} from 'react-native';
import theme from '../theme';
import { thumbnailImage } from '../../../imagesUrls';

const blankImage = require('../../../../../../assets/images/empty.jpg')

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
    hideContextMenu: () => void;
    setSlotNumber: (slotNumber: number | string) => void;
    moveImageToLeft: (slotNumber: number | string) => void;
    moveSlotLeft: () => void;
    fadeAnim: Animated.AnimatedValue;
    setSlotMachineEffect: (flag: boolean) => void;
}

type State = {
    marginTop: any;
    selectedID: number;
}

export default class BrowseItems extends Component<Props, State> {
    state: State = {
        marginTop: new Animated.Value(0),
        selectedID: 999,
    };

    isOnAnimate: boolean = false;

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
            contextMenuIsVisible
        } = this.props;
        const _this = this;
        return arrayImgs.map( (slotProduct: ProductImage, index: number)  => {
            const opacity = (contextMenuIsVisible && this.state.selectedID === slotProduct.id) ? 0.5 : 1;
            // if(slotProduct.id === -1 && newImgUrl) {
            //     if(this.isOnAnimate) return false;
            //     this.startAnimation(newImgUrl)       
            //     return (
            //         <TouchableHighlight
            //             style={[theme.itemImageContainer, {opacity}]}
            //             onPress={() => this.showContextMenu(slotProduct.id)}
            //             underlayColor={'transparent'}
            //             key={index} >
            //             <Animated.Image
            //                 style={[theme.itemImage, {marginTop: _this.state.marginTop}]}
            //                 source={blankImage}
            //                 resizeMode={'contain'}
            //             />
            //         </TouchableHighlight>
            //     )
            // }
            if (slotProduct.id === slotNumber && newImgUrl) { 
                if(this.isOnAnimate) return false;
                this.startAnimation(newImgUrl)       
                return (
                    <TouchableHighlight 
                        style={[theme.itemImageContainer, {opacity}]}
                        onPress={() => this.showContextMenu(slotProduct.id)}
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
                    style={[theme.itemImageContainer, {opacity} ]}
                    onPress={() => this.showContextMenu(slotProduct.id)}
                    underlayColor={'transparent'}
                    key={slotProduct.id} >
                    <Animated.Image
                        style={[theme.itemImage]}
                        source={slotProduct.id === -1 ? blankImage : {uri: `${thumbnailImage}${slotProduct.id}`}}
                        resizeMode={'contain'}
                    />
                </TouchableHighlight>
            )
        }
           
    )};

    showContextMenu = (productID: any) => {
        const { showContextMenu, hideContextMenu, contextMenuIsVisible } = this.props;
        if(contextMenuIsVisible){
            this.setState({selectedID: productID})
            hideContextMenu()
        } else {
            this.setState({selectedID: productID})
            showContextMenu(productID)
        }
        
    }

    startAnimation = (newImgUrl: any) => {
        const { slotNumber, changeArrayImages, setSlotNumber, setNewImgUrl, setSlotMachineEffect } = this.props;
        this.state.marginTop.setValue(0);
        this.isOnAnimate = true;
        Animated.timing(                 
            this.state.marginTop,
            {
                toValue: 300,
                duration: 300,
                easing: Easing.cubic
            }
        ).start()
        setTimeout(async () => {
            this.state.marginTop.setValue(0);
            await changeArrayImages(slotNumber, newImgUrl);
            await setSlotNumber(newImgUrl.id);
            await setNewImgUrl(null);
            setSlotMachineEffect(false);
            this.isOnAnimate = false;
        }, 300)
    }

    _moveSlotLeft =  () =>
        this.props.moveSlotLeft();
 }