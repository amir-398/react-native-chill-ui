import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import Separator from '../src/components/separator/components/Separator';

const meta: Meta<typeof Separator> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for styling the separator',
    },
    style: {
      control: 'object',
      description: 'Style object for the separator',
    },
  },
  component: Separator,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <String>Content Above</String>
          <Story />
          <String>Content Below</String>
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/Separator',
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic separator with default styling',
      },
    },
  },
};

export const Thick: Story = {
  args: {
    className: 'h-0.5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Thicker separator using className',
      },
    },
  },
};

export const ExtraThick: Story = {
  args: {
    className: 'h-1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra thick separator',
      },
    },
  },
};

export const CustomColor: Story = {
  args: {
    className: 'bg-blue-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with custom blue color',
      },
    },
  },
};

export const CustomStyle: Story = {
  args: {
    style: {
      height: 2,
      backgroundColor: '#10B981',
      borderRadius: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with custom style object',
      },
    },
  },
};

export const WithMargins: Story = {
  args: {
    className: 'my-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with vertical margins',
      },
    },
  },
};

export const WithPadding: Story = {
  args: {
    style: {
      marginVertical: 16,
      marginHorizontal: 8,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with custom margins using style',
      },
    },
  },
};

export const Rounded: Story = {
  args: {
    style: {
      height: 3,
      backgroundColor: '#8B5CF6',
      borderRadius: 1.5,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with rounded corners',
      },
    },
  },
};

export const WithOpacity: Story = {
  args: {
    style: {
      backgroundColor: '#000000',
      opacity: 0.3,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with reduced opacity',
      },
    },
  },
};

export const WithShadow: Story = {
  args: {
    style: {
      height: 1,
      backgroundColor: '#000000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with shadow effect',
      },
    },
  },
};

export const CustomWidth: Story = {
  args: {
    style: {
      height: 1,
      width: '50%',
      alignSelf: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with custom width (50%)',
      },
    },
  },
};

export const Dotted: Story = {
  args: {
    style: {
      height: 1,
      backgroundColor: 'transparent',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#D1D5DB',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dotted separator using border style',
      },
    },
  },
};

export const Gradient: Story = {
  args: {
    className: 'h-1 bg-gradient-to-r from-blue-500 to-purple-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Gradient separator using className',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    className: 'h-0.5 bg-gray-300 my-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact separator with small margins',
      },
    },
  },
};

export const InCard: Story = {
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box className="rounded-lg border border-gray-200 p-4">
            <String className="text-lg font-bold">Card Title</String>
            <Story />
            <String className="text-gray-600">Card content goes here</String>
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  args: {
    className: 'my-3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator used inside a card component',
      },
    },
  },
};

export const InList: Story = {
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box>
            <String className="font-semibold">List Item 1</String>
            <Story />
            <String className="font-semibold">List Item 2</String>
            <Story />
            <String className="font-semibold">List Item 3</String>
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  args: {
    className: 'my-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator used between list items',
      },
    },
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full bg-gray-900 p-4">
          <String className="text-white">Content Above</String>
          <Story />
          <String className="text-white">Content Below</String>
        </Box>
      </UiPresentation>
    ),
  ],
  args: {
    className: 'bg-white/30',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with dark theme styling',
      },
    },
  },
};

export const MultipleSeparators: Story = {
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <String>Section 1</String>
          <Separator className="my-2" />
          <String>Section 2</String>
          <Separator className="my-2 h-0.5 bg-blue-500" />
          <String>Section 3</String>
          <Separator className="my-2 h-1 bg-gradient-to-r from-green-500 to-blue-500" />
          <String>Section 4</String>
        </Box>
      </UiPresentation>
    ),
  ],
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Multiple separators with different styles',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    accessible: true,
    accessibilityLabel: 'Content separator',
    testID: 'separator',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with accessibility props',
      },
    },
  },
};

export const AllProps: Story = {
  args: {
    className: 'custom-separator',
    style: {
      height: 2,
      backgroundColor: '#F59E0B',
      marginVertical: 12,
      borderRadius: 1,
      opacity: 0.8,
    },
    accessible: true,
    accessibilityLabel: 'Custom separator',
    testID: 'custom-separator',
  },
  parameters: {
    docs: {
      description: {
        story: 'Separator with all props combined',
      },
    },
  },
};