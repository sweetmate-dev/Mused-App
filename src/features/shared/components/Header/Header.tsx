import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    BackHandler,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Ripple from 'react-native-material-ripple';
import { COLLECTION, BROWSE, FILTER, NEWSFEED, VIDEOPLAYER, BROWSE_ONLY } from '../../routesKeys';
import * as API from '../../../../services/api';
import { loginViaAnonProvider, updateUser } from '../../../../services'
const menuItems = ['NEWSFEED', 'SHOP NEW', 'SHOP CATEGORIES', 'SIGN OUT'];
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        marginTop: -10,
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingHorizontal: 15 
    },
    leftView: { 
        flex: 0.2, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    rightView: { 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        flexDirection: 'row', 
        flex: 0.2
    },
    backIcon: {
        width: 13, 
        height: 13, 
        marginLeft: 7, 
        marginRight: 12
    },
    logoIcon: {
        width: 62, 
        height: 22 
    },
    profileIcon: {
        width: 15, 
        height: 15, 
        marginRight: 10
    },
    dropDownText: {
        height: width * 0.125,
        fontSize: 14, 
        backgroundColor: 'transparent',
        fontFamily: 'QuickSandRegular',
        textAlign: 'center',
        padding: 10,
        borderColor: '#FFFFFF',
        justifyContent: 'center'
    },
    dropDownStyle: {
        width: width * 0.6, 
        height: width * 0.5 + 20, 
        backgroundColor: 'white', 
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 5,
        paddingTop: 10
    },
    dropDownSeparator: {
        height: 0,
    }
})

type Props = {
    showContent?: boolean;
    navigation: any;
    filterTab: string;
    logout: () => void;
    userProfile: () => UserProfile;
    hideContextMenu: () => void;
    resetArrayImages: () => void;
    backToFilterTabs: () => void;
    clearFilters: () => void;
    resetAlternativies: () => void;
    onPressLogo: () => void;
    resetCollection: () => void;
    getNewProducts: () => void;
    setBrowseType: (type: number) => void;
    setUserDetails: (userId: string, userProfile: any) => void;
    ui: IUiStore;
    getPosts: () => void;
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
        const { navigation} = this.props;
        return (
            <View style={styles.header}>
                <View style={styles.leftView}>
                    {
                        navigation.state.routeName !== NEWSFEED ?
                        <View>
                            <Ripple rippleContainerBorderRadius={15 / 2} rippleSize={20} rippleCentered={true} onPress={this._goBack}>
                            <Image
                                style={styles.backIcon}
                                source={require('../../../../../assets/images/arrow-icon.png')} />
                            </Ripple>
                        </View>
                        :
                        <View style={styles.backIcon} />
                    }
                    <TouchableWithoutFeedback onPress={this.onPressLogo}>
                        <Image
                            style={styles.logoIcon}
                            source={require('../../../../../assets/images/logo.png')} 
                        />
                    </TouchableWithoutFeedback>
                </View>
                {/* <View style={{ alignItems: 'center', flex: 0.6, justifyContent: 'center' }}>
                     <TouchableWithoutFeedback onPress={this.onPressLogo}>
                        <Image
                            style={{width: 62, height: 22 }}
                            source={require('../../../../../assets/images/logo.png')} 
                        />
                    </TouchableWithoutFeedback>
                </View> */}

                <View style={styles.rightView}>
                    { 
                        showContent &&  
                        <TouchableWithoutFeedback onPress={this._onPressAvatar}>
                            <Image
                                style={styles.profileIcon}
                                source={require('../../../../../assets/images/profile-icon.png')} 
                            />
                        </TouchableWithoutFeedback> 
                    }
                    { 
                        showContent &&  
                        <ModalDropdown
                            options={menuItems}
                            dropdownStyle={styles.dropDownStyle}
                            renderRow={(option: string) => (
                                <TouchableOpacity>
                                    <Text style={styles.dropDownText}>{option}</Text>
                                </TouchableOpacity>
                            )}
                            renderSeparator={() => (
                                <View style={styles.dropDownSeparator} />
                            )}
                            onSelect={(index: string) => this.onClickOption(index)}
                            style={styles.profileIcon}
                        >
                            <Image 
                                style={styles.profileIcon}
                                source={require('../../../../../assets/images/hamburger-icon.png')} 
                            /> 
                        </ModalDropdown>
                    }
                </View>

            </View>
        )
    }

    _onPressAvatar = () => {
        API.RegisterEvent("Hd-account", {
            actionType: "Clicked person icon on header"
        })
        alert('coming soon')
    }

    onClickOption = async (index: string) => {
        API.RegisterEvent("Hd-ham", {
            actionType: "Selected one on header menu"
        })
        switch (Number(index)) {
            case 0:
                this.props.onPressLogo();
                break;
            case 1:
                await this.props.getNewProducts();
                this.props.ui.navigate(BROWSE_ONLY, '', {});
                break;
            case 2:
                this.props.setBrowseType(2);
                this.props.ui.navigate(FILTER, '', {});
                break;
            case 3:
                API.autoLogOut()
                break;
            default:
                break;
        }
    }

    _updateUser = (userId: string, userProfile: any) => {
        updateUser(userProfile).then(
            async () => {
                await this.props.setUserDetails(userId, userProfile)
                this.props.ui.setLoading(false)
            },
            error => console.log(error)
        );
    };

    signOut = () => {
        API.RegisterEvent('On-SignOut', {actionType: "Click 'Sign Out' button on Menu"});
        this.props.ui.setLoading(true)
        loginViaAnonProvider().then((data: any) => {
            const userId = data.auth.authInfo.userId;
            // const userProfile = data.auth.authInfo.userProfile.data;
            const userProfile = {
                email: 'anonymous',
                firstName: 'anonymous',
                lastName: 'anonymous',
                name: 'anonymous'
            }
            this._updateUser(userId, userProfile);        
        }, (error: Error) => {
            this.props.ui.setLoading(false)
            console.log(error.message)
        })
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
                navigation, 
                hideContextMenu, 
                resetArrayImages, 
                filterTab, 
                backToFilterTabs,
                ui: {currentRoute, prevRoute, navigate, goBack},
                resetCollection,
                getPosts
             } = this.props;
        const route: string = currentRoute;
        console.log(route + ', ' + prevRoute);
        //refresh newsfeed data
        getPosts();
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

