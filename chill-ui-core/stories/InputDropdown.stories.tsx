import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { InputDropdown } from '../src/components/inputDrodown';

const sampleData = [
  { id: 1, label: 'Option 1', value: 'opt1' },
  { id: 2, label: 'Option 2', value: 'opt2' },
  { id: 3, label: 'Option 3', value: 'opt3' },
  { id: 4, label: 'Option 4', value: 'opt4' },
  { id: 5, label: 'Option 5', value: 'opt5' },
];

const largeDataSet = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  label: `Option ${i + 1}`,
  value: `opt${i + 1}`,
}));

const userDataSet = [
  { avatar: 'https://via.placeholder.com/40', email: 'john@example.com', id: 1, name: 'John Doe' },
  { avatar: 'https://via.placeholder.com/40', email: 'jane@example.com', id: 2, name: 'Jane Smith' },
  { avatar: 'https://via.placeholder.com/40', email: 'bob@example.com', id: 3, name: 'Bob Johnson' },
  { avatar: 'https://via.placeholder.com/40', email: 'alice@example.com', id: 4, name: 'Alice Brown' },
];

const meta: Meta<typeof InputDropdown> = {
  argTypes: {
    // Required props
    data: { control: 'object', description: 'Array of data items to display' },
    maxHeight: { control: 'number', description: 'Maximum height of the dropdown' },
    visible: { control: 'boolean', description: 'Whether the dropdown is visible' },

    // Optional props
    minHeight: { control: 'number', description: 'Minimum height of the dropdown' },
    onSelectItem: { action: 'item-selected', description: 'Callback when an item is selected' },

    // Styling
    className: { control: 'text', description: 'Custom CSS classes (Tailwind/Hybrid only)' },
    hasShadow: { control: 'boolean', description: 'Whether to show shadow' },
    style: { control: 'object', description: 'Custom style object' },

    // Search functionality
    customSearchInput: { control: false, description: 'Custom search input component' },
    hasSearch: { control: 'boolean', description: 'Whether to show search input' },
    searchInputProps: { control: 'object', description: 'Props for the search input' },

    // Animation
    hasAnimation: { control: 'boolean', description: 'Whether to enable animations' },

    // List functionality
    customEmpty: { control: false, description: 'Custom empty state component' },
    customLoadingIndicator: { control: false, description: 'Custom loading indicator component' },
    emptyText: { control: 'text', description: 'Text to show when list is empty' },
    isLoading: { control: 'boolean', description: 'Whether the list is loading' },

    // Item configuration
    dropdownItemProps: { control: 'object', description: 'Props for dropdown items' },
    DropdownItemRender: { control: false, description: 'Custom render function for items' },
    dropdownListProps: { control: 'object', description: 'Props for the FlatList component' },
    itemClickableAs: {
      control: 'select',
      description: 'Type of touchable component for items',
      options: ['TouchableOpacity', 'Pressable', 'TouchableHighlight', 'RipplePressable', 'none'],
    },
    loadingIndicatorProps: { control: 'object', description: 'Props for loading indicator' },
  },
  component: InputDropdown,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/InputDropdown',
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

export const NoAnimation: Story = {
  args: {
    data: sampleData,
    hasAnimation: false,
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

export const LoadingWithSearch: Story = {
  args: {
    data: [],
    hasSearch: true,
    isLoading: true,
    maxHeight: 300,
    searchInputProps: {
      placeholder: 'Search while loading...',
    },
    visible: true,
  },
};

// Empty States
export const Empty: Story = {
  args: {
    data: [],
    emptyText: 'No options available',
    maxHeight: 300,
    visible: true,
  },
};

export const EmptyWithSearch: Story = {
  args: {
    data: [],
    emptyText: 'No results found',
    hasSearch: true,
    maxHeight: 300,
    searchInputProps: {
      placeholder: 'Search for options...',
    },
    visible: true,
  },
};

// Touch Types
export const TouchableOpacity: Story = {
  args: {
    data: sampleData,
    itemClickableAs: 'TouchableOpacity',
    maxHeight: 300,
    visible: true,
  },
};

export const Pressable: Story = {
  args: {
    data: sampleData,
    itemClickableAs: 'Pressable',
    maxHeight: 300,
    visible: true,
  },
};

export const TouchableHighlight: Story = {
  args: {
    data: sampleData,
    itemClickableAs: 'TouchableHighlight',
    maxHeight: 300,
    visible: true,
  },
};

export const RipplePressable: Story = {
  args: {
    data: sampleData,
    itemClickableAs: 'RipplePressable',
    maxHeight: 300,
    visible: true,
  },
};

export const NonClickable: Story = {
  args: {
    data: sampleData,
    itemClickableAs: 'none',
    maxHeight: 300,
    visible: true,
  },
};

// Size Variations
export const SmallHeight: Story = {
  args: {
    data: sampleData,
    maxHeight: 150,
    minHeight: 100,
    visible: true,
  },
};

export const LargeHeight: Story = {
  args: {
    data: largeDataSet,
    hasSearch: true,
    maxHeight: 500,
    minHeight: 200,
    visible: true,
  },
};

// Advanced Examples
export const WithCustomSearchInput: Story = {
  args: {
    data: sampleData,
    hasSearch: true,
    maxHeight: 300,
    searchInputProps: {
      leftIconAction: {
        iconName: 'magnifying-glass-solid',
        iconSize: 'sm',
      },
      placeholder: 'Type to filter...',
      size: 'lg',
    },
    visible: true,
  },
};

export const WithDropdownItemProps: Story = {
  args: {
    data: sampleData,
    dropdownItemProps: {
      activeBackgroundColor: '#007AFF20',
      stringItemProps: {
        colorVariant: 'primary',
        size: 'lg',
      },
    },
    maxHeight: 300,
    visible: true,
  },
};

export const WithCustomLoadingIndicator: Story = {
  args: {
    data: [],
    isLoading: true,
    loadingIndicatorProps: {
      color: '#FF6B35',
      name: 'dots',
      size: 'lg',
    },
    maxHeight: 300,
    visible: true,
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    data: largeDataSet,
    dropdownListProps: {
      getItemLayout: (_data: any, index: number) => ({
        index,
        length: 50,
        offset: 50 * index,
      }),
      keyExtractor: (item: any) => item.id.toString(),
    },
    hasSearch: true,
    maxHeight: 400,
    searchInputProps: {
      placeholder: 'Search in 50 items...',
    },
    visible: true,
  },
};

// Custom Styling Examples
export const WithTailwindClasses: Story = {
  args: {
    className: 'bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg',
    data: sampleData,
    hasSearch: true,
    maxHeight: 300,
    visible: true,
  },
};

export const WithCustomStyle: Story = {
  args: {
    data: sampleData,
    hasSearch: true,
    maxHeight: 300,
    style: {
      backgroundColor: '#f8f9fa',
      borderColor: '#dee2e6',
      borderRadius: 12,
      borderWidth: 2,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    visible: true,
  },
};

// Real-world Examples
export const CountrySelector: Story = {
  args: {
    data: [
      { flag: '🇺🇸', id: 1, label: 'United States', value: 'US' },
      { flag: '��', id: 2, label: 'United Kingdom', value: 'UK' },
      { flag: '��', id: 3, label: 'France', value: 'FR' },
      { flag: '��', id: 4, label: 'Germany', value: 'DE' },
      { flag: '��', id: 5, label: 'Japan', value: 'JP' },
    ],
    hasSearch: true,
    maxHeight: 300,
    searchInputProps: {
      leftIconAction: {
        iconName: 'magnifying-glass-solid',
      },
      placeholder: 'Search countries...',
    },
    visible: true,
  },
};

export const UserSelector: Story = {
  args: {
    data: userDataSet,
    hasSearch: true,
    maxHeight: 350,
    searchInputProps: {
      placeholder: 'Search users...',
    },
    visible: true,
  },
};

// Interactive Examples
export const SearchableWithAnimation: Story = {
  args: {
    data: sampleData,
    hasAnimation: true,
    hasSearch: true,
    hasShadow: true,
    itemClickableAs: 'RipplePressable',
    maxHeight: 300,
    searchInputProps: {
      leftIconAction: {
        iconColor: '#666',
        iconName: 'magnifying-glass-solid',
        iconSize: 'sm',
      },
      placeholder: 'Search with animation...',
    },
    visible: true,
  },
};

export const CompactDropdown: Story = {
  args: {
    data: sampleData.slice(0, 3),
    hasAnimation: false,
    itemClickableAs: 'TouchableOpacity',
    maxHeight: 150,
    minHeight: 120,
    visible: true,
  },
};

// Edge Cases
export const SingleItem: Story = {
  args: {
    data: [{ id: 1, label: 'Only Option', value: 'only' }],
    hasSearch: true,
    maxHeight: 300,
    visible: true,
  },
};

export const LongItemNames: Story = {
  args: {
    data: [
      { id: 1, label: 'This is a very long option name that might overflow', value: 'long1' },
      { id: 2, label: 'Another extremely long option that tests text wrapping behavior', value: 'long2' },
      { id: 3, label: 'Short', value: 'short' },
      { id: 4, label: 'Medium length option name', value: 'medium' },
    ],
    hasSearch: true,
    maxHeight: 300,
    visible: true,
  },
};

// Performance Test
export const PerformanceTest: Story = {
  args: {
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      label: `Performance Option ${i + 1}`,
      value: `perf${i + 1}`,
    })),
    dropdownListProps: {
      keyExtractor: (item: any) => item.id.toString(),
      maxToRenderPerBatch: 10,
      removeClippedSubviews: true,
      windowSize: 10,
    },
    hasSearch: true,
    maxHeight: 400,
    searchInputProps: {
      placeholder: 'Search in 1000 items...',
    },
    visible: true,
  },
};
