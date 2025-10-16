import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Text } from 'react-native';

import { cn } from '../src/utils';
import UiPresentation from './storybook';
import { Box, InputSelectDropdown } from '../src/components';

const meta: Meta<typeof InputSelectDropdown> = {
  args: {
    closeModalWhenSelectedItem: true,
    dropdownPosition: 'auto',
    hasHighlightString: true,
    hasSearch: false,
    maxHeight: 300,
    minHeight: 0,
    offsetX: 0,
    offsetY: 5,
    visible: true,
  },
  argTypes: {
    closeModalWhenSelectedItem: {
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    dropdownPosition: {
      table: {
        defaultValue: {
          summary: 'auto',
        },
      },
    },
    hasHighlightString: {
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    hasSearch: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    maxHeight: {
      table: {
        defaultValue: {
          summary: '300',
        },
      },
    },
    minHeight: {
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    offsetX: {
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    offsetY: {
      table: {
        defaultValue: {
          summary: '5',
        },
      },
    },
    visible: {
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
  component: InputSelectDropdown,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FORMS/InputSelectDropdown',
};

export default meta;
type Story = StoryObj<typeof InputSelectDropdown>;

// Various datasets
const basicData = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 9', value: 'option9' },
  { label: 'Option 10', value: 'option10' },
];

const countriesData = [
  { code: 'FR', name: 'France', population: 67000000 },
  { code: 'DE', name: 'Germany', population: 83000000 },
  { code: 'IT', name: 'Italy', population: 60000000 },
  { code: 'ES', name: 'Spain', population: 47000000 },
  { code: 'UK', name: 'United Kingdom', population: 67000000 },
  { code: 'PL', name: 'Poland', population: 38000000 },
  { code: 'NL', name: 'Netherlands', population: 17000000 },
  { code: 'BE', name: 'Belgium', population: 11000000 },
];

const largeDataSet = Array.from({ length: 50 }, (_, i) => {
  let category = 'C';
  if (i % 3 === 0) category = 'A';
  else if (i % 3 === 1) category = 'B';

  return {
    category,
    id: i + 1,
    label: `Item ${i + 1}`,
    value: `item${i + 1}`,
  };
});

// Custom component for items
function CustomDropdownItem(item: any, selected?: boolean) {
  const { code, name, population } = item;
  return (
    <Box style={{ backgroundColor: selected ? '#e3f2fd' : 'white', padding: 12 }}>
      <Box className={cn('text-base', selected && 'font-bold')}>
        {name} ({code})
      </Box>
      <Text style={{ color: '#666', fontSize: 12 }}>Population: {population.toLocaleString()}</Text>
    </Box>
  );
}

export const Default: Story = {
  args: {
    dataSet: basicData,
    inputProps: {
      placeholder: 'Select an option',
    },
    itemClickableAs: 'touchable-opacity',
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithSearch: Story = {
  args: {
    dataSet: countriesData,
    hasSearch: true,
    inputProps: {
      placeholder: 'Search for a country...',
    },
    onSelectItem: (item: any) => console.log('Selected country:', item),
    searchField: 'name',
    searchInputProps: {
      placeholder: 'Type to search...',
    },
    valueField: 'name',
  },
};

export const WithCustomHeight: Story = {
  args: {
    dataSet: largeDataSet,
    hasSearch: true,
    inputProps: {
      placeholder: 'Select from a long list',
    },
    maxHeight: 200,
    minHeight: 100,
    onSelectItem: (item: any) => console.log('Selected item:', item),
    searchField: 'label',
    valueField: 'label',
  },
};

export const WithExcludedItems: Story = {
  args: {
    dataSet: basicData,
    excludeItems: [basicData[1], basicData[3]], // Excludes Option 2 and Option 4
    inputProps: {
      placeholder: 'Options 2 and 4 are excluded',
    },
    onSelectItem: (item: any) => console.log('Selected:', item),
    valueField: 'value',
  },
};

export const WithCustomDropdownItem: Story = {
  args: {
    customDropdownItem: CustomDropdownItem,
    dataSet: countriesData,
    inputProps: {
      placeholder: 'Select a country (custom design)',
    },
    maxHeight: 300,
    onSelectItem: (item: any) => console.log('Selected country:', item),
    searchField: 'name',
    valueField: 'name',
  },
};
