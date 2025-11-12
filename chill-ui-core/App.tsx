import { useState } from 'react';

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

import {
  Box,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Button,
  String,
} from '@/components';

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

  const [value, setValue] = useState([10]);
  console.log('value', value);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Box className="flex-1 p-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Default Dialog</DialogTitle>
          </DialogHeader>
          <String>This is a default dialog content.</String>
          <DialogFooter>
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button title="Open Dialog" />
      <Box className="flex flex-row gap-5">
        <Button title="Open Dialog" />
        <Button title="Open Dialog" />
      </Box>
      <Button title="Open Dialog" />
    </Box>
  );
}
