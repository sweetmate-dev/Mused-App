
import React, { Component } from 'react';
import {
  Animated
} from 'react-native';
import FooterButton from '../FooterButton/FooterButton';
import { COLLECTION, BROWSE, FILTER } from '../../routesKeys';
import theme from './theme';
import { footerButtons, footerDarkButtons, LOVE, CATEGORIES, APPLY, CANCEL, CLEAR } from './buttonsKeys';
type Props = {
    navigateToFilter: () => void;
    navigateToBrowse: () => void;
    clearFilterAndGoToBrowse: () => void;
    clearFilter: () => void;
    applyFilter: () => void;
    createNewOutfit: () => void;
    currentRoute: string;
    newImgUrl: ProductImage;
}


export default class Footer extends Component<Props> {
   state = { 
       fadeIn: new Animated.Value(0) 
    }
    componentDidMount() {
        this._fadeIn();
    }
    componentWillReceiveProps(nextProps: Props) {
        const { currentRoute } = this.props; 
        if ((currentRoute === COLLECTION && nextProps.currentRoute === BROWSE)
        || (currentRoute === BROWSE && nextProps.currentRoute === COLLECTION)
        || (currentRoute === BROWSE && nextProps.currentRoute === FILTER)
        || (currentRoute === FILTER && nextProps.currentRoute === BROWSE)){
            this._fadeIn();
        }
    }
    render() {
        return this._renderFooter();
    }

    _renderFooter = () => {
        const { currentRoute  } = this.props;
        let buttons: HashMap<string>[] = [];
        if (currentRoute === COLLECTION) {
            buttons = [...footerButtons.filter((button: HashMap<string>) => button.text === LOVE)]
        }
        if (currentRoute === BROWSE) {
            buttons = [...footerButtons]
        }
        return (
            <Animated.View 
                style={[
                    theme.container,
                    currentRoute === FILTER ? {backgroundColor: '#000'} : {},
                    {opacity: this.state.fadeIn}]}>
                 { currentRoute === FILTER ?  this._renderDarkFooterButtons(footerDarkButtons) : this._renderWhiteFooterButtons(buttons)}
            </Animated.View>
        )
    }
    _renderWhiteFooterButtons = (buttons: HashMap<string>[]) => {
       return  buttons.map( (button: HashMap<string>) => {
           const actions: HashMap<() => void> = {
            [LOVE]: this.props.createNewOutfit,
            [CATEGORIES]:  this._navigateToFilter,
        }
            return (
                <FooterButton
                        text={button.text}
                        icon={button.icon}
                        navigate={actions[button.text]}
                        key={button.text}
                        newImgUrl={this.props.newImgUrl}
                        />
            )
       })
    }

    _renderDarkFooterButtons = (buttons: HashMap<string>[]) => {
        return  buttons.map( (button: HashMap<string>) => {
            const actions: HashMap<() => void> = {
                [APPLY]: this.props.applyFilter,
                [CLEAR]: this.props.clearFilter,
                [CANCEL]: this.props.clearFilterAndGoToBrowse
            }
             return (
                 <FooterButton
                         text={button.text}
                         icon={button.icon}
                         whiteTheme={false}
                         key={button.text}
                         styleForContainer={button.styleForContainer}
                         navigate={actions[button.text]}
                         />
             )
        })
     }
    

    _navigateToFilter = () => {
        this.props.navigateToFilter();
    }
    _navigateToBrowse = () => {
        this.props.navigateToBrowse();
    }
    _fadeIn = () => {
        this.state.fadeIn.setValue(0)
        Animated.timing(                  
           this.state.fadeIn,            
           {
             toValue: 1,                   
             duration: 400, 
             useNativeDriver: true             
           }
        ).start();                        
      }
 }
