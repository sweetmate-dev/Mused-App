import {
    StyleSheet,
    StyleProp
} from 'react-native';

const styles: StyleProp<any> = StyleSheet.create({
    buttonContainer: {
        width: 140,
        height: 50,
        borderWidth: 1,
        borderTopColor: '#000',
    },
    buttonContainerDark: {
        backgroundColor: '#000',
    },
    buttonContainerLight: {
        backgroundColor: '#fff',
    },
    buttonText: {
        fontFamily: 'RalewayBold',
        fontSize: 14,
        lineHeight: 48,
        textAlign: 'center',
    },
    buttonTextDark: {
        color: '#fff',
    },
    buttonTextLight: {
        color: '#000',
    },
});

export default styles;
