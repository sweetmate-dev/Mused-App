import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLLECTION, BROWSE, FILTER, NEWSFEED, ZOOM, VIEW, VIDEOPLAYER } from '../../routesKeys';
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
                    paddingTop: 10,
                    marginTop: -10,
                    backgroundColor: '#fff',
                    height: 70, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                <View style={{ flex: 0.2 }}>
                    {navigation.state.routeName !== NEWSFEED && <View  style={{width: 20}}>
                        <Ripple rippleContainerBorderRadius={15 / 2} rippleSize={20} rippleCentered={true} onPress={this._goBack}>
                        <Image
                            style={{width: 10, height: 10}}
                            source={require('../../../../../assets/images/arrow-icon.png')} />
                        </ Ripple>
                    </View>}
                </View>
                <View style={{ alignItems: 'center', flex: 0.6, justifyContent: 'center' }}>
                     <Image
                        style={{width: 62, height: 22 }}
                        source={require('../../../../../assets/images/logo.png')} />
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
            if(prevRoute === BROWSE) setPrevCurrentRoutes(BROWSE, COLLECTION)
            else if(prevRoute === VIEW) setPrevCurrentRoutes(VIEW, BROWSE)
            else if(prevRoute === COLLECTION) setPrevCurrentRoutes(COLLECTION, NEWSFEED)
        }
        if ( VIEW === route) {   
            setPrevCurrentRoutes(BROWSE, VIDEOPLAYER)
        }
        if (BROWSE === route) {
            setPrevCurrentRoutes(VIDEOPLAYER, COLLECTION);
            hideContextMenu();
            clearFilters();
            resetAlternativies();
        }
        if (VIDEOPLAYER === route) {
            setPrevCurrentRoutes(COLLECTION, NEWSFEED)
        }
        if (FILTER === route) {
            if (filterTab) {
                backToFilterTabs();
                return true;
            }

            setPrevCurrentRoutes(BROWSE, VIDEOPLAYER)
        }
        navigation.goBack();
        return true;
    }

}

