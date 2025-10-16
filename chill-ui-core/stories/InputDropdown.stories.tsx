import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { InputDropdown } from '../src/components';

const sampleData = [
  { id: 1, label: 'Option 1', value: 'opt1' },
  { id: 2, label: 'Option 2', value: 'opt2' },
  { id: 3, label: 'Option 3', value: 'opt3' },
  { id: 4, label: 'Option 4', value: 'opt4' },
  { id: 5, label: 'Option 5', value: 'opt5' },
];

const meta: Meta<typeof InputDropdown> = {
  args: {
    hasAnimation: true,
    hasSearch: false,
    hasShadow: true,
    isLoading: false,
    maxHeight: 300,
    visible: false,
  },
  argTypes: {
    hasAnimation: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    hasSearch: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    hasShadow: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    isLoading: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    maxHeight: {
      table: {
        defaultValue: {
          summary: 300,
        },
      },
    },
    onSelectItem: {
      action: 'item-selected',
    },
    visible: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  component: InputDropdown,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FORMS/InputDropdown',
};

export default meta;
type Story = StoryObj<typeof InputDropdown>;

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleData,
    maxHeight: 300,
    visible: true,
  },
};

export const WithSearch: Story = {
  args: {
    data: sampleData,
    hasSearch: true,
    maxHeight: 300,
    searchInputProps: {
      placeholder: 'Search options...',
    },
    visible: true,
  },
};

export const WithShadow: Story = {
  args: {
    data: sampleData,
    hasShadow: true,
    maxHeight: 300,
    visible: true,
  },
};

// Loading States
export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    loadingIndicatorProps: {
      color: '#007AFF',
      name: 'spinner',
      size: 'md',
    },
    maxHeight: 300,
    visible: true,
  },
};
