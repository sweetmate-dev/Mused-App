import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';


// import FilterHeader from './FilterHeader';
// import FilterSearch from './FilterSearch';
import { selectionCount } from '../../shared';
import DesignerItem from './DesignerItem';
import FilterCategories from './FilterCategories/FilterCategories.hoc'
// import testDataDesigners from '../testDesigners';
import theme from '../theme';


type Props = {
    listOfCategory: Category[];
    filterTab: string;
    setFilterTab: (tab: string) => void;
}
export default class FilterList extends Component<Props> {
    render() {
        const { filterTab } = this.props;
        return (
            <View style={theme.container}>
                { !Boolean(filterTab) && this._renderTabs()}
                { filterTab === 'categories' && <FilterCategories />}
            </View>
        )
    }


    _changeTab = (type: string) =>
        this.props.setFilterTab(type)



    _renderDesignerItem = (props: {item: {text: string, id?: string}, index: number}) =>
        <DesignerItem index={props.index} item={props.item} />

    _renderTabs = () => {
        return (
            <View style={theme.tabNavigationWrapper}>
                    <View style={theme.tabItem}>
                        <Text style={theme.textTabHeader}>SELECT PRODUCTS</Text>
                    </View>
                    <View style={theme.tabItem}>
                        <TouchableHighlight>
                            <Text style={theme.textTabNavigation}>
                                New in
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={theme.tabItem}>
                        <TouchableHighlight style={[theme.tabFilterCategories, {marginLeft: -10}]} underlayColor={'transparent'} onPress={() => this._changeTab('categories')}>
                            <>
                            <Text style={theme.textTabNavigation}>
                                + Categories
                            </Text>
                            {this._renderSelectionCount()}
                            </>
                        </TouchableHighlight>
                    </View>

                    <View style={theme.tabItem}>
                        <TouchableHighlight>
                            <Text style={theme.textTabNavigation}>
                                Colourse
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={theme.tabItem}>
                        <TouchableHighlight>
                            <Text style={theme.textTabNavigation}>
                                Designers
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
        )
    }

    _renderSelectionCount = () => {
        const { listOfCategory } = this.props;
        return listOfCategory.length > 0
        ? <Text style={theme.selectionText}>{`${selectionCount(listOfCategory)} selected`}</Text>
        : null;
    }
}
