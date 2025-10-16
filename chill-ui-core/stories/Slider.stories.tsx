import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useState } from 'react';
import { action } from 'storybook/actions';

import { Box, Icon, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { Slider, SliderLabel, SliderRange, SliderThumb, SliderTrack } from '../src/components/slider';

const meta: Meta<typeof Slider> = {
  args: {
    animateTransitions: true,
    animationType: 'timing',
    animationTypeThumb: 'extend',
    disabled: false,
    index: 0,
    maximumValue: 1,
    minimumValue: 0,
    orientation: 'horizontal',
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
    animationTypeThumb: {
      table: {
        defaultValue: {
          summary: 'extend',
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
        defaultValue: {
          summary: 0,
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
    step: {
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    touchSize: {
      table: {
        defaultValue: {
          summary: 40,
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
    maximumValue: 100,
    minimumValue: 0,
    value: 50,
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

export const RangeSlider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with two thumbs for selecting a range of values',
      },
    },
  },
  render: () => {
    const [range, setRange] = useState([20, 80]);

    return (
      <Slider
        value={range}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setRange(values);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange className="bg-blue-500" />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
        <SliderLabel position="top" index={0}>
          {range[0]}
        </SliderLabel>
        <SliderLabel position="top" index={1}>
          {range[1]}
        </SliderLabel>
      </Slider>
    );
  },
};

export const WithSteps: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with discrete steps (increments of 10)',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        step={10}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
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

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with vertical orientation',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(60);

    return (
      <Box style={{ height: 200 }}>
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={100}
          orientation="vertical"
          onValueChange={(values: any) => {
            setValue(values[0]);
            action('onValueChange')(values);
          }}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
          <SliderLabel position="top">{value}</SliderLabel>
        </Slider>
      </Box>
    );
  },
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom styling using Tailwind classes',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(75);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack className="h-2 rounded-full bg-gray-200">
          <SliderRange className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </SliderTrack>
        <SliderThumb className="size-6 border-2 border-blue-500 bg-white shadow-lg" />
        <SliderLabel position="top" className="rounded-lg bg-blue-500 px-3 py-1">
          <String className="text-sm font-bold text-white">{value}%</String>
        </SliderLabel>
      </Slider>
    );
  },
};

export const WithCallbacks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with callbacks for sliding start and complete events',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
        onSlidingStart={(values: any) => action('onSlidingStart')(values)}
        onSlidingComplete={(values: any) => action('onSlidingComplete')(values)}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const VolumeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Volume control slider',
      },
    },
  },
  render: () => {
    const [volume, setVolume] = useState(70);

    return (
      <Box className="p-4">
        <String className="mb-2 text-lg font-semibold">Volume</String>
        <Slider
          value={volume}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={(values: any) => {
            setVolume(values[0]);
            action('onValueChange')(values);
          }}
        >
          <SliderTrack className="h-1 bg-gray-200">
            <SliderRange className="bg-blue-500" />
          </SliderTrack>
          <SliderThumb className="size-5 bg-blue-500" />
          <SliderLabel position="top">{volume}%</SliderLabel>
        </Slider>
      </Box>
    );
  },
};

export const PriceRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Price range filter',
      },
    },
  },
  render: () => {
    const [priceRange, setPriceRange] = useState([200, 800]);

    return (
      <Box className="p-4">
        <String className="mb-2 text-lg font-semibold">Price Range</String>
        <Slider
          value={priceRange}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          onValueChange={(values: any) => {
            setPriceRange(values);
            action('onValueChange')(values);
          }}
        >
          <SliderTrack className="h-2 bg-gray-200">
            <SliderRange className="bg-green-500" />
          </SliderTrack>
          <SliderThumb index={0} className="size-6 bg-green-500" />
          <SliderThumb index={1} className="size-6 bg-green-500" />
          <SliderLabel position="top" index={0}>
            ${priceRange[0]}
          </SliderLabel>
          <SliderLabel position="top" index={1}>
            ${priceRange[1]}
          </SliderLabel>
        </Slider>
      </Box>
    );
  },
};

export const WithCustomLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom label content displaying rating text',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <Slider
        value={value}
        minimumValue={1}
        maximumValue={5}
        step={1}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">
          <Box className="rounded-full bg-purple-500 px-3 py-1">
            <String className="font-bold text-white">{['Bad', 'Poor', 'Good', 'Great', 'Excellent'][value - 1]}</String>
          </Box>
        </SliderLabel>
      </Slider>
    );
  },
};

export const TemperatureControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Temperature control with gradient background',
      },
    },
  },
  render: () => {
    const [temp, setTemp] = useState(20);

    return (
      <Slider
        value={temp}
        minimumValue={10}
        maximumValue={30}
        step={0.5}
        onValueChange={(values: any) => {
          setTemp(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange className="bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500" />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{temp}°C</SliderLabel>
      </Slider>
    );
  },
};

export const BrightnessControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Brightness control with icon label',
      },
    },
  },
  render: () => {
    const [brightness, setBrightness] = useState(70);

    return (
      <Slider
        value={brightness}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setBrightness(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack className="h-2 bg-gray-800">
          <SliderRange className="bg-yellow-400" />
        </SliderTrack>
        <SliderThumb className="size-6 bg-yellow-400 shadow-lg shadow-yellow-400/50" />
        <SliderLabel position="top">
          <Icon name="sun" size="sm" color="white" />
        </SliderLabel>
      </Slider>
    );
  },
};

export const WithLabelBelow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with label positioned below the thumb',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="bottom">{value}%</SliderLabel>
      </Slider>
    );
  },
};

export const WithSpringAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with spring animation and scaling thumb',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        animationType="spring"
        animationConfig={{ damping: 20, mass: 1, stiffness: 200 }}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="scale" />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const ThumbAnimationExtend: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with thumb that extends when sliding (default animation)',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="extend" />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const ThumbAnimationScale: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with thumb that scales when sliding',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="scale" />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const ThumbAnimationNone: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with no thumb animation',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="none" />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const NonClickableTrack: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with non-clickable track (only thumb is draggable)',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack clickable={false}>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
};

export const WithCustomStringProps: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom string props for label styling',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(values: any) => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel
          position="top"
          stringProps={{
            color: '#FF0000',
            size: 'sm',
            weight: 'bold',
          }}
        >
          {value}%
        </SliderLabel>
      </Slider>
    );
  },
};
