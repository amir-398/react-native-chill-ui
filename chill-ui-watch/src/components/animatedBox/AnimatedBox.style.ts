import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Base styles for animated containers
  baseAnimated: {
    overflow: 'hidden',
  },

  // Fade animations
  fadeContainer: {
    // No specific styles needed, opacity is handled by Animated.Value
  },

  // Scale animations
  scaleContainer: {
    // No specific styles needed, scale is handled by Animated.Value
  },

  // Bounce animations
  bounceContainer: {
    // No specific styles needed, translateY is handled by Animated.Value
  },

  // Slide animations
  slideContainer: {
    // No specific styles needed, translateX/Y is handled by Animated.Value
  },

  // Rotation animations
  rotationContainer: {
    // Ensure rotation happens around the center
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Common animation states
  animationHidden: {
    opacity: 0,
  },

  animationReady: {
    opacity: 1,
  },
});
