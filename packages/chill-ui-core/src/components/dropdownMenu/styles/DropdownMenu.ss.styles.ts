import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dropdown: {
    padding: 8,
  },
  item: {
    padding: 4,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  separator: {
    backgroundColor: '#E5E7EB',
    height: 1,
    marginVertical: 1,
  },
  trigger: {
    alignSelf: 'flex-start',
  },
});

export const dropdownMenuItemSv = sv({
  variants: {
    isDisabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});
