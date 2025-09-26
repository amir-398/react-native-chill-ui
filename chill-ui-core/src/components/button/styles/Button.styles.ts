import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Base button styles
  buttonBase: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    width: '100%',
  },

  // Height variants
  height2xl: {
    height: 64,
  },
  height2xs: {
    height: 28,
  },
  heightLg: {
    height: 48,
  },
  heightMd: {
    height: 40,
  },
  heightSm: {
    height: 36,
  },
  heightXl: {
    height: 56,
  },
  heightXs: {
    height: 32,
  },

  // Position variants
  positionCenter: {
    alignSelf: 'center',
  },
  positionLeft: {
    alignSelf: 'flex-start',
  },
  positionRight: {
    alignSelf: 'flex-end',
  },

  // Variant styles (contained/outlined/text)
  variantContained: {
    borderColor: 'transparent',
    borderWidth: 2,
  },
  variantOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  variantText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },

  // Color variant base style (only primary available without NativeWind)
  colorPrimary: {
    backgroundColor: '#7C9CBF', // Neutral gray-blue for chill UI
  },

  // Outlined color variant (only primary available without NativeWind)
  outlinedPrimary: {
    borderColor: '#7C9CBF',
  },

  // Opacity states
  disabled: {
    opacity: 0.4,
  },
  loading: {
    opacity: 0.4,
  },

  // Content container
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
  },

  // Icon position variants
  iconPositionCenter: {
    justifyContent: 'center',
  },
  iconPositionLeft: {
    justifyContent: 'flex-start',
  },
  iconPositionRight: {
    justifyContent: 'flex-end',
  },

  // Icon absolute positioning
  iconAbsolute: {
    position: 'absolute',
  },
  iconAbsoluteLeft: {
    left: 12,
  },
  iconAbsoluteRight: {
    right: 12,
  },

  // Icon spacing
  iconMarginLeft: {
    marginLeft: 8,
  },
  iconMarginRight: {
    marginRight: 8,
  },

  // Text container
  textContainer: {
    flex: 1,
  },
  textContainerCenter: {
    justifyContent: 'center',
  },
  textContainerEnd: {
    justifyContent: 'flex-end',
  },
  textContainerStart: {
    justifyContent: 'flex-start',
  },
});

export default styles;
