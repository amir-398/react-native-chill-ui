import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { MaskedInput } from '../src/components/maskedInput';

const meta: Meta<typeof MaskedInput> = {
  argTypes: {
    mask: {
      control: 'text',
      description: 'The mask pattern to apply (9 for digits)',
    },
  },
  component: MaskedInput,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/MaskedTextInput',
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const PhoneNumber: Story = {
  args: {
    mask: '99 99 99 99 99',
    placeholder: 'Enter phone number',
  },
};

export const DateInput: Story = {
  args: {
    mask: '99/99/9999',
    placeholder: 'Enter date (DD/MM/YYYY)',
  },
};

export const CreditCard: Story = {
  args: {
    mask: '9999 9999 9999 9999',
    placeholder: 'Enter credit card number',
    value: '12345678 9012 3456',
  },
};
