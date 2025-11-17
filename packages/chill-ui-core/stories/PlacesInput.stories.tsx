import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import UiPresentation from './storybook';
import { String, PlacesInput, PlaceInputContext } from '../src/components';

const meta: Meta<typeof PlacesInput> = {
  args: {
    clearQueryOnSelect: false,
    defaultOpen: false,
    requiredCharactersBeforeSearch: 2,
    requiredTimeBeforeSearch: 500,
  },
  argTypes: {
    clearQueryOnSelect: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    defaultOpen: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    requiredCharactersBeforeSearch: {
      table: {
        defaultValue: {
          summary: 2,
        },
      },
    },
    requiredTimeBeforeSearch: {
      table: {
        defaultValue: {
          summary: 500,
        },
      },
    },
  },
  component: PlacesInput,
  decorators: [
    (Story: any) => (
      <PlaceInputContext>
        <UiPresentation>
          <Story />
        </UiPresentation>
      </PlaceInputContext>
    ),
  ],
  title: 'FORMS/PlacesInput',
};

export default meta;
type Story = StoryObj<typeof PlacesInput>;

export const Default: Story = {
  args: {
    clearQueryOnSelect: false,
    dropdownProps: {
      className: 'bg-white',
    },
    googleApiKey: 'AIzaSyCvc5-EgIoFWRGmuqrnayi8RObdJsaYJSY',
    inputProps: {
      placeholder: 'Search a place...',
    },
    maxHeight: 300,
    onChangeText: action('onChangeText'),
    onSelect: action('onSelect'),
    query: '',
    queryCountries: ['FR'],
    requiredCharactersBeforeSearch: 2,
    requiredTimeBeforeSearch: 500,
    selectedValue: 'longAddress',
  },
};

export const WithInitialQuery: Story = {
  args: {
    ...Default.args,
    query: 'Paris',
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'border-gray-700 hover:bg-gray-700',
      stringItemProps: {
        className: 'text-white',
      },
    },
    dropdownProps: {
      className: 'bg-gray-800 border-gray-600',
    },
    inputProps: {
      className: 'bg-gray-800 text-white border-gray-600',
    },
  },
};

export const RoundedStyle: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'px-6 hover:bg-blue-50',
    },
    dropdownProps: {
      className: 'rounded-2xl mt-2 border-2 border-blue-500',
    },
    inputProps: {
      className: 'rounded-full px-6 border-2 border-blue-500 focus:border-blue-600',
    },
  },
};

export const ModernMinimal: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'hover:bg-purple-50',
    },
    dropdownProps: {
      className: 'shadow-xl border-0 rounded-lg mt-2',
    },
    inputProps: {
      className: 'border-0 border-b-2 border-gray-200 rounded-none focus:border-purple-500 transition-colors',
    },
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    dropdownItemProps: {
      className: 'border-orange-100 hover:bg-orange-100',
    },
    dropdownProps: {
      className: 'bg-orange-50 border-orange-200',
    },
    inputProps: {
      className: 'bg-orange-50 border-orange-300 text-orange-800',
    },
  },
};

export const CountryRestricted: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Search in North America...',
    },
    queryCountries: ['US', 'CA'],
  },
};

export const CustomRenderItem: Story = {
  args: {
    ...Default.args,
    customDropdownItem: (item: any) => (
      <div className="border-b border-gray-200 p-4">
        <String className="text-lg font-bold text-blue-600">{item.placePrediction.text.text}</String>
        <String className="mt-1 text-xs text-green-500">✓ Tap to select</String>
      </div>
    ),
  },
};

export const FastSearch: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Fast search (1 char, 200ms delay)...',
    },
    requiredCharactersBeforeSearch: 1,
    requiredTimeBeforeSearch: 200,
  },
};

export const SlowSearch: Story = {
  args: {
    ...Default.args,
    inputProps: {
      placeholder: 'Slow search (4 chars, 2s delay)...',
    },
    requiredCharactersBeforeSearch: 4,
    requiredTimeBeforeSearch: 2000,
  },
};
