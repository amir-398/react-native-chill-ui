import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Toggle from '../src/components/toggle/toggle';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Toggle> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'The class name of the toggle',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the toggle is in loading state',
    },
    onChange: {
      action: 'onChange',
      description: 'The function to call when the toggle is changed',
    },
    size: {
      control: 'select',
      description: 'The size of the toggle',
      options: ['small', 'large'],
    },
    thumbColorOff: {
      control: 'color',
      description: 'The color of the thumb when the toggle is off',
    },
    thumbColorOn: {
      control: 'color',
      description: 'The color of the thumb when the toggle is on',
    },
    trackColorOff: {
      control: 'color',
      description: 'The color of the track when the toggle is off',
    },
    trackColorOn: {
      control: 'color',
      description: 'The color of the track when the toggle is on',
    },
    value: {
      control: 'boolean',
      description: 'The value of the toggle',
    },
  },
  component: Toggle,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'components/Toggle',
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    onChange: action('onChange'),
    value: false,
  },
};

export const Checked: Story = {
  args: {
    onChange: action('onChange'),
    value: true,
  },
};

export const Small: Story = {
  args: {
    onChange: action('onChange'),
    size: 'small',
    value: false,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    onChange: action('onChange'),
    value: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onChange: action('onChange'),
    value: false,
  },
};

export const WithCustomColors: Story = {
  args: {
    onChange: action('onChange'),
    thumbColorOff: 'red',
    thumbColorOn: 'blue',
    trackColorOff: 'green',
    trackColorOn: 'yellow',
    value: false,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'p-2 bg-primary',
    onChange: action('onChange'),
    thumbColorOff: 'red',
    thumbColorOn: 'blue',
    trackColorOff: 'green',
    trackColorOn: 'yellow',
    value: false,
  },
};

export const DifferentStates: Story = {
  render: () => (
    <UiPresentation>
      <Toggle onChange={action('onChange')} value={false} />
      <Toggle onChange={action('onChange')} value />
      <Toggle onChange={action('onChange')} isDisabled value={false} />
      <Toggle onChange={action('onChange')} isLoading value={false} />
      <Toggle onChange={action('onChange')} size="small" value={false} />
    </UiPresentation>
  ),
};
