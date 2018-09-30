
import React, { Component } from 'react';
import {
  Animated
} from 'react-native';
import FooterButton from '../FooterButton/FooterButton';
import { COLLECTION, BROWSE, FILTER, VIEW as VIEW_SCREEN } from '../../routesKeys';
import theme from './theme';
import { footerButtons, footerDarkButtons, dragAndDropButtons, LOVE, CATEGORIES, APPLY, CANCEL, CLEAR, VIEW, BACK } from './buttonsKeys';
type Props = {
    navigateToFilter: () => void;
    navigateToBrowse: () => void;
    navigateToView: () => void;
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
        || (currentRoute === FILTER && nextProps.currentRoute === BROWSE)
        || (currentRoute === BROWSE && nextProps.currentRoute === VIEW_SCREEN)
        || (currentRoute === VIEW_SCREEN && nextProps.currentRoute === BROWSE)){
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
        if (currentRoute === VIEW_SCREEN) {
            buttons = [...dragAndDropButtons]
        }
        return (
            <Animated.View 
                style={[
                    theme.container,
                    currentRoute === FILTER ? {backgroundColor: '#000'} : {},
                    currentRoute === VIEW_SCREEN ? {backgroundColor: '#dfdede'} : {},
                    {opacity: this.state.fadeIn}]}>
                 { currentRoute === FILTER && this._renderDarkFooterButtons() }
                 { (currentRoute === COLLECTION || currentRoute === BROWSE ) && this._renderWhiteFooterButtons(buttons) }
                 { currentRoute === VIEW_SCREEN && this._renderDragAndDropButtons() }
            </Animated.View>
        )
    }
    _renderWhiteFooterButtons = (buttons: HashMap<string>[]) => {
       return  buttons.map( (button: HashMap<string>) => {
           const actions: HashMap<() => void> = {
            [LOVE]: this.props.createNewOutfit,
            [VIEW]: this.props.navigateToView,
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

    _renderDarkFooterButtons = () => {
        return  footerDarkButtons.map( (button: HashMap<string>) => {
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

     _renderDragAndDropButtons = () => {
        return  dragAndDropButtons.map( (button: HashMap<string>) => {
            const actions: HashMap<() => void> = {
             [APPLY]: this.props.applyFilter,
             [BACK]: this.props.navigateToBrowse,
         }
             return (
                 <FooterButton
                         text={button.text}
                         icon={button.icon}
                         greyTheme={true}
                         navigate={actions[button.text]}
                         key={button.text}
                         newImgUrl={this.props.newImgUrl}
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
