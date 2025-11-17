import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Image } from 'react-native';

import { ICONS_OPTIONS } from '../src/constants';
import UiPresentation from './storybook/UiPresentation';
import {
  CarouselTw as Carousel,
  CarouselContentTw as CarouselContent,
  CarouselDotsTw as CarouselDots,
  CarouselElementTw as CarouselElement,
  CarouselItemTw as CarouselItem,
  CarouselNextTw as CarouselNext,
  CarouselPreviousTw as CarouselPrevious,
} from '../src/components';

const meta: Meta<typeof Carousel> = {
  args: {
    autoPlay: false,
    orientation: 'horizontal',
  },
  argTypes: {
    activeColor: {
      control: 'color',
      description: 'Active color for the dots',
      table: {
        category: 'CarouselDots Props',
        defaultValue: {
          summary: '#fff',
        },
        type: { summary: 'string' },
      },
    },
    autoPlay: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    autoPlayDirection: {
      table: {
        defaultValue: {
          summary: 'forward',
        },
      },
    },
    autoPlayInterval: {
      table: {
        defaultValue: {
          summary: 3000,
        },
      },
    },
    autoPlayLoop: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    'classname²': {
      action: 'text',
      description: 'Custom class name for the content container',
      table: {
        category: 'CarouselContent Props',
        type: { summary: 'string' },
      },
    },
    'classname³': {
      action: 'text',
      description: 'Custom class name for the dots container',
      table: {
        category: 'CarouselDots Props',
        type: { summary: 'string' },
      },
    },
    'classname⁴': {
      action: 'text',
      description: 'Custom class name for the element container',
      table: {
        category: 'CarouselElement Props',
        type: { summary: 'string' },
      },
    },
    'classname⁵': {
      action: 'text',
      description: 'Custom class name for the element container',
      table: {
        category: 'CarouselItem Props',
        type: { summary: 'string' },
      },
    },
    'classname⁶': {
      control: 'text',
      description: 'Custom class name for the next button',
      table: {
        category: 'CarouselNext Props',
        type: { summary: 'string' },
      },
    },
    'classname⁷': {
      action: 'text',
      description: 'Custom class name for the previous button',
      table: {
        category: 'CarouselPrevious Props',
        type: { summary: 'string' },
      },
    },
    FlatListProps: {
      action: 'object',
      description: 'accept all FlatList props except renderItem, data, horizontal, onViewableItemsChanged and ref',
      table: {
        category: 'CarouselContent Props',
        type: { summary: 'object' },
      },
    },
    iconName: {
      control: 'select',
      description: 'Name of the icon to use for the next button',
      options: ICONS_OPTIONS,
      table: {
        category: 'CarouselNext Props',
        defaultValue: {
          summary: 'angle-right-solid',
        },
        type: { summary: 'string' },
      },
    },
    'iconName²': {
      control: 'select',
      description: 'Name of the icon to use for the previous button',
      options: ICONS_OPTIONS,
      table: {
        category: 'CarouselPrevious Props',
        defaultValue: {
          summary: 'angle-left-solid',
        },
        type: { summary: 'string' },
      },
    },

    iconProps: {
      control: 'object',
      description: 'Additional props for the icon component',
      table: {
        category: 'CarouselNext Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'IconProps' },
      },
    },
    'iconProps²': {
      control: 'object',
      description: 'Additional props for the icon component',
      table: {
        category: 'CarouselPrevious Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'IconProps' },
      },
    },
    inactiveColor: {
      control: 'color',
      description: 'Inactive color for the dots',
      table: {
        category: 'CarouselDots Props',
        defaultValue: {
          summary: '#a1a1a1',
        },
        type: { summary: 'string' },
      },
    },
    initialIndex: {
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    offset: {
      control: 'number',
      table: {
        category: 'CarouselElement Props',
        defaultValue: {
          summary: 16,
        },
        type: { summary: 'Number' },
      },
    },
    orientation: {
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    position: {
      control: 'select',
      options: ['bottom', 'top'],
      table: {
        category: 'CarouselElement Props',
        defaultValue: {
          summary: 'bottom',
        },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      description: 'Size for the dots',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: {
        category: 'CarouselDots Props',
        defaultValue: {
          summary: '2xs',
        },
        type: { summary: 'IconProps["size"]' },
      },
    },
    style: {
      control: 'object',
      description: 'Custom style for the carousel container',
      table: {
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Custom style for the content container',
      table: {
        category: 'CarouselContent Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Custom style for the dots container',
      table: {
        category: 'CarouselDots Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style⁴': {
      control: 'object',
      description: 'Custom style for the element container',
      table: {
        category: 'CarouselElement Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style⁵': {
      control: 'object',
      description: 'Custom style for the carousel item',
      table: {
        category: 'CarouselItem Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style⁶': {
      control: 'object',
      description: 'Custom style for the next button',
      table: {
        category: 'CarouselNext Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'style⁷': {
      control: 'object',
      description: 'Custom style for the previous button',
      table: {
        category: 'CarouselPrevious Props',
        defaultValue: {
          summary: '{}',
        },
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
  },
  component: Carousel,
  decorators: [
    Story => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  subcomponents: {
    CarouselContent,
    CarouselDots,
    CarouselElement,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  },
  title: 'DATA DISPLAY/Carousel',
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const sampleImages = [
  {
    id: '1',
    title: 'Première image',
    uri: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    title: 'Deuxième image',
    uri: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    title: 'Troisième image',
    uri: 'https://picsum.photos/800/600?random=3',
  },
];

export const Default: Story = {
  render: (_args: any) => (
    <Carousel className="h-64 w-96 overflow-hidden rounded-md">
      <CarouselContent>
        {sampleImages.map((image, index) => (
          <CarouselItem key={index}>
            <Image source={{ uri: image.uri }} className="size-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement>
        <CarouselDots />
      </CarouselElement>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithCustomDot: Story = {
  render: (_args: any) => (
    <Carousel className="h-64 w-96 overflow-hidden rounded-md">
      <CarouselContent>
        {sampleImages.map((image, index) => (
          <CarouselItem key={index}>
            <Image source={{ uri: image.uri }} className="size-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement>
        <CarouselDots activeColor="blue" />
      </CarouselElement>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const VerticalCarousel: Story = {
  render: (_args: any) => (
    <Carousel className="h-96 w-64 overflow-hidden rounded-lg" orientation="vertical">
      <CarouselContent>
        {sampleImages.map((image, index) => (
          <CarouselItem key={index} className="h-1/3">
            <Image source={{ uri: image.uri }} className="size-full object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement position="right">
        <CarouselDots orientation="vertical" />
      </CarouselElement>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const AutoPlayCarousel: Story = {
  render: (_args: any) => (
    <Carousel autoPlay autoPlayInterval={2000} className="h-80 w-full overflow-hidden rounded-xl">
      <CarouselContent>
        {sampleImages.map((image, index) => (
          <CarouselItem key={index} className="px-2">
            <Image source={{ uri: image.uri }} className="size-full rounded-lg object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement>
        <CarouselDots activeColor="#3b82f6" inactiveColor="#6b7280" size="md" />
      </CarouselElement>
    </Carousel>
  ),
};
