import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Base styles for animated containers
  animationHidden: {
    opacity: 0,
  },

  animationReady: {
    opacity: 1,
  },
  baseAnimated: {
    overflow: 'hidden',
  },

  rotationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
