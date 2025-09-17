import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Base dialog styles
  dialogBase: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative',
  },

  // Size variants
  sizeFull: {
    width: '100%',
  },
  sizeLg: {
    width: '80%',
  },
  sizeMd: {
    width: '83.333333%',
  },
  sizeSm: {
    width: '66.666667%',
  },
  sizeXl: {
    width: '91.666667%',
  },

  // Border radius variants
  rounded2xl: {
    borderRadius: 16,
  },
  rounded3xl: {
    borderRadius: 24,
  },
  roundedFull: {
    borderRadius: 9999,
  },
  roundedLg: {
    borderRadius: 8,
  },
  roundedMd: {
    borderRadius: 6,
  },
  roundedSm: {
    borderRadius: 2,
  },
  roundedXl: {
    borderRadius: 12,
  },

  // Backdrop styles
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  // Close mark position styles
  closeMarkLeft: {
    left: 8,
    position: 'absolute',
    top: 8,
    zIndex: 10,
  },
  closeMarkRight: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 10,
  },

  // Container styles
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
