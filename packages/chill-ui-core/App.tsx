import './global.css';
import { useFonts } from 'expo-font';
import {
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_200ExtraLight,
  Poppins_400Regular_Italic,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_100Thin,
} from '@expo-google-fonts/poppins';
import {
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_200ExtraLight,
  Montserrat_400Regular_Italic,
  Montserrat_300Light,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_100Thin,
} from '@expo-google-fonts/montserrat';

export const ICONS = {
  amir: {
    path: [
      'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z',
    ],
    viewBox: '0 0 384 512',
  },
  meberbeche: {
    path: [
      'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z',
    ],
    viewBox: '0 0 512 512',
  },
} as const;
export type TIcons = typeof ICONS;

export default function App() {
  const [fontsLoaded] = useFonts({
    primary_bold_font: Poppins_700Bold,
    primary_extra_bold_font: Poppins_800ExtraBold,
    primary_extra_light_font: Poppins_200ExtraLight,
    primary_italic_font: Poppins_400Regular_Italic,
    primary_light_font: Poppins_300Light,
    primary_medium_font: Poppins_500Medium,
    primary_regular_font: Poppins_400Regular,
    primary_semi_bold_font: Poppins_600SemiBold,
    primary_thin_font: Poppins_100Thin,
    secondary_bold_font: Montserrat_700Bold,
    secondary_extra_bold_font: Montserrat_800ExtraBold,
    secondary_extra_light_font: Montserrat_200ExtraLight,
    secondary_italic_font: Montserrat_400Regular_Italic,
    secondary_light_font: Montserrat_300Light,
    secondary_medium_font: Montserrat_500Medium,
    secondary_regular_font: Montserrat_400Regular,
    secondary_semi_bold_font: Montserrat_600SemiBold,
    secondary_thin_font: Montserrat_100Thin,
  });
  if (!fontsLoaded) {
    return null;
  }

  return null;
}
