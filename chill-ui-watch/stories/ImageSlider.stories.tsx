import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button } from '@/components';
import { ImageSliderProps } from '@/types';

import ImageSlider from '../src/components/imageSlider/ImageSlider';

const meta: Meta<typeof ImageSlider> = {
  argTypes: {
    dotActiveColor: {
      control: 'color',
    },
    dotColor: {
      control: 'color',
    },
    dotGap: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    },
    dotOffset: {
      control: 'number',
      description: 'Offset for the dot container',
    },
    dotPosition: {
      control: 'select',
      options: ['bottom', 'top'],
    },
    dotSize: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    },
    dotSpacing: {
      control: 'number',
      description: 'Spacing for the dot container',
    },
    hasDot: {
      control: 'boolean',
      description: 'Show or hide the dot',
    },
    items: {
      control: 'object',
      description: 'Items for the image slider',
    },
    textClassName: {
      control: 'text',
      description: 'Class name for the text container',
    },
    textColor: {
      control: 'color',
    },
    textSize: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    },

    textVariant: {
      control: 'select',
      options: [
        'title-1',
        'title-2',
        'title-3',
        'title-4',
        'subtitle-1',
        'subtitle-2',
        'subtitle-3',
        'subtitle-4',
        'body-1',
        'body-2',
        'body-3',
        'body-4',
      ],
    },
    textWeight: {
      control: 'select',
      options: ['bold', 'medium', 'regular', 'light'],
    },
    wrapperClassName: {
      control: 'text',
      description: 'Class name for the wrapper container',
    },
  },
  component: ImageSlider,
  title: 'Components/ImageSlider',
};

export default meta;
type Story = StoryObj<typeof ImageSlider>;

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

function CustomImageSlider() {
  return (
    <Box className="h-52">
      <ImageSlider items={sampleImages} />
    </Box>
  );
}

function WithChildrenComponent(props: ImageSliderProps) {
  return (
    <ImageSlider dotOffset={30} {...props}>
      <Box className="w-full px-1">
        <Button variant="primary" size="sm" title="Next" />
      </Box>
    </ImageSlider>
  );
}

export const Default: Story = {
  args: {
    dotActiveColor: 'white',
    dotColor: 'grey',
    dotOffset: 26,
    dotPosition: 'bottom',
    dotSize: 'xs',
    hasDot: true,
    items: sampleImages,
    textColor: 'white',
    textSize: '4xl',
    textWeight: 'bold',
  },
};

export const WithCustomDot: Story = {
  args: {
    dotActiveColor: 'blue',
    dotColor: '#a1a1a1',
    dotSize: 'md',
    items: sampleImages,
  },
};

export const WithCustomWrapper: Story = {
  render: () => <CustomImageSlider />,
};

export const WithChildren: Story = {
  args: {
    hasDot: true,
    items: sampleImages,
  },
  render: args => <WithChildrenComponent {...args} />,
};
