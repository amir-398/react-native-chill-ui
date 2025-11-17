// Import your global CSS file
import "../global.css"
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

import type { Preview } from "@storybook/react";
import { AutocompleteDropdownContext } from "../src/components/AutocompleteDropdown";

const cleanDescription = (description: string): string => {
  if (!description) return '';
  
  let cleaned = description.replace(/@param[\s\S]*/g, '').trim();
  
  const importMatch = cleaned.match(/<!-- STORYBOOK_IMPORT_START([\s\S]*?)STORYBOOK_IMPORT_END -->/);
  if (importMatch) {
    const importContent = importMatch[1].trim();
    cleaned = cleaned.replace(
      /<!-- STORYBOOK_IMPORT_START[\s\S]*?STORYBOOK_IMPORT_END -->/,
      `## Import\n${importContent}`
    );
  }
  
  // Remplacer @example par un titre markdown
  cleaned = cleaned.replace(/@example/gi, '## Example');
  
  return cleaned;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      extractComponentDescription: (component: any) => {
        const docgen = component.__docgenInfo;
        if (!docgen?.description) return '';
        
        return cleanDescription(docgen.description);
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
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
        return <div>Loading fonts...</div>;
      }

      return <AutocompleteDropdownContext> <Story /></AutocompleteDropdownContext> ;
    },
  ],
};

export default preview;