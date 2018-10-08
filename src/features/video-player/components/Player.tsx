import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image
} from 'react-native';
import { Video } from 'expo';
// import VideoPlayer from '@expo/videoplayer';
import theme from '../theme';
import { VIDEOPLAYER } from '../../shared';

const { width, height } = Dimensions.get('window');
const VideoCover = require('../../../../assets/images/video_cover.jpg');

type State = {
    likedItemIndex: null | number,
    isLoaded: boolean,
    shouldPlay: boolean
};
type Props = {
    navigation: any;
    goToBrowse: () => void;
};
export default class VideoPlayerScreen extends Component<Props, State> {
    state: State = {
        likedItemIndex: null,
        isLoaded: false,
        shouldPlay: true
    }
    componentDidMount() {
        const { goToBrowse } = this.props;
        setTimeout(() => {
            this.setState({shouldPlay: false}, () => {
                goToBrowse()
            })            
        }, 5000)
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log(nextProps.navigation.state.routeName)
        if(nextProps.navigation.state.routeName === VIDEOPLAYER) {
            this.setState({shouldPlay: true});
        }
    }
    render() {
        const { isLoaded, shouldPlay } = this.state
        return(
            <View style={theme.container}>
                <Text style={theme.videoText}>Fetching alternatives to try...</Text>
                <View style={theme.videoContainer}>
                    <View style={theme.videoPlayer}>
                        {
                            this.props.navigation.state.routeName === VIDEOPLAYER &&
                            <Video
                                shouldPlay={shouldPlay}
                                resizeMode={Video.RESIZE_MODE_CONTAIN}
                                source={{uri: 'https://s3.eu-west-2.amazonaws.com/fash-video/ezgif.com-gif-to-mp4.mp4'}}
                                isLooping
                                style={{
                                    flex: 1,
                                    backgroundColor: '#ffffff',
                                    width: width - 60,
                                    paddingTop: 50,
                                }}
                                width={width - 60}
                                useNativeControls={false}
                                onLoad={this.onLoadVideo}
                            />
                        }
                        
                        {
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
                        }
                    </View>
                </View>                
            </View>
        )
    }

    onLoadVideo = (status: any) => {
        console.log(status)
        this.setState({isLoaded: true})
    }

}
