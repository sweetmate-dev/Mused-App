import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { thumbnailImage } from '../../shared';
import { firstLetterUpper } from '../helper';
import AutoHeightImage from 'react-native-auto-height-image';
import theme from './theme';
const { width } = Dimensions.get('window');
const categoriesFilter: string[] = ['jewelry', 'belts', 'hats', 'scarves', 'gloves'];
type Props = {
    listOfProductsByCategories: Product[];
    navigateToProductSingle: (product: Product) => void;
    addOrReplaceSixthSlot: (item: HashMap<string | number>) => void;
    getProductsByCategory: (category: string) => void;
    pressOutDrag: () => void;
    toggleSlider: (flag: boolean) => void;
    isOpenSlider: boolean;
}
export default class SidebarScroll extends Component<Props> {

    componentDidMount() {
        this._onPressCategory('jewelry')
    }

    render() {
        const { listOfProductsByCategories, isOpenSlider } = this.props;
        return (
            <View style={ theme.scrolllContainer}>
                { !isOpenSlider && categoriesFilter.map(this._renderCategoryItem)}
                { isOpenSlider && <FlatList
                        data={listOfProductsByCategories}
                        renderItem={this._renderItem}
                        keyExtractor={ item => `${item.id}`}
                /> }
            </View>
        );
    }

    private _renderItem = (props: {item: Product, index: number}) => {
        return (
            <TouchableOpacity key={props.item.id} style={[theme.scrollCell,theme.scrollCellBorder]} onPress={() => this._addNewDragAndDropSlot(props.item)}>
                <AutoHeightImage  source={{uri: `${thumbnailImage}${props.item.id}`}} width={width / 4 + 20} />
                {/* <View style={theme.scrollCellDivider} /> */}
                <TouchableOpacity onPress={() => this.props.navigateToProductSingle(props.item)}>
                    <Text style={[theme.scrollCellText, {fontFamily: 'LatoBold'}]}>{props.item.brand.toUpperCase()}</Text>
                    <Text style={[theme.scrollCellText, {marginTop: 3, fontSize: 11}]}>{props.item.unbrandedName}</Text>
                </TouchableOpacity>
                <View style={theme.divLine} />
            </TouchableOpacity>
        )
    }

    private _renderCategoryItem = (item: string, index: number) => {
        return (
            <TouchableOpacity onPress={() => this._onPressCategory(item)} key={index} style={theme.categoriesFilterWrapper}>
                    <Text style={[theme.categoriesFilterText, {fontFamily: 'Lato'}]}>{firstLetterUpper(item)}</Text>
            </TouchableOpacity>
        )
    }

    private _addNewDragAndDropSlot = (item: Product) => {
        const { addOrReplaceSixthSlot, pressOutDrag } = this.props;
        pressOutDrag();
        const newProductSlot: ProductImage = {
            id: item.id,
            img: {uri: item.image}
        };
        addOrReplaceSixthSlot(newProductSlot);
    }

    private _onPressCategory = (category: string) => {
        const { toggleSlider, getProductsByCategory } = this.props;
        getProductsByCategory(category);
        toggleSlider(true);
    }

}


