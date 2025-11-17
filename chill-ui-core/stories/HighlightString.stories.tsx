import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { HighlightStringImpl as HighlightString } from '../src/components/highlightString/components/HighlightString.tw';

const meta: Meta<typeof HighlightString> = {
  argTypes: {
    highlightClassName: {
      table: {
        defaultValue: {
          summary: 'bg-[#FFE4B5]',
        },
      },
    },
  },
  component: HighlightString,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'CONTENT/HighlightString',
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
