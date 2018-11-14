import {
  Dimensions,
  StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');


export default StyleSheet.create({
  container: {
      backgroundColor: '#FFFFFF',      
      flex: 1,
  },
  logo: {
    margin: 20,
    height: 20,
    width: 60,
    marginBottom: 30,
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
  },
  buttonButtonView: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15
  },
  buttonWrapper: {
    width: width * 0.7,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: 'black'
  },
  bottomButtonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 9,
    letterSpacing: 1,
    fontFamily: 'QuickSandRegular'
  },
  headerText: {
    height: 80,
    fontSize: 30,
    marginHorizontal: 25,
    marginVertical: 10,
    fontFamily: 'Raleway',
    textAlign: 'center'
  },
  fullWidthImage: {
    width,
    height: width
  }
})