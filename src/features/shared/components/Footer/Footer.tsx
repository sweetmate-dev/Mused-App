
import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PreShowItems from '../PreShowItem/PreShowItems.hoc';
import { COLLECTION, BROWSE, FILTER, VIDEOPLAYER } from '../../../shared';
import theme from './theme';

type Props = {
    currentRoute: string;
}
export default class Footer extends Component<Props> {
    render() {
        const { currentRoute  } = this.props;
        const footerIsVisible = currentRoute === COLLECTION || currentRoute === VIDEOPLAYER || currentRoute === BROWSE || currentRoute === FILTER;
        return (
            footerIsVisible ? this._renderFooter() : null
        )
    }

    _renderFooter = () => {
        return (
            <View style={theme.container}>
                    <PreShowItems />
            </View>
        )
    }
 }
