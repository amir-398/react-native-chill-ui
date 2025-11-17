import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useState } from 'react';

import { String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { Slider, SliderLabel, SliderRange, SliderThumb, SliderTrack } from '../src/components/slider';

const meta: Meta<typeof Slider> = {
  args: {
    animateTransitions: true,
    animationType: 'timing',
    animationTypeThumb: 'extend',
    defaultValue: [50],
    disabled: false,
    index: 0,
    maximumValue: 1,
    minimumValue: 0,
    orientation: 'horizontal',
    position: 'top',
    step: 0,
    touchSize: 40,
    trackClickable: true,
  },
  argTypes: {
    animateTransitions: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },

    animationType: {
      table: {
        defaultValue: {
          summary: 'timing',
        },
      },
    },
    'animationType°': {
      control: 'radio',
      description: 'Animation type for the thumb:',
      options: ['extend', 'shrink'],

      table: {
        category: 'SliderThumb Props',
        defaultValue: {
          summary: 'extend',
        },
      },
    },

    animationTypeThumb: {
      table: {
        defaultValue: {
          summary: 'extend',
        },
      },
    },
    className: {
      table: {
        category: 'SliderLabel Props',
      },
    },
    'className (SliderRange)': {
      control: 'text',
      description: 'Custom CSS classes for styling (NativeWind only)',
      table: {
        category: 'SliderRange Props',
        type: {
          summary: 'string',
        },
      },
    },
    'className (SliderThumb)': {
      control: 'text',
      description: 'Custom CSS classes for styling (NativeWind only)',
      table: {
        category: 'SliderThumb Props',
        type: {
          summary: 'string',
        },
      },
    },
    'className (SliderTrack)': {
      control: 'text',
      description: 'Custom CSS classes for styling (NativeWind only)',
      table: {
        category: 'SliderTrack Props',
        type: {
          summary: 'string',
        },
      },
    },
    defaultValue: {
      table: {
        defaultValue: {
          summary: 50,
        },
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    index: {
      table: {
        category: 'SliderLabel Props',
      },
    },
    'index (SliderThumb)': {
      control: 'number',
      description: 'Index of the thumb (for multiple thumbs)',
      table: {
        category: 'SliderThumb Props',
        type: {
          summary: 'number',
        },
      },
    },
    maximumValue: {
      table: {
        defaultValue: {
          summary: 1,
        },
      },
    },
    minimumValue: {
      table: {
        defaultValue: {
          summary: 0,
        },
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
      control: 'radio',
      description: 'Position relative to the thumb:',
      options: ['top', 'bottom'],
      table: {
        category: 'SliderLabel Props',
        defaultValue: {
          summary: 'top',
        },
        type: {
          summary: "'top' | 'bottom'",
        },
      },
    },
    step: {
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },

    stringProps: {
      description: 'Props for String component when children is a string',
      table: {
        category: 'SliderLabel Props',
      },
    },
    touchSize: {
      control: 'number',
      description: 'Touch area size in pixels',
      table: {
        category: 'SliderThumb Props',
        defaultValue: {
          summary: 40,
        },
        type: {
          summary: 'number',
        },
      },
    },
    trackClickable: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    ViewProps: {
      control: 'object',
      description: 'accept all View props',
    },
    'ViewProps (SliderLabel)': {
      control: 'object',
      description: 'accept all View props',
      table: {
        category: 'SliderLabel Props',
      },
    },
    'ViewProps (SliderRange)': {
      control: 'object',
      description: 'accept all View props',
      table: {
        category: 'SliderRange Props',
      },
    },
    'ViewProps (SliderThumb)': {
      control: 'object',
      description: 'accept all View props',
      table: {
        category: 'SliderThumb Props',
      },
    },
  },
  component: Slider,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  subcomponents: {
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
  },
  title: 'FORMS/Slider',
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    maximumValue: 100,
    minimumValue: 0,
  },
  render: (args: any) => (
    <Slider {...args}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  ),
};

const withLabelComponent = (args: any) => {
  const [value, setValue] = useState(50);
  console.log(value);

  return (
    <Slider {...args} value={value} onValueChange={setValue}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
      <SliderLabel position="top" className="bg-transparent">
        {Math.round(value)}%
      </SliderLabel>
    </Slider>
  );
};

export const WithLabel: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with a label above the thumb displaying the current value',
      },
    },
  },
  render: (args: any) => withLabelComponent(args),
};

const withRangeComponent = (args: any) => {
  const [range, setRange] = useState([20, 80]);

  return (
    <Slider {...args} value={range} onValueChange={setRange}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} />
      <SliderThumb index={1} />
      <SliderLabel position="top" index={0} className="bg-transparent">
        {Math.round(range[0])}%
      </SliderLabel>
      <SliderLabel position="top" index={1} className="bg-transparent">
        {Math.round(range[1])}%
      </SliderLabel>
    </Slider>
  );
};

export const RangeSlider: Story = {
  args: {
    defaultValue: [20, 80],
    maximumValue: 100,
    minimumValue: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with two thumbs for selecting a range of values',
      },
    },
  },
  render: (args: any) => withRangeComponent(args),
};

const withStepsComponent = (args: any) => {
  const [value, setValue] = useState([50]);

  return (
    <Slider {...args} value={value} onValueChange={setValue}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
      <SliderLabel position="top" className="bg-transparent">
        {Math.round(value[0])}%
      </SliderLabel>
    </Slider>
  );
};

export const WithSteps: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
    step: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with discrete steps (increments of 10)',
      },
    },
  },
  render: (args: any) => withStepsComponent(args),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider in a disabled state',
      },
    },
  },
  render: () => (
    <Slider value={50} minimumValue={0} maximumValue={100} isDisabled>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
      <SliderLabel position="top">50</SliderLabel>
    </Slider>
  ),
};

const withCustomStylingComponent = (args: any) => {
  const [value, setValue] = useState(75);

  return (
    <Slider {...args} value={value} onValueChange={setValue}>
      <SliderTrack className="h-2 rounded-full bg-gray-200">
        <SliderRange className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      </SliderTrack>
      <SliderThumb className="size-6 border-2 border-blue-500 bg-white shadow-lg" />
      <SliderLabel position="top" className="mb-1 rounded-lg bg-blue-500 px-3 py-1">
        <String className="text-sm font-bold text-white">{Math.round(value)}%</String>
      </SliderLabel>
    </Slider>
  );
};

export const CustomStyling: Story = {
  args: {
    maximumValue: 100,
    minimumValue: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom styling using Tailwind classes',
      },
    },
  },
  render: (args: any) => withCustomStylingComponent(args),
};
