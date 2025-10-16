import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Toggle } from '../src/components';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Toggle> = {
  args: {
    isDisabled: false,
    isLoading: false,
    size: 'md',
    thumbColorOff: '#f3f3f3',
    thumbColorOn: '#FFF',
    trackColorOff: '#CBCFD3',
    trackColorOn: '#3f83f8',
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
    onChange: {
      action: 'onChange',
    },
    size: {
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    thumbColorOff: {
      table: {
        defaultValue: {
          summary: '#f3f3f3',
        },
      },
    },
    thumbColorOn: {
      table: {
        defaultValue: {
          summary: '#FFF',
        },
      },
    },
    trackColorOff: {
      table: {
        defaultValue: {
          summary: '#CBCFD3',
        },
      },
    },
    trackColorOn: {
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
