import { Easing, Animated } from "react-native";
import { COLLECTION } from '../shared';

export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 800,
      easing: Easing.out(Easing.poly(10)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (props: { layout: any, position: any, scene: any, scenes: any}) => {
      const thisSceneIndex = props.scene.index;
      if(props.scenes[thisSceneIndex - 1]) console.log(props.scenes[thisSceneIndex - 1].route.routeName)
      if (props.scenes[thisSceneIndex - 1] && props.scenes[thisSceneIndex - 1].route.routeName === COLLECTION) {
        const translateX = 0;
        const translateY = 0;
        const opacity = props.position.interpolate({
          inputRange: [thisSceneIndex - 0.7, thisSceneIndex, thisSceneIndex + 0.7],
          outputRange: [0.3, 1, 0.3]
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