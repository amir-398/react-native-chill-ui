import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import { Toggle } from '../src/components';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Toggle> = {
  args: {
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    isDisabled: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    isLoading: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    thumbColorOff: {
      control: {
        type: 'color',
      },
      table: {
        defaultValue: {
          summary: '#f3f3f3',
        },
      },
    },
    thumbColorOn: {
      control: {
        type: 'color',
      },
      table: {
        defaultValue: {
          summary: '#FFF',
        },
      },
    },
    trackColorOff: {
      control: {
        type: 'color',
      },
      table: {
        defaultValue: {
          summary: '#CBCFD3',
        },
      },
    },
    trackColorOn: {
      control: {
        type: 'color',
      },
      table: {
        defaultValue: {
          summary: '#3f83f8',
        },
      },
    },
  },
  component: Toggle,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FORMS/Toggle',
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    onChange: action('onChange'),
    value: false,
  },
  render: () => <Toggle />,
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
    size: 'sm',
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
  render: (_args: any) => (
    <Toggle thumbColorOff="red" thumbColorOn="blue" trackColorOff="green" trackColorOn="yellow" />
  ),
};
