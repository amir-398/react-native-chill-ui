import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { Checkbox } from '../src/components';

const meta: Meta<typeof Checkbox> = {
  args: {
    iconColor: '#FFF',
    iconName: 'check-solid',
    isChecked: false,
    isDisabled: false,
    isLabelPressable: true,
    size: 'md',
    variant: 'square',
  },
  argTypes: {
    iconColor: {
      table: {
        defaultValue: {
          summary: '#FFF',
        },
      },
    },
    iconName: {
      table: {
        defaultValue: {
          summary: 'check-solid',
        },
      },
    },
    isChecked: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    isDisabled: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    isLabelPressable: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    onChange: {
      action: 'changed',
    },
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
          summary: 'square',
        },
      },
    },
  },
  component: Checkbox,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    isChecked: false,
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    label: 'Checked Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Disabled Checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    isChecked: true,
    isDisabled: true,
    label: 'Disabled Checked Checkbox',
  },
};

export const CustomSize: Story = {
  args: {
    checkboxSize: 30,
    label: 'Custom Size Checkbox',
  },
};

export const CustomColors: Story = {
  args: {
    checkedColor: '#FF0000',
    iconColor: '#FFFFFF',
    label: 'Custom Colors Checkbox',
    uncheckedColor: '#CCCCCC',
  },
};

export const Circle: Story = {
  args: {
    label: 'Rounded Checkbox',
    variant: 'circle',
  },
};

export const WithoutLabel: Story = {
  args: {
    isChecked: false,
  },
};
