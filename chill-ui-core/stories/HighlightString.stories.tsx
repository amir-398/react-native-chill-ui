import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { HighlightString } from '../src/components';

const meta: Meta<typeof HighlightString> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for the container (NativeWind only)',
    },
    content: {
      control: 'text',
      description: 'The full text to display',
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
      description: 'Custom styles for highlighted text',
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
      description: 'Custom styles for the container',
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
    content: 'Hello world, welcome to the world of programming',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: 'world',
  },
};

export const CustomHighlightStyle: Story = {
  args: {
    className: 'text-lg text-gray-900',
    content: 'Search results for "react native" development',
    highlightClassName: 'bg-blue-100 text-blue-800 underline',
    highlightTerm: 'react native',
  },
};

export const MultipleOccurrences: Story = {
  args: {
    className: 'text-base text-gray-700',
    content: 'The quick brown fox jumps over the lazy fox. Another fox appears.',
    highlightClassName: 'bg-orange-200 text-orange-800 font-semibold',
    highlightTerm: 'fox',
  },
};

export const CaseInsensitive: Story = {
  args: {
    className: 'text-base text-gray-800',
    content: 'React Native, react native, REACT NATIVE - all the same!',
    highlightClassName: 'bg-green-200 text-green-800 font-medium',
    highlightTerm: 'react native',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono',
    content: 'Search for "user@example.com" or "john.doe@company.org"',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
    highlightTerm: 'user@example.com',
  },
};

export const LongText: Story = {
  args: {
    className: 'text-sm text-gray-600 leading-relaxed max-w-md',
    content:
      'This is a very long text that demonstrates how the HighlightString component handles longer content. It will highlight the specified term wherever it appears in the text, making it easy for users to find relevant information.',
    highlightClassName: 'bg-yellow-200 text-yellow-900 font-semibold',
    highlightTerm: 'HighlightString',
  },
};

export const CodeExample: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono bg-gray-100 p-3 rounded',
    content: 'Use the useState hook to manage component state and useEffect for side effects',
    highlightClassName: 'bg-blue-200 text-blue-800 font-bold',
    highlightTerm: 'useState',
  },
};

export const SearchResults: Story = {
  args: {
    className: 'text-sm text-gray-600',
    content: 'Found 15 results for "mobile development"',
    highlightClassName: 'bg-blue-100 text-blue-800 font-medium',
    highlightTerm: 'mobile development',
  },
};

export const FormValidation: Story = {
  args: {
    className: 'text-sm text-red-600',
    content: 'Please enter a valid email address and password',
    highlightClassName: 'bg-red-100 text-red-800 font-semibold',
    highlightTerm: 'valid email address',
  },
};

export const UserNotification: Story = {
  args: {
    className: 'text-sm text-gray-600',
    content: 'User John Doe has joined the channel #general',
    highlightClassName: 'bg-green-100 text-green-800 font-medium',
    highlightTerm: 'John Doe',
  },
};

export const OrderConfirmation: Story = {
  args: {
    className: 'text-base text-gray-800',
    content: 'Your order #12345 has been shipped and will arrive on Monday',
    highlightClassName: 'bg-green-100 text-green-800 font-mono font-semibold',
    highlightTerm: '#12345',
  },
};

export const WithoutNativeWind: Story = {
  args: {
    content: 'This example uses StyleSheet styles instead of NativeWind classes',
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
  },
};

export const WithCustomStringProps: Story = {
  args: {
    className: 'text-base text-gray-700',
    content: 'Click here to learn more about our services',
    highlightClassName: 'bg-green-100 text-green-800 cursor-pointer',
    highlightStringProps: {
      selectable: true,
    },
    highlightTerm: 'click here',
    stringProps: {
      selectable: true,
    },
  },
};

export const EmptyHighlightTerm: Story = {
  args: {
    className: 'text-base text-gray-800',
    content: 'This text has no highlight term specified',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: '',
  },
};

export const WhitespaceHighlightTerm: Story = {
  args: {
    className: 'text-base text-gray-800',
    content: 'This text has whitespace in the highlight term',
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightTerm: '   ',
  },
};

export const RegexSpecialCharacters: Story = {
  args: {
    className: 'text-sm text-gray-700 font-mono',
    content: 'Search for patterns like (a+b)* or [0-9]+ in regex',
    highlightClassName: 'bg-purple-100 text-purple-800 font-bold',
    highlightTerm: '(a+b)*',
  },
};

export const MixedContent: Story = {
  args: {
    className: 'text-base text-gray-800',
    content: 'Welcome to our platform! 🚀 Learn about React Native 📱 and mobile development 📱',
    highlightClassName: 'bg-blue-100 text-blue-800 font-semibold',
    highlightTerm: 'mobile development',
  },
};
