import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ripple from 'react-native-material-ripple';
import * as API from '../../../services/api';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginTop: -10,
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 10
    },
    buttonViewer: {
        height: 60,
        flexDirection: 'row',
    },
    buttomButton: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: 'white',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'RalewayBold',
        fontSize: 18,
        color: 'white',
        letterSpacing: 2
    },
    indexView: {
        height: 40,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indexText: {
        fontFamily: 'QuickSandRegular',
        fontSize: 10,
        letterSpacing: 2,
        textAlign: 'center',
        marginVertical: 10
    },
    wrapper: {
        width: width - 40,
        // borderWidth: 1,
        // borderColor: 'black',
        // justifyContent: 'flex-start'
    },
    slideItemView: {
        width: width - 40,
        height: height - 270,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black',
        padding: 1
    },
    slideImage: {
        width: width - 42,
        height: height - 272,
        resizeMode: 'cover'
    },
    slideHeader: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black',
        padding: 10
    },
    slideAvatar: {
        width: 40,
        height: 40,        
        resizeMode: 'cover',
        borderRadius: 20,
    },
    slideHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    name: {
        fontSize: 14,
        fontFamily: 'RalewayBold',
        color: 'black',
        marginBottom: 3,
    },
    role: {
        fontSize: 14,
        fontFamily: 'Raleway',
        color: 'black'
    },
    viewButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3897F0',
        borderRadius: 4,
    },
    viewButtonText: {
        // fontFamily: 'QuickSandBold',
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    }
})

type Props = {
    navigation: any;
    onClickStyleIt: (slots: Slot[]) => void;
    onClickViewProfile: (url: string) => void;
}

type State = {
    slideIndex: number,
    slots: any;
};

const tempImageURL = 'https://scontent-nrt1-1.cdninstagram.com/vp/2393885aa6b1a2b1bf2451961b176b9c/5C9CC127/t51.2885-15/e15/11280253_1438753469762560_1082518244_n.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com';

export default class InstagramSlide extends Component<Props, State> {

    swiper: any;
    state: State = {
        slideIndex: 0,
        slots: []
    }

    componentDidMount() {
        const { navigation } = this.props;
        const slots = navigation.getParam('slots', []);
        this.setState({slots: this.validate(slots)})
    }

    _onChangeSwiperIndex = (index: number) => {
        API.RegisterEvent("Instagram-swipe", {
            actionType: 'Swipe photo',
            index
        })
        this.setState({slideIndex: index});
    }

    validate = (slots: any) => {
        const temp: any = [];
        slots.map((slot: any) => {
            if(slot.instagramURL.length > 0) temp.push(slot);
        })
        return temp;
    }
    
    _onClickStyleIt = () => {
        this.props.onClickStyleIt(this.state.slots[this.state.slideIndex].slots)
    }

    onNext = () => {
        const newIndex = (this.state.slideIndex + 1) % (this.state.slots.length);
        this.setState({slideIndex: newIndex})
        this.swiper.scrollBy(1, true)
    }

    getDescription = (title: string) => {
        if(title.length < 15) return title;
        return title.substr(0, 15) + '...'
    }

    onPressMore = () => {
        alert(this.state.slideIndex)
        Linking.openURL(JSON.parse(this.state.slots[this.state.slideIndex].instagramURL).author_url);
    }

    render() {
        const { slideIndex, slots } = this.state;
        return (
            <View style={styles.container}>
                
                <Swiper
                    ref={(ref) => this.swiper = ref}
                    style={styles.wrapper} 
                    dotStyle={{width: 6, height: 6}}
                    scrollEnabled={false}
                    showsPagination={false}
                    onIndexChanged={this._onChangeSwiperIndex}
                >                
                {
                    slots.map((slot: any) => {
                        const instagram = JSON.parse(slot.instagramURL);
                        return(
                            <View key={instagram.title}>
                                <View style={styles.slideHeader}>
                                    <Image source={{uri: tempImageURL}} style={styles.slideAvatar} />
                                    <View style={styles.slideHeaderInfo}>
                                        <Text style={styles.name}>{instagram.author_name}</Text>
                                        <Text style={styles.role}>{this.getDescription(instagram.title)}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.onClickViewProfile(instagram.author_url)}>
                                        <View style={styles.viewButton}>
                                            <Text style={styles.viewButtonText}>View Profile</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View key={JSON.stringify(slot)} style={styles.slideItemView}>
                                    <Image source={{uri: instagram.thumbnail_url}} style={styles.slideImage} />
                                </View>
                            </View>
                        ) 
                    })
                }
                </Swiper>
                <View style={styles.indexView}>
                    <Text style={styles.indexText}>Look {slideIndex + 1} of {slots.length} - </Text>
                    <TouchableOpacity onPress={() => this.onPressMore()}>
                        <Text style={styles.indexText}>View more on Instagram</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonViewer}>
                    <Ripple
                        style={styles.buttomButton}
                        rippleSize={240} 
                        rippleColor='#FFFFFF'
                        rippleCentered={true} 
                        rippleDuration={1000}
                        onPress={() => this._onClickStyleIt()}
                    >
                        <Text style={styles.buttonText}>STYLE IT</Text>   
                    </Ripple>
                    <Ripple
                        style={[styles.buttomButton, {borderWidth: 0}]}
                        rippleSize={240} 
                        rippleColor='#FFFFFF'
                        rippleCentered={true} 
                        rippleDuration={1000}
                        onPress={() => this.onNext()}
                    >
                        <Text style={styles.buttonText}>NEXT ></Text>   
                    </Ripple> 
                </View>
                
                {/* <Button style={theme.rightButton} themeType='light' text='ADD TO CART'/> */}
            </View>
        )
    }
}
