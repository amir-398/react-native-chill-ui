import { useState } from 'react';
import { useFonts } from 'expo-font';
import { ButtonTw } from '@components/button';
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
  DialogClose,
  DialogCloseSs,
  DialogCloseTw,
  DialogContent,
  DialogContentSs,
  DialogContentTw,
  DialogFooter,
  DialogFooterSs,
  DialogFooterTw,
  DialogHeader,
  DialogHeaderSs,
  DialogHeaderTw,
  DialogSs,
  DialogTrigger,
  DialogTriggerSs,
  DialogTriggerTw,
  DialogTw,
  StringTw,
} from '@components';

// Import global.css only if NativeWind is available
try {
  require('nativewind');
  require('./global.css');
} catch {
  // NativeWind is not available, skip CSS import
  console.log('NativeWind not available, skipping global.css import');
}

const sampleImages = [
  {
    id: '1',
    title: 'Première image',
    uri: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    title: 'Première image',
    uri: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '3',
    title: 'Première image',
    uri: 'https://picsum.photos/800/600?random=1',
  },
];

export default function App() {
  const [isChecked, setIsChecked] = useState(false);
  console.log('isChecked=>', isChecked);
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
    return null; // ou un composant de chargement
  }
  // @ts-ignore
  // eslint-disable-next-line
  // const StorybookUIRoot = view.getStorybookUI({
  //   storage: {
  //     getItem(key: string) {
  //       return AsyncStorage.getItem(key);
  //     },
  //     setItem(key: string, value: string) {
  //       return AsyncStorage.setItem(key, value);
  //     },
  //   },
  // });

  return (
    <Box className="m-1 mt-16 flex-1 items-center justify-center bg-slate-100">
      <DialogTw>
        <DialogTriggerTw asChild>
          <ButtonTw title="Open Dialog Tailwind" />
        </DialogTriggerTw>
        <DialogContentTw>
          <DialogHeaderTw hasCloseMark />

          <Box className="p-6">
            <StringTw className="text-gray-700">
              Are you sure you want to proceed with this action? This cannot be undone.
            </StringTw>
          </Box>

          <DialogFooterTw>
            <Box className="flex-row justify-end gap-3">
              <DialogCloseTw asChild>
                <ButtonTw title="Cancel" />
              </DialogCloseTw>
              <ButtonTw
                variant="contained"
                colorVariant="primary"
                onPress={() => console.log('Confirmed!')}
                title="Confirm"
              />
            </Box>
          </DialogFooterTw>
        </DialogContentTw>
      </DialogTw>
      <DialogSs>
        <DialogTriggerSs asChild>
          <ButtonTw title="Open Dialog StyleSheet" />
        </DialogTriggerSs>
        <DialogContentSs>
          <DialogHeaderSs hasCloseMark />

          <Box className="p-6">
            <StringTw className="text-gray-700">
              Are you sure you want to proceed with this action? This cannot be undone.
            </StringTw>
          </Box>

          <DialogFooterSs>
            <Box className="flex-row justify-end gap-3">
              <DialogCloseSs asChild>
                <ButtonTw title="Cancel" />
              </DialogCloseSs>
              <ButtonTw
                variant="contained"
                colorVariant="primary"
                onPress={() => console.log('Confirmed!')}
                title="Confirm"
              />
            </Box>
          </DialogFooterSs>
        </DialogContentSs>
      </DialogSs>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonTw title="Open Dialog HYBRID" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark />

          <Box className="p-6">
            <StringTw className="text-gray-700">
              Are you sure you want to proceed with this action? This cannot be undone.
            </StringTw>
          </Box>

          <DialogFooter>
            <Box className="flex-row justify-end gap-3">
              <DialogClose asChild>
                <ButtonTw title="Cancel" />
              </DialogClose>
              <ButtonTw
                variant="contained"
                colorVariant="primary"
                onPress={() => console.log('Confirmed!')}
                title="Confirm"
              />
            </Box>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
