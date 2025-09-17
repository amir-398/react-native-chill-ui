import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Row variants
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Column variants
  column: {
    flexDirection: 'column',
  },
  columnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  columnCenter: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  columnCenterBetween: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // Center variants
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Grow variants
  columnGrow: {
    flex: 1,
    flexDirection: 'column',
  },
  grow: {
    flex: 1,
  },
  rowGrow: {
    flex: 1,
    flexDirection: 'row',
  },

  // Positioning variants
  absolute: {
    position: 'absolute',
  },
  stack: {
    position: 'relative',
  },
});

export default styles;
