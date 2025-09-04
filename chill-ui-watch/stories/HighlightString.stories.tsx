import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import HighlightString from '../src/components/highlightString';

const meta: Meta<typeof HighlightString> = {
  argTypes: {
    text: {
      control: 'text',
      description: 'The full text to display',
    },
    highlightTerm: {
      control: 'text',
      description: 'The term to highlight within the text',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for the container (NativeWind only)',
    },
    highlightClassName: {
      control: 'text',
      description: 'Custom CSS classes for highlighted text (NativeWind only)',
    },
    style: {
      control: 'object',
      description: 'Custom styles for the container (StyleSheet only)',
    },
    highlightStyle: {
      control: 'object',
      description: 'Custom styles for highlighted text (StyleSheet only)',
    },
    stringProps: {
      control: 'object',
      description: 'Props for the main string component',
    },
    highlightStringProps: {
      control: 'object',
      description: 'Props for the highlighted string component',
    },
  },
  component: HighlightString,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/HighlightString',
};

export default meta;
type Story = StoryObj<typeof HighlightString>;

export const Default: Story = {
  args: {
    text: 'Hello world, welcome to the world of programming',
    highlightTerm: 'world',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
  },
};

export const CustomHighlightStyle: Story = {
  args: {
    text: 'Search results for "react native" development',
    highlightTerm: 'react native',
    className: 'text-lg text-gray-900',
    highlightClassName: 'bg-blue-100 text-blue-800 underline',
  },
};

export const MultipleOccurrences: Story = {
  args: {
    text: 'The quick brown fox jumps over the lazy fox. Another fox appears.',
    highlightTerm: 'fox',
    className: 'text-base text-gray-700',
    highlightClassName: 'bg-orange-200 text-orange-800 font-semibold',
  },
};

export const CaseInsensitive: Story = {
  args: {
    text: 'React Native, react native, REACT NATIVE - all the same!',
    highlightTerm: 'react native',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-green-200 text-green-800 font-medium',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    text: 'Search for "user@example.com" or "john.doe@company.org"',
    highlightTerm: 'user@example.com',
    className: 'text-sm text-gray-700 font-mono',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a very long text that demonstrates how the HighlightString component handles longer content. It will highlight the specified term wherever it appears in the text, making it easy for users to find relevant information.',
    highlightTerm: 'HighlightString',
    className: 'text-sm text-gray-600 leading-relaxed max-w-md',
    highlightClassName: 'bg-yellow-200 text-yellow-900 font-semibold',
  },
};

export const CodeExample: Story = {
  args: {
    text: 'Use the useState hook to manage component state and useEffect for side effects',
    highlightTerm: 'useState',
    className: 'text-sm text-gray-700 font-mono bg-gray-100 p-3 rounded',
    highlightClassName: 'bg-blue-200 text-blue-800 font-bold',
  },
};

export const SearchResults: Story = {
  args: {
    text: 'Found 15 results for "mobile development"',
    highlightTerm: 'mobile development',
    className: 'text-sm text-gray-600',
    highlightClassName: 'bg-blue-100 text-blue-800 font-medium',
  },
};

export const FormValidation: Story = {
  args: {
    text: 'Please enter a valid email address and password',
    highlightTerm: 'valid email address',
    className: 'text-sm text-red-600',
    highlightClassName: 'bg-red-100 text-red-800 font-semibold',
  },
};

export const UserNotification: Story = {
  args: {
    text: 'User John Doe has joined the channel #general',
    highlightTerm: 'John Doe',
    className: 'text-sm text-gray-600',
    highlightClassName: 'bg-green-100 text-green-800 font-medium',
  },
};

export const OrderConfirmation: Story = {
  args: {
    text: 'Your order #12345 has been shipped and will arrive on Monday',
    highlightTerm: '#12345',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-green-100 text-green-800 font-mono font-semibold',
  },
};

export const WithoutNativeWind: Story = {
  args: {
    text: 'This example uses StyleSheet styles instead of NativeWind classes',
    highlightTerm: 'StyleSheet',
    style: {
      fontSize: 16,
      color: '#374151',
      lineHeight: 24,
    },
    highlightStyle: {
      backgroundColor: '#FEF3C7',
      color: '#92400E',
      fontWeight: '600',
      paddingHorizontal: 4,
      borderRadius: 4,
    },
  },
};

export const WithCustomStringProps: Story = {
  args: {
    text: 'Click here to learn more about our services',
    highlightTerm: 'click here',
    className: 'text-base text-gray-700',
    highlightClassName: 'bg-green-100 text-green-800 cursor-pointer',
    stringProps: {
      selectable: true,
    },
    highlightStringProps: {
      selectable: true,
    },
  },
};

export const EmptyHighlightTerm: Story = {
  args: {
    text: 'This text has no highlight term specified',
    highlightTerm: '',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
  },
};

export const WhitespaceHighlightTerm: Story = {
  args: {
    text: 'This text has whitespace in the highlight term',
    highlightTerm: '   ',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
  },
};

export const RegexSpecialCharacters: Story = {
  args: {
    text: 'Search for patterns like (a+b)* or [0-9]+ in regex',
    highlightTerm: '(a+b)*',
    className: 'text-sm text-gray-700 font-mono',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
  },
};

export const MixedContent: Story = {
  args: {
    text: 'Welcome to our platform! 🚀 Learn about React Native 📱 and mobile development 📱',
    highlightTerm: 'mobile development',
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-blue-100 text-blue-800 font-semibold',
  },
};
