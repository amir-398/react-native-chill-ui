import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { Box, Icon, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { Slider, SliderLabel, SliderRange, SliderThumb, SliderTrack } from '../src/components/slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/Slider',
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Slider with a single thumb',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{value}%</SliderLabel>
      </Slider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with a label above the thumb displaying the current value',
      },
    },
  },
};

export const RangeSlider: Story = {
  render: () => {
    const [range, setRange] = useState([20, 80]);

    return (
      <Slider
        value={range}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with two thumbs for selecting a range of values',
      },
    },
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        step={10}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with discrete steps (increments of 10)',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Slider value={50} minimumValue={0} maximumValue={100} isDisabled>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
      <SliderLabel position="top">50</SliderLabel>
    </Slider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider in a disabled state',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState(60);

    return (
      <Box style={{ height: 200 }}>
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={100}
          orientation="vertical"
          onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with vertical orientation',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState(75);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom styling using Tailwind classes',
      },
    },
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
          setValue(values[0]);
          action('onValueChange')(values);
        }}
        onSlidingStart={values => action('onSlidingStart')(values)}
        onSlidingComplete={values => action('onSlidingComplete')(values)}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">{value}</SliderLabel>
      </Slider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with callbacks for sliding start and complete events',
      },
    },
  },
};

export const VolumeControl: Story = {
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
          onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Volume control slider',
      },
    },
  },
};

export const PriceRange: Story = {
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
          onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Price range filter',
      },
    },
  },
};

export const WithCustomLabel: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <Slider
        value={value}
        minimumValue={1}
        maximumValue={5}
        step={1}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom label content displaying rating text',
      },
    },
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState(20);

    return (
      <Slider
        value={temp}
        minimumValue={10}
        maximumValue={30}
        step={0.5}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Temperature control with gradient background',
      },
    },
  },
};

export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState(70);

    return (
      <Slider
        value={brightness}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Brightness control with icon label',
      },
    },
  },
};

export const WithLabelBelow: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with label positioned below the thumb',
      },
    },
  },
};

export const WithSpringAnimation: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        animationType="spring"
        animationConfig={{ damping: 20, mass: 1, stiffness: 200 }}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with spring animation and scaling thumb',
      },
    },
  },
};

export const ThumbAnimationExtend: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with thumb that extends when sliding (default animation)',
      },
    },
  },
};

export const ThumbAnimationScale: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with thumb that scales when sliding',
      },
    },
  },
};

export const ThumbAnimationNone: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with no thumb animation',
      },
    },
  },
};

export const NonClickableTrack: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
  parameters: {
    docs: {
      description: {
        story: 'Slider with non-clickable track (only thumb is draggable)',
      },
    },
  },
};

export const WithCustomStringProps: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        onValueChange={values => {
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
            size: 'sm',
            weight: 'bold',
            color: '#FF0000',
          }}
        >
          {value}%
        </SliderLabel>
      </Slider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom string props for label styling',
      },
    },
  },
};
