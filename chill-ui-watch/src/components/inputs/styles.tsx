import FONTS from '@constants/FONTS';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  iconsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    height: 50,
    justifyContent: 'center',
    width: 60,
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: FONTS.primaryFontSemiBold,
    fontSize: 22,
    height: 50,
    lineHeight: 30,
    textAlign: 'center',
  },
  textInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
