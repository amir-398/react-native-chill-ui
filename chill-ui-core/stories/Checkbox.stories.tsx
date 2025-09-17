import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import Checkbox from '../src/components/checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    checkboxSize: {
      control: 'number',
      description: 'Custom size for the checkbox',
    },
    checkedClassName: {
      control: 'text',
      description: 'Additional CSS classes when checked',
    },
    checkedColor: {
      control: 'color',
      description: 'Background color when checked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the checkbox container',
    },
    customIcon: {
      control: 'object',
      description: 'Custom icon component to use instead of default',
    },
    iconColor: {
      control: 'color',
      description: 'Color of the check icon',
    },
    iconName: {
      control: 'text',
      description: 'Name of the icon to use',
    },
    isChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    labelClassName: {
      control: 'text',
      description: 'Additional CSS classes for the label',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when checkbox state changes',
    },
    size: {
      control: 'select',
      description: 'Size variant of the checkbox',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    uncheckedColor: {
      control: 'color',
      description: 'Background color when unchecked',
    },
    variant: {
      control: 'select',
      description: 'Visual variant of the checkbox',
      options: ['square', 'circle'],
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
