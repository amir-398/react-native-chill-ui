import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { MaskedInput } from '../src/components/maskedInput';

const meta: Meta<typeof MaskedInput> = {
  component: MaskedInput,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'FORMS/MaskedInput',
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

// Basic MaskedInputs
export const Default: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: 'Enter phone number',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Phone Number',
    mask: '(999) 999-9999',
    placeholder: 'Enter your phone number',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Phone Number',
    mask: '(999) 999-9999',
    placeholder: 'Enter your phone number',
    value: '(555) 123-4567',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Disabled Phone Input',
    mask: '(999) 999-9999',
    placeholder: 'This input is disabled',
    value: '(555) 123-4567',
  },
};

// Different Mask Patterns
export const PhoneNumber: Story = {
  args: {
    label: 'US Phone Number',
    mask: '(999) 999-9999',
    placeholder: '(555) 123-4567',
  },
};

export const CreditCard: Story = {
  args: {
    label: 'Credit Card',
    mask: '9999 9999 9999 9999',
    placeholder: '1234 5678 9012 3456',
  },
};

export const SocialSecurityNumber: Story = {
  args: {
    label: 'Social Security Number',
    mask: '999-99-9999',
    placeholder: '123-45-6789',
  },
};

export const DateInput: Story = {
  args: {
    label: 'Birth Date',
    mask: '99/99/9999',
    placeholder: 'MM/DD/YYYY',
  },
};

export const CurrencyInput: Story = {
  args: {
    label: 'Amount',
    mask: '$999,999.99',
    placeholder: '$1,234.56',
  },
};

export const ZipCode: Story = {
  args: {
    label: 'ZIP Code',
    mask: '99999',
    placeholder: '12345',
  },
};
