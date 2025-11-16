import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook/UiPresentation';
import { SkeletonTw as Skeleton, BoxTw as Box, StringTw as String } from '../src/components';

const meta: Meta<typeof Skeleton> = {
  args: {
    size: 'md',
    variant: 'rectangle',
  },
  argTypes: {
    size: {
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'rectangle',
        },
      },
    },
  },
  component: Skeleton,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FEEDBACK & OVERLAY/Skeleton',
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic skeleton with default rectangle variant and md size',
      },
    },
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rectangle skeleton for cards and content blocks',
      },
    },
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle skeleton for avatars and profile pictures',
      },
    },
  },
};

export const Square: Story = {
  args: {
    variant: 'square',
  },
  parameters: {
    docs: {
      description: {
        story: 'Square skeleton for images and thumbnails',
      },
    },
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text skeleton for content lines and paragraphs',
      },
    },
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small skeleton size',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small skeleton size',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium skeleton size (default)',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large skeleton size',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large skeleton size',
      },
    },
  },
};

export const CardSkeleton: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box className="rounded-lg border p-4">
            <Box className="mb-3 flex-row items-center">
              <Skeleton variant="circle" size="sm" className="mr-3" />
              <Box className="flex-1">
                <Skeleton variant="text" size="md" className="mb-1" />
                <Skeleton variant="text" size="sm" className="w-3/4" />
              </Box>
            </Box>
            <Skeleton variant="rectangle" size="lg" className="mb-2" />
            <Skeleton variant="text" size="sm" className="w-2/3" />
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Card skeleton layout with multiple skeleton elements',
      },
    },
  },
};

export const ListSkeleton: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box>
            {[1, 2, 3].map(item => (
              <Box key={item} className="mb-3 flex-row items-center">
                <Skeleton variant="circle" size="sm" className="mr-3" />
                <Box className="flex-1">
                  <Skeleton variant="text" size="md" className="mb-1" />
                  <Skeleton variant="text" size="sm" className="w-2/3" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'List skeleton layout with multiple items',
      },
    },
  },
};

export const ProfileSkeleton: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box className="items-center">
            <Skeleton variant="circle" size="lg" className="mb-4" />
            <Skeleton variant="text" size="lg" className="mb-2 w-32" />
            <Skeleton variant="text" size="sm" className="mb-4 w-24" />
            <Skeleton variant="rectangle" size="md" className="w-full" />
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Profile skeleton layout with avatar and content',
      },
    },
  },
};

export const ImageGallerySkeleton: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box className="flex-row flex-wrap">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <Skeleton key={item} variant="square" size="md" className="m-1 w-1/3" />
            ))}
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Image gallery skeleton with grid layout',
      },
    },
  },
};

export const TextContentSkeleton: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box>
            <Skeleton variant="text" size="lg" className="mb-3" />
            <Skeleton variant="text" size="md" className="mb-2" />
            <Skeleton variant="text" size="md" className="mb-2" />
            <Skeleton variant="text" size="md" className="mb-2 w-3/4" />
            <Skeleton variant="text" size="sm" className="mb-4 w-1/2" />
            <Skeleton variant="text" size="md" className="mb-2" />
            <Skeleton variant="text" size="md" className="mb-2" />
            <Skeleton variant="text" size="md" className="w-2/3" />
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Text content skeleton for articles and posts',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {},
  decorators: [
    () => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Box className="space-y-4">
            <Box>
              <String className="mb-2 text-sm font-semibold">Rectangle</String>
              <Skeleton variant="rectangle" size="md" />
            </Box>
            <Box>
              <String className="mb-2 text-sm font-semibold">Square</String>
              <Skeleton variant="square" size="md" />
            </Box>
            <Box>
              <String className="mb-2 text-sm font-semibold">Circle</String>
              <Skeleton variant="circle" size="md" />
            </Box>
            <Box>
              <String className="mb-2 text-sm font-semibold">Text</String>
              <Skeleton variant="text" size="md" />
            </Box>
          </Box>
        </Box>
      </UiPresentation>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'All skeleton variants compared',
      },
    },
  },
};
