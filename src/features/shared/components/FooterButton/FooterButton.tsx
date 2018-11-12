import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleProp
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { LOVE } from '../FooterButtons/buttonsKeys';
import theme from './theme';

const icons: HashMap<HashMap<string>> = {
    verificationMarkBlack: require('../../../../../assets/images/verification-mark.png'),
    love: require('../../../../../assets/images/love.png'),
    loveSelected: require('../../../../../assets/images/love-selected.png'),
    verificationMarkWhite: require('../../../../../assets/images/verification-mark-white.png'),
    arrowUp: require('../../../../../assets/images/view.png'),
    filter: require('../../../../../assets/images/categories.png'),
    clear: require('../../../../../assets/images/cross-white.png'),
    details: require('../../../../../assets/images/details.png'),
    back: require('../../../../../assets/images/back_icon.png'),
    view: require('../../../../../assets/images/view_icon.png'),
    category: require('../../../../../assets/images/category_icon.png'),
    apply: require('../../../../../assets/images/apply.png'),
    cancel: require('../../../../../assets/images/cancel.png'),
};

type Props = {
    text: string;
    icon: string;
    whiteTheme?: boolean;
    greyTheme?: boolean;
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
        greyTheme: false,
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
        const {text, icon, whiteTheme, greyTheme, styleForContainer }  = this.props;
        let iconSource = 
        text === LOVE && this.state.isSavedOutfit
         ? icons['loveSelected']
         : icons[icon];
        const textStyle = whiteTheme 
            ? { color: '#333' }
            : { color: '#000', fontFamily: 'QuickSandRegular'}
        const backgroundColor = whiteTheme
            ? { backgroundColor: '#fff' }
            : { backgroundColor: 'transparent'}
        const backgroundColorGrey = greyTheme ? { backgroundColor: '#dfdede'} : {}
        const _styleForContainer = styleForContainer;
        // const underlayColor: string = whiteTheme ? '#fff' : '#000';
        return (
            <Ripple
                style={[theme.footerButtonContainer, backgroundColor, backgroundColorGrey, _styleForContainer]}
                onPress={this._navigateToRoute}
                rippleSize={40}
                rippleDuration={300} 
                rippleContainerBorderRadius={40}>
                <View  style={[theme.footerButtonConfirmContainer, backgroundColor, backgroundColorGrey]}>
                    <Image style={[theme.footerCheckImage]} source={iconSource} />
                    <Text style={[theme.footerCheckText, textStyle]}>{text}</Text>
                </View>
            </Ripple>
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
