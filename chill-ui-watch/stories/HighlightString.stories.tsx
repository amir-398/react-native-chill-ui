import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import HighlightString from '../src/components/highlightString/HighlightString';

const meta: Meta<typeof HighlightString> = {
  argTypes: {
    // Basic configuration
    highlightTerm: {
      control: 'text',
      description: 'The term to highlight in the text',
    },
    text: {
      control: 'text',
      description: 'The text to display',
    },

    // Styling
    className: {
      control: 'text',
      description: 'CSS class for the main text',
    },
    highlightClassName: {
      control: 'text',
      description: 'CSS class for the highlighted text',
    },
    highlightStyle: {
      control: 'object',
      description: 'Style for the highlighted text',
    },
    style: {
      control: 'object',
      description: 'Style for the main text',
    },

    // String Props
    stringProps: {
      control: 'object',
      description:
        'Props passed to the main String component (size, font, weight, variant, colorVariant, position, numberOfLines, useFastText)',
    },

    // Highlight String Props
    highlightStringProps: {
      control: 'object',
      description:
        'Props passed to the highlighted String component (size, font, weight, variant, colorVariant, position)',
    },
  },
  component: HighlightString,
  decorators: [
    Story => (
      <UiPresentation className="flex-1 items-center justify-center px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Text/HighlightString',
};

export default meta;
type Story = StoryObj<typeof HighlightString>;

export const Default: Story = {
  args: {
    highlightTerm: 'sample',
    stringProps: {},
    style: {
      color: 'black',
    },
    text: 'This is a sample text with some words to highlight',
  },
};

export const MultipleMatches: Story = {
  args: {
    highlightTerm: 'the',
    stringProps: {},
    text: 'The quick brown fox jumps over the lazy dog. The fox is quick and the dog is lazy.',
  },
};

export const NoMatch: Story = {
  args: {
    highlightTerm: 'xyz',
    stringProps: {},
    text: 'This text does not contain the search term',
  },
};

export const EmptyHighlightTerm: Story = {
  args: {
    highlightTerm: '',
    stringProps: {},
    text: 'This text will not be highlighted',
  },
};

export const WithCustomStyles: Story = {
  args: {
    highlightStyle: {
      backgroundColor: '#FFD700',
      borderRadius: 3,
      color: '#000',
      fontWeight: 'bold',
      padding: 2,
    },
    highlightTerm: 'custom',
    stringProps: {},
    style: {
      color: '#333',
      fontFamily: 'Arial',
      fontSize: 16,
    },
    text: 'This text has custom styling for both normal and highlighted text',
  },
};

export const WithTailwindClasses: Story = {
  args: {
    className: 'text-gray-700',
    highlightClassName: 'bg-yellow-300 text-black font-bold px-1 rounded',
    highlightTerm: 'Tailwind',
    stringProps: {},
    text: 'This example uses Tailwind CSS classes for styling',
  },
};

export const WithStringProps: Story = {
  args: {
    highlightTerm: 'important',
    stringProps: {
      colorVariant: 'primary',
      font: 'primary',
      position: 'center',
      size: 'lg',
      weight: 'medium',
    },
    text: 'This is an important message with string props',
  },
};

export const WithHighlightStringProps: Story = {
  args: {
    highlightStringProps: {
      colorVariant: 'danger',
      font: 'secondary',
      size: 'xl',
      weight: 'bold',
    },
    highlightTerm: 'error',
    stringProps: {
      colorVariant: 'dark',
      font: 'primary',
      size: 'md',
      weight: 'regular',
    },
    text: 'This is an error message that needs attention',
  },
};

export const VariantStyles: Story = {
  args: {
    highlightTerm: 'title',
    stringProps: {
      position: 'center',
      variant: 'title-2',
    },
    text: 'This is a title with highlight',
  },
};

export const ColorVariants: Story = {
  args: {
    highlightStringProps: {
      colorVariant: 'success',
      weight: 'bold',
    },
    highlightTerm: 'success',
    stringProps: {
      colorVariant: 'dark',
    },
    text: 'This is a success message with color variants',
  },
};

export const SpecialCharacters: Story = {
  args: {
    highlightTerm: '$100',
    stringProps: {},
    text: 'Testing special characters: $100, (parentheses), [brackets], {braces}, *asterisk*, +plus+',
  },
};

export const AllPropsExample: Story = {
  args: {
    className: 'text-purple-700',
    highlightClassName: 'bg-yellow-400 text-black font-bold px-1 rounded',
    highlightStringProps: {
      colorVariant: 'danger',
      font: 'secondary',
      size: 'xl',
      weight: 'bold',
    },
    highlightStyle: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    highlightTerm: 'comprehensive',
    stringProps: {
      colorVariant: 'primary',
      font: 'primary',
      numberOfLines: 3,
      position: 'center',
      size: 'lg',
      useFastText: false,
      variant: 'body-xl',
      weight: 'medium',
    },
    style: {
      letterSpacing: 0.5,
      lineHeight: 24,
    },
    text: 'This is a comprehensive example that demonstrates all available props and their combinations working together',
  },
};
