import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    videoContainer: {
        flex: 1,
    },
    videoPlayer: {
        flex: 1,
        width: width,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    videoText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,        
    }
});
