import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLLECTION, BROWSE, FILTER, NEWSFEED, ZOOM, VIEW } from '../../routesKeys';
type Props = {
    showContent?: boolean;
    navigation: any;
    filterTab: string;
    prevRoute: string;
    logout: () => void;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
    userProfile: () => UserProfile;
    hideContextMenu: () => void;
    resetArrayImages: () => void;
    backToFilterTabs: () => void;
    clearFilters: () => void;
    resetAlternativies: () => void;
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
                    marginTop: 20,
                    backgroundColor: '#fff',
                    height: 70, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                <View style={{ flex: 0.2 }}>
                    {navigation.state.routeName !== NEWSFEED && <View  style={{width: 20}}>
                        <Ripple rippleContainerBorderRadius={15 / 2} rippleSize={20} rippleCentered={true} onPress={this._goBack}>
                        <Image
                            style={{width: 15, height: 15}}
                            source={require('../../../../../assets/images/arrow-icon.png')} />
                        </ Ripple>
                    </View>}
                </View>
                <View style={{ alignItems: 'center', flex: 0.6, justifyContent: 'center' }}>
                     <Image
                        style={{width: 62, height: 22 }}
                        source={require('../../../../../assets/images/logo.png')} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', flex: 0.2}}>
                    { showContent &&  <TouchableWithoutFeedback
                        onPress={logout}>
                        <Image
                            style={{width: 20, height: 20}}
                            source={require('../../../../../assets/images/profile-icon.png')} />
                    </TouchableWithoutFeedback> }
                    { showContent &&  <Image
                        style={{width: 20, height: 20, paddingRight: 10, marginRight: 10}}
                        source={require('../../../../../assets/images/filter-icon.png')} /> }
                </View>

            </View>
        )
    }
    _goBack = () => {
        const { resetAlternativies,
                clearFilters, 
                setPrevCurrentRoutes, 
                navigation, 
                hideContextMenu, 
                resetArrayImages, 
                filterTab, 
                backToFilterTabs,
                prevRoute } = this.props;
        const route: string = navigation.state.routeName;

        if (COLLECTION === route) {
            setPrevCurrentRoutes(NEWSFEED, '');
            resetArrayImages();
        }
        if ( ZOOM === route) { 
            prevRoute === VIEW
             ? setPrevCurrentRoutes(VIEW, BROWSE)
             : setPrevCurrentRoutes(BROWSE, COLLECTION)
        }
        if ( VIEW === route) {   
            setPrevCurrentRoutes(BROWSE, COLLECTION)
        }
        if (BROWSE === route) {
            setPrevCurrentRoutes(COLLECTION, NEWSFEED);
            hideContextMenu();
            clearFilters();
            resetAlternativies();

        }
        if (FILTER === route) {
            if (filterTab) {
                backToFilterTabs();
                return true;
            }

            setPrevCurrentRoutes(BROWSE, COLLECTION)
        }
        navigation.goBack();
        return true;
    }

}

