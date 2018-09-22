import React, { Component } from 'react';
import {
  Text,
  View,
  StyleProp,
} from 'react-native';

import theme from './theme';

type Props = {
    text: string;
    themeType: string;
    style: StyleProp<any>;
}
export default class Button extends Component<Props> {
    render() {
        const { text, themeType, style } = this.props;
        const themeStyle = themeType === 'light' ? 'buttonContainerLight' : 'buttonContainerDark';
        const textStyle = themeType === 'light' ? 'buttonTextLight' : 'buttonTextDark';
        return (
            <View style={[theme.buttonContainer, theme[themeStyle], style]}>
                <Text style={[theme.buttonText, theme[textStyle]]}>{text.toUpperCase()}</Text>
            </View>
        )
    }
 }
