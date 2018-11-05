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
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
  },
  buttonButtonView: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonWrapper: {
    width: width * 0.7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: 'black'
  },
  bottomButtonText: {
    padding: 20
  },
  headerText: {
    height: 80,
    fontSize: 30,
    marginHorizontal: 25,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  fullWidthImage: {
    width,
    height: width
  }
})