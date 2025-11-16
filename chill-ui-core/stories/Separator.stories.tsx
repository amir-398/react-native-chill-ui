import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { SeparatorTw as Separator } from '../src/components/separator';

const meta: Meta<typeof Separator> = {
  argTypes: {},
  component: Separator,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'DATA DISPLAY/Separator',
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
  render: (_args: any) => (
    <Box className="w-full p-4">
      <String>Content Above</String>
      <Separator />
      <String>Content Below</String>
    </Box>
  ),
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
      backgroundColor: '#10B981',
      borderRadius: 1,
      height: 2,
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
      marginHorizontal: 8,
      marginVertical: 16,
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
      backgroundColor: '#8B5CF6',
      borderRadius: 1.5,
      height: 3,
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

export const Dotted: Story = {
  args: {
    style: {
      backgroundColor: 'transparent',
      borderColor: '#D1D5DB',
      borderStyle: 'dashed',
      borderWidth: 1,
      height: 1,
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
