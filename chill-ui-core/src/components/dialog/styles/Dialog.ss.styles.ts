import { sv } from '@utils';
import { StyleSheet } from 'react-native';

/**
 * Base StyleSheet styles for Dialog component
 */
export const styles = StyleSheet.create({
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
  closeMarkBase: {
    position: 'absolute',
    top: 8,
    zIndex: 10,
  },
  closeMarkLeft: {
    left: 8,
  },
  closeMarkRight: {
    right: 8,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dialogBase: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative',
    width: '83.333333%', // Default md size
  },
  footer: {
    borderColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontWeight: '600',
  },
  triggerBase: {
    alignSelf: 'flex-start',
  },
});

/**
 * Dialog style variants using sv
 */
export const dialogSv = sv({
  base: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative',
  },
  variants: {
    size: {
      full: {
        width: '100%',
      },
      lg: {
        width: '80%',
      },
      md: {
        width: '83.333333%',
      },
      sm: {
        width: '66.666667%',
      },
      xl: {
        width: '91.666667%',
      },
    },
  },
});

/**
 * Dialog header style variants using sv
 */
export const dialogHeaderSv = sv({
  base: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  compoundVariants: [
    {
      children: true,
      hasCloseMark: true,
      style: {
        alignItems: 'center',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
    },
    {
      children: true,
      hasCloseMark: false,
      style: {
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
    },
    {
      children: false,
      hasCloseMark: true,
      style: {
        borderBottomWidth: 0,
        justifyContent: 'flex-end',
        paddingHorizontal: 4,
        paddingVertical: 4,
      },
    },
  ],
  variants: {
    children: {
      false: {},
      true: {},
    },
    hasCloseMark: {
      false: {},
      true: {},
    },
  },
});
