import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Animated
} from 'react-native';
import { Video } from 'expo';
// import VideoPlayer from '@expo/videoplayer';
import theme from '../theme';
import { VIDEOPLAYER } from '../../shared';

const { width } = Dimensions.get('window');
const VideoCover = require('../../../../assets/images/video_cover.jpg');

type State = {
    likedItemIndex: null | number,
    isLoaded: boolean,
    shouldPlay: boolean,
    fadeIn: any,
};
type Props = {
    navigation: any;
    goToBrowse: () => void;
};
export default class VideoPlayerScreen extends Component<Props, State> {
    state: State = {
        likedItemIndex: null,
        isLoaded: false,
        shouldPlay: false,
        fadeIn: new Animated.Value(0.3),
    }

    timeout: any;
    
    componentDidMount() {
        const { goToBrowse } = this.props;
        this._fadeIn()
        this.timeout = setTimeout(() => {
            this.setState({shouldPlay: false}, () => {
                goToBrowse()
            })            
        }, 3000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log(nextProps.navigation.state.routeName)
        if(nextProps.navigation.state.routeName === VIDEOPLAYER) {
            this.setState({shouldPlay: true});
        }
    }
    render() {
        const { shouldPlay, fadeIn } = this.state
        return(
            <View style={theme.container}>
                {/* <Text style={theme.videoText}>Fetching alternatives to try...</Text> */}
                <Animated.View style={[theme.videoContainer, {opacity: fadeIn}]}>
                    <View style={theme.videoPlayer}>
                        {
                            this.props.navigation.state.routeName === VIDEOPLAYER &&
                            <Video
                                shouldPlay={shouldPlay}
                                resizeMode={Video.RESIZE_MODE_CONTAIN}
                                source={{uri: 'https://s3.eu-west-2.amazonaws.com/fash-video/ezgif.com-gif-to-mp4.mp4'}}
                                isLooping
                                style={{
                                    height: width,
                                    backgroundColor: '#ffffff',
                                    width: width,
                                }}
                                width={width}
                                useNativeControls={false}
                                onLoad={this.onLoadVideo}
                                usePoster={false}
                                posterSource={VideoCover}
                            />
                        }
                        
                        {/* {
                            !isLoaded &&
                            <Image
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: width - 60,
                                    height: height / 2
                                }}
                                resizeMode='contain'
                                source={VideoCover}
                            />
                        } */}
                    </View>
                </Animated.View>                
            </View>
        )
    }

    onLoadVideo = (status: any) => {
        console.log(status)
        this.setState({isLoaded: true})
    }

    _fadeIn = () => {
        this.state.fadeIn.setValue(0.3)
        Animated.timing(                  
           this.state.fadeIn,            
           {
             toValue: 1,                   
             duration: 800, 
             useNativeDriver: true             
           }
        ).start(() => {
            this.setState({shouldPlay: true})
        });                   
      }

}
