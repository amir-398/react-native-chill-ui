import type { Meta, StoryObj } from '@storybook/react';

import { Carousel, Box, Button } from '../src/components';

const meta: Meta<typeof Carousel> = {
  argTypes: {
    dotActiveColor: {
      control: 'color',
    },
    dotColor: {
      control: 'color',
    },
    dotGap: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
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
  component: Carousel,
  title: 'Components/Carousel',
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

function CustomImageSlider() {
  return (
    <Box className="h-52">
      <Carousel items={sampleImages} />
    </Box>
  );
}

function WithChildrenComponent(props: any) {
  return (
    <Carousel dotOffset={30} {...props}>
      <Box className="w-full px-1">
        <Button variant="primary" size="sm" title="Next" />
      </Box>
    </Carousel>
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
  render: (args: any) => <WithChildrenComponent {...args} />,
};
