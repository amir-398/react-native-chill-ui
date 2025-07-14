import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import Badge from '../src/components/badge/Badge';

const meta: Meta<typeof Badge> = {
  argTypes: {
    badgeColor: {
      control: 'color',
      description: 'Color of the badge background',
    },
    className: {
      control: 'text',
      description: 'Additional className for the badge',
    },
    iconProps: {
      control: 'object',
      description: 'Props for the Icon component',
    },
    rounded: {
      control: 'select',
      description: 'Border radius of the badge',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    size: {
      control: 'select',
      description: 'Size of the badge content',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    stringProps: {
      control: 'object',
      description: 'Props for the String component',
    },
    textColor: {
      control: 'color',
      description: 'Color of the badge text',
    },
  },
  component: Badge,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'UI/Badge',
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    rounded: 'md',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    iconProps: {
      name: 'check-solid',
    },
    rounded: 'md',
    size: 'md',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    rounded: 'full',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    rounded: 'md',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    rounded: 'md',
    size: 'lg',
  },
};

export const CustomColors: Story = {
  args: {
    children: 'Custom',
    className: 'bg-blue-500',
    rounded: 'md',
    size: 'md',
  },
};
