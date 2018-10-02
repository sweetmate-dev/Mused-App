import React, { Component } from 'react';
import {
  Animated,
  TouchableHighlight
} from 'react-native';

import theme from '../theme';
import SlotMachineItem from '../SlotMachineItem';
import {  makeId } from '../../../services';

type Props = {
    arrayImgs: ProductImage[];
    slotNumber: number;
    secondSlotNumber: number;
    contextMenuIsVisible: boolean;
    newImgUrl: ProductImage | null;
    isMoveProduct: boolean;
    setNewImgUrl: (newImgUrl: ProductImage) => void;
    changeArrayImages: (slotNumber: number) => void;
    showContextMenu: (slotNumber: number | string) => void;
    setSlotNumber: (slotNumber: number | string) => void;
    moveSlotLeft: () => void;
    animate: () => void;
    fadeAnim: Animated.AnimatedValue;
    setSlotMachineEffect: (flag: boolean) => void;
}
export default class BrowseItems extends Component<Props> {

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
            setNewImgUrl, 
            changeArrayImages, 
            showContextMenu, 
            contextMenuIsVisible, 
            setSlotNumber, 
            secondSlotNumber,
            setSlotMachineEffect
        } = this.props;
        return arrayImgs.map( (slotProduct: ProductImage, index: number)  => {
            if (slotProduct.id === slotNumber) {
                // let _arrayImgs: ProductImage[] = changeOrderProductsImages(arrayImgs, slotNumber);
                let _arrayImgs: ProductImage[] = [slotProduct];
                if (newImgUrl) {
                    _arrayImgs.length > 1 &&  _arrayImgs.splice(-1,1);
                    _arrayImgs.push({img: newImgUrl.img, id: makeId()});
                }
                return (
                    <SlotMachineItem 
                        arrayImgs={_arrayImgs}
                        key={index}
                        slotNumber={slotNumber}
                        newImgUrl={newImgUrl}
                        setNewImgUrl={setNewImgUrl}
                        animate={this._animate}
                        changeArrayImages={changeArrayImages}
                        fadeOpacity={this.props.fadeAnim}
                        showBorder={slotProduct.id === secondSlotNumber && contextMenuIsVisible}
                        setSlotNumber={setSlotNumber}
                        showContextMenu={() => showContextMenu(slotProduct.id)}
                        setSlotMachineEffect={setSlotMachineEffect}
                        isBrowseSlotMachine={true}
                     />
                )
            }
            return (
                <TouchableHighlight 
                    style={[theme.collectionItem, slotProduct.id === secondSlotNumber && contextMenuIsVisible ? theme.collectionOpacity : {} ]}
                    onPress={() => showContextMenu(slotProduct.id)}
                    underlayColor={'transparent'}
                    key={slotProduct.id} >
                    <Animated.Image
                        style={[theme.itemImage, {opacity: this.props.fadeAnim}]}
                        source={slotProduct.img}
                        resizeMode={'contain'}
                         />
                </TouchableHighlight>
            )
        }
           
        )};


    _animate = () => {
       this.props.animate();
    }

    _moveSlotLeft =  () =>
        this.props.moveSlotLeft();
 }