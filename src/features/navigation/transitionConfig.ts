import { Easing, Animated } from "react-native";
import { COLLECTION, NEWSFEED, VIDEOPLAYER } from '../shared';

export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 30,
      easing: Easing.out(Easing.poly(10)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (props: { layout: any, position: any, scene: any, scenes: any}) => {
      const thisSceneIndex = props.scene.index;
      if (props.scenes[thisSceneIndex - 1] && 
        ( props.scenes[thisSceneIndex - 1].route.routeName === COLLECTION ||
          props.scenes[thisSceneIndex - 1].route.routeName === VIDEOPLAYER ||
          props.scenes[thisSceneIndex - 1].route.routeName === NEWSFEED
        )) {
        const translateX = 0;
        const translateY = 0;
        const opacity = props.position.interpolate({
          inputRange: [thisSceneIndex - 0.7, thisSceneIndex, thisSceneIndex + 0.7],
          outputRange: [0, 1, 0]
        });
        return { opacity, transform: [{translateX}, {translateY}]};
      } else {
        const width = props.layout.initWidth;
        const translateX = props.position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
        });
        return { transform: [{translateX}]};
      }
      

      
    }
  };
};