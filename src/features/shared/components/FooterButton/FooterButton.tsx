import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleProp
} from 'react-native';

import { VIEW, LOVE } from '../FooterButtons/buttonsKeys';
import theme from './theme';

const icons: HashMap<HashMap<string>> = {
    verificationMarkBlack: require('../../../../../assets/images/love.png'),
    loveSelected: require('../../../../../assets/images/love-selected.png'),
    verificationMarkWhite: require('../../../../../assets/images/verification-mark-white.png'),
    arrowUp: require('../../../../../assets/images/view.png'),
    filter: require('../../../../../assets/images/categories.png'),
    clear: require('../../../../../assets/images/cross-white.png'),
};

type Props = {
    text: string;
    icon: string;
    whiteTheme?: boolean;
    styleForContainer?: StyleProp<any>;
    navigate?: () => void
    newImgUrl?: ProductImage;
};
type State = {
    isSavedOutfit: boolean
}
export default class FooterButton extends Component<Props, State> {
    static defaultProps = {
        whiteTheme: true,
        styleForContainer: {}
    }
    state = {
        isSavedOutfit: false 
    }
    componentWillReceiveProps(newProps: Props) {
        if (this.props.text === LOVE && newProps.newImgUrl !== this.props.newImgUrl) {
            this.setState({isSavedOutfit: false})
        }
    }
    render() {
        const {text, icon, whiteTheme, styleForContainer }  = this.props;
        let iconSource = 
        text === LOVE && this.state.isSavedOutfit
         ? icons['loveSelected']
         : icons[icon];
        const textStyle = whiteTheme 
            ? { color: '#333' }
            : { color: '#fff', fontFamily: 'Lato'}
        const backgroundColor = whiteTheme
            ? { backgroundColor: '#fff' }
            : { backgroundColor: 'transparent'}
        const _styleForContainer = styleForContainer;
        const underlayColor: string = whiteTheme ? '#fff' : '#000';
        return (
            <TouchableHighlight style={[theme.footerButtonContainer, backgroundColor, _styleForContainer]} onPress={this._navigateToRoute} underlayColor={underlayColor}>
                <View  style={[theme.footerButtonConfirmContainer, backgroundColor]}>
                    <Image style={[theme.footerCheckImage, text === VIEW ? theme.footerViewImage : {}]} source={iconSource} />
                    <Text style={[theme.footerCheckText, textStyle]}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    _navigateToRoute = () => {
        const { navigate, text }  = this.props;
        if (!navigate) {
            return;
        }
        if (text === LOVE && this.state.isSavedOutfit) {
            return;
        }
        if (text === LOVE) {
            this.setState({isSavedOutfit: true})
        }
        navigate();
    }
 }
