import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    videoContainer: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    videoPlayer: {
        height: height / 2,
        width: width - 60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        position: 'relative'
    },
    videoText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,        
    }
});
