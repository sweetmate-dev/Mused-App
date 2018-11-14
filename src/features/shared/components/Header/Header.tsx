import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLLECTION, BROWSE, FILTER, NEWSFEED, VIDEOPLAYER, BROWSE_ONLY } from '../../routesKeys';
import * as API from '../../../../services/api';

type Props = {
    showContent?: boolean;
    navigation: any;
    filterTab: string;
    prevRoute: string;
    currentRoute: string;
    logout: () => void;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
    userProfile: () => UserProfile;
    hideContextMenu: () => void;
    resetArrayImages: () => void;
    backToFilterTabs: () => void;
    clearFilters: () => void;
    resetAlternativies: () => void;
    onPressLogo: () => void;
    goBack: () => void;
    navigate: (currentRoute: string, prevRoute: string, params?: any) => void;
    resetCollection: () => void;
}
export default class Header extends Component<Props> {

    static defaultProps = {
        showContent: true
    };
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
    }
    render() {
        const showContent = this.props.showContent;
        const { logout, navigation} = this.props;
        return (
            <View
                style={{
                    paddingTop: 20,
                    marginTop: -10,
                    height: 60, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                <View style={{ flex: 0.2 }}>
                    {navigation.state.routeName !== NEWSFEED && <View>
                        <Ripple rippleContainerBorderRadius={15 / 2} rippleSize={20} rippleCentered={true} onPress={this._goBack}>
                        <Image
                            style={{width: 13, height: 13, marginLeft: 7}}
                            source={require('../../../../../assets/images/arrow-icon.png')} />
                        </ Ripple>
                    </View>}
                </View>
                <View style={{ alignItems: 'center', flex: 0.6, justifyContent: 'center' }}>
                     <TouchableWithoutFeedback onPress={this.onPressLogo}>
                        <Image
                            style={{width: 62, height: 22 }}
                            source={require('../../../../../assets/images/logo.png')} 
                        />
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', flex: 0.2}}>
                    { showContent &&  <TouchableWithoutFeedback
                        onPress={logout}>
                        <Image
                            style={{width: 15, height: 15, marginRight: 10}}
                            source={require('../../../../../assets/images/profile-icon.png')} />
                    </TouchableWithoutFeedback> }
                    { showContent &&  <Image
                        style={{width: 15, height: 15, marginRight: 10}}
                        source={require('../../../../../assets/images/filter-icon.png')} /> }
                </View>

            </View>
        )
    }

    onPressLogo = () => {
        const { 
            onPressLogo, 
            resetArrayImages, 
        } = this.props;
        resetArrayImages();
        API.RegisterEvent("Hd-Logo", {
            actionType: "Clicked 'Mused' logo"
        })
        onPressLogo()
    }

    _goBack = () => {
        const { resetAlternativies,
                clearFilters, 
                // setPrevCurrentRoutes, 
                navigation, 
                hideContextMenu, 
                resetArrayImages, 
                filterTab, 
                backToFilterTabs,
                prevRoute,
                currentRoute,
                goBack,
                navigate,
                resetCollection
             } = this.props;
        const route: string = currentRoute;
        console.log(route + ', ' + prevRoute);
        // if (NEWSFEED === route) return true;
        if (COLLECTION === route) {
            resetArrayImages();
        }
        if (BROWSE === route) {
            if(navigation.state.params.from === 'collection'){
                navigation.state.params.onBack()
            } else if(FILTER === prevRoute){
                resetCollection()
                navigate(COLLECTION, NEWSFEED, {})
                return true;
            }
            hideContextMenu();
            clearFilters();
            resetAlternativies();
        }
        if (BROWSE_ONLY === route) {
            hideContextMenu();
            clearFilters();
            resetAlternativies();
        }
        if (VIDEOPLAYER === route) {

        }
        if (FILTER === route) {
            if (filterTab) {
                backToFilterTabs();
                return true;
            }
        }
        goBack();
        this.props.navigation.goBack();
        if (COLLECTION === route) {
            return false
        }
        return true;
    }

}

