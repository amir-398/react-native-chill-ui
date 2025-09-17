import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import HighlightString from '../src/components/highlightString';

const meta: Meta<typeof HighlightString> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for the container (NativeWind only)',
    },
    highlightClassName: {
      control: 'text',
      description: 'Custom CSS classes for highlighted text (NativeWind only)',
    },
    highlightStringProps: {
      control: 'object',
      description: 'Props for the highlighted string component',
    },
    highlightStyle: {
      control: 'object',
      description: 'Custom styles for highlighted text (StyleSheet only)',
    },
    highlightTerm: {
      control: 'text',
      description: 'The term to highlight within the text',
    },
    stringProps: {
      control: 'object',
      description: 'Props for the main string component',
    },
    style: {
      control: 'object',
      description: 'Custom styles for the container (StyleSheet only)',
    },
    text: {
      control: 'text',
      description: 'The full text to display',
    },
  },
  component: HighlightString,
  decorators: [
    (Story: any) => (
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
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: 'world',
    text: 'Hello world, welcome to the world of programming',
  },
};

export const CustomHighlightStyle: Story = {
  args: {
    className: 'text-lg text-gray-900',
    highlightClassName: 'bg-blue-100 text-blue-800 underline',
    highlightTerm: 'react native',
    text: 'Search results for "react native" development',
  },
};

export const MultipleOccurrences: Story = {
  args: {
    className: 'text-base text-gray-700',
    highlightClassName: 'bg-orange-200 text-orange-800 font-semibold',
    highlightTerm: 'fox',
    text: 'The quick brown fox jumps over the lazy fox. Another fox appears.',
  },
};

export const CaseInsensitive: Story = {
  args: {
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-green-200 text-green-800 font-medium',
    highlightTerm: 'react native',
    text: 'React Native, react native, REACT NATIVE - all the same!',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
    highlightTerm: 'user@example.com',
    text: 'Search for "user@example.com" or "john.doe@company.org"',
  },
};

export const LongText: Story = {
  args: {
    className: 'text-sm text-gray-600 leading-relaxed max-w-md',
    highlightClassName: 'bg-yellow-200 text-yellow-900 font-semibold',
    highlightTerm: 'HighlightString',
    text: 'This is a very long text that demonstrates how the HighlightString component handles longer content. It will highlight the specified term wherever it appears in the text, making it easy for users to find relevant information.',
  },
};

export const CodeExample: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono bg-gray-100 p-3 rounded',
    highlightClassName: 'bg-blue-200 text-blue-800 font-bold',
    highlightTerm: 'useState',
    text: 'Use the useState hook to manage component state and useEffect for side effects',
  },
};

export const SearchResults: Story = {
  args: {
    className: 'text-sm text-gray-600',
    highlightClassName: 'bg-blue-100 text-blue-800 font-medium',
    highlightTerm: 'mobile development',
    text: 'Found 15 results for "mobile development"',
  },
};

export const FormValidation: Story = {
  args: {
    className: 'text-sm text-red-600',
    highlightClassName: 'bg-red-100 text-red-800 font-semibold',
    highlightTerm: 'valid email address',
    text: 'Please enter a valid email address and password',
  },
};

export const UserNotification: Story = {
  args: {
    className: 'text-sm text-gray-600',
    highlightClassName: 'bg-green-100 text-green-800 font-medium',
    highlightTerm: 'John Doe',
    text: 'User John Doe has joined the channel #general',
  },
};

export const OrderConfirmation: Story = {
  args: {
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-green-100 text-green-800 font-mono font-semibold',
    highlightTerm: '#12345',
    text: 'Your order #12345 has been shipped and will arrive on Monday',
  },
};

export const WithoutNativeWind: Story = {
  args: {
    highlightStyle: {
      backgroundColor: '#FEF3C7',
      borderRadius: 4,
      color: '#92400E',
      fontWeight: '600',
      paddingHorizontal: 4,
    },
    highlightTerm: 'StyleSheet',
    style: {
      color: '#374151',
      fontSize: 16,
      lineHeight: 24,
    },
    text: 'This example uses StyleSheet styles instead of NativeWind classes',
  },
};

export const WithCustomStringProps: Story = {
  args: {
    className: 'text-base text-gray-700',
    highlightClassName: 'bg-green-100 text-green-800 cursor-pointer',
    highlightStringProps: {
      selectable: true,
    },
    highlightTerm: 'click here',
    stringProps: {
      selectable: true,
    },
    text: 'Click here to learn more about our services',
  },
};

export const EmptyHighlightTerm: Story = {
  args: {
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: '',
    text: 'This text has no highlight term specified',
  },
};

export const WhitespaceHighlightTerm: Story = {
  args: {
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: '   ',
    text: 'This text has whitespace in the highlight term',
  },
};

export const RegexSpecialCharacters: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
    highlightTerm: '(a+b)*',
    text: 'Search for patterns like (a+b)* or [0-9]+ in regex',
  },
};

export const MixedContent: Story = {
  args: {
    className: 'text-base text-gray-800',
    highlightClassName: 'bg-blue-100 text-blue-800 font-semibold',
    highlightTerm: 'mobile development',
    text: 'Welcome to our platform! 🚀 Learn about React Native 📱 and mobile development 📱',
  },
};
