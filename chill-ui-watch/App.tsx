import { View } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import { Button } from '@/components';
import String from '@/components/string/components/String';
import StringTw from '@/components/string/components/String.tw';
import StringSs from '@/components/string/components/String.ss';
import { Avatar, AvatarSs, AvatarTw } from '@/components/avatar';
import { BounceBox, FadeInBox, SlideInBox } from '@/components/animatedBox';
import SlideInBoxSs from '@/components/animatedBox/components/SlideInBox/SlideInBox.ss';

import { view } from './.storybook/storybook.requires';

// Import global.css only if NativeWind is available
try {
  require('nativewind');
  require('./global.css');
} catch {
  // NativeWind is not available, skip CSS import
  console.log('NativeWind not available, skipping global.css import');
}

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
    return null; // ou un composant de chargement
  }
  const StorybookUIRoot = view.getStorybookUI({
    storage: {
      getItem(key: string) {
        return AsyncStorage.getItem(key);
      },
      setItem(key: string, value: string) {
        return AsyncStorage.setItem(key, value);
      },
    },
  });

  return (
    <View style={{ marginTop: 100 }}>
      <Avatar
        variant="circle"
        data={{
          firstname: 'John',
          lastname: 'Doe',
        }}
      />

      <AvatarSs
        variant="circle"
        data={{
          firstname: 'JRohn',
          image_url: 'https://picsum.photos/200/300',
          lastname: 'Doe',
        }}
      />
      <AvatarTw
        variant="circle"
        className="rounded-full"
        data={{
          firstname: 'JRohn',
          image_url: 'https://picsum.photos/200/300',
          lastname: 'Doe',
        }}
      />
      <String position="right" variant="title-1" font="primaryItalic">
        Hybrid
      </String>
      <StringTw position="right" size="2xl">
        Tailwind
      </StringTw>
      <FadeInBox autoStart infiniteLoop>
        <StringSs position="center" variant="title-1" font="primaryItalic">
          StyleSheetss
        </StringSs>
      </FadeInBox>
      <BounceBox autoStart infiniteLoop>
        <StringSs position="center" variant="title-1" font="primaryItalic">
          StyleSheetss
        </StringSs>
        <Button title="lol" onPress={() => console.log('lol')} />
      </BounceBox>
      <SlideInBoxSs autoStart infiniteLoop>
        <StringSs position="center" variant="title-1" font="primaryItalic">
          StyleSheetss
        </StringSs>
        <Button title="lol" onPress={() => console.log('lol')} />
      </SlideInBoxSs>
      <SlideInBox autoStart infiniteLoop>
        <StringSs position="center" variant="title-1" font="primaryItalic">
          StyleSheetss
        </StringSs>
        <Button title="lol" onPress={() => console.log('lol')} />
      </SlideInBox>
    </View>
  );
}
