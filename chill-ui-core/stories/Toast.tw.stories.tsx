import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, Button } from '../src/components';
import { ToastVariantType } from '../src/types/toast.types';
import { ToastProvider, useToast } from '../src/components/toast/ToastProvider.tw';

const tailwindVariants: ToastVariantType = {
  error: {
    className: 'bg-red-500 rounded-lg shadow-lg',
    iconProps: { name: 'xmark-circle-solid', className: 'text-white' },
    titleStringProps: { className: 'text-white font-bold' },
    messageStringProps: { className: 'text-white' },
    progressBarColor: '#FFFFFF',
  },
  info: {
    className: 'bg-blue-500 rounded-lg shadow-lg',
    iconProps: { name: 'circle-info-solid', className: 'text-white' },
    titleStringProps: { className: 'text-white font-bold' },
    messageStringProps: { className: 'text-white' },
    progressBarColor: '#FFFFFF',
  },
  success: {
    className: 'bg-green-500 rounded-lg shadow-lg',
    iconProps: { name: 'check-circle-solid', className: 'text-white' },
    titleStringProps: { className: 'text-white font-bold' },
    messageStringProps: { className: 'text-white' },
    progressBarColor: '#FFFFFF',
  },
  warning: {
    className: 'bg-yellow-500 rounded-lg shadow-lg',
    iconProps: { name: 'warning-solid', className: 'text-black' },
    titleStringProps: { className: 'text-black font-bold' },
    messageStringProps: { className: 'text-black' },
    progressBarColor: '#000000',
  },
};

function ToastDemo({
  duration,
  message,
  title,
  position,
  variant,
}: {
  message?: string;
  title?: string;
  position?: 'top' | 'bottom';
  variant?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}) {
  const { toast } = useToast();

  return (
    <Box className="flex flex-col" style={{ height: 200, paddingHorizontal: 10 }}>
      <Box className="flex-1 flex-row justify-around gap-5 px-5">
        <Box className="flex-1">
          <Button
            title="Show Toast"
            onPress={() => {
              toast({
                duration: duration || 3000,
                message: message || 'This is a toast message',
                title: title,
                position: position || 'bottom',
                variant: variant || 'info',
              });
              action('toast')(variant || 'info');
            }}
            size="sm"
            variant={variant || 'info'}
          />
        </Box>
      </Box>
    </Box>
  );
}

const meta: Meta<typeof ToastDemo> = {
  argTypes: {
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before the toast disappears',
    },
    message: {
      control: 'text',
      description: 'Message to display in the toast',
    },
    title: {
      control: 'text',
      description: 'Title to display in the toast',
    },
    position: {
      control: 'select',
      description: 'Position of the toast on screen',
      options: ['top', 'bottom'],
    },
    variant: {
      control: 'select',
      description: 'Type of toast to display',
      options: ['success', 'error', 'info', 'warning'],
    },
  },
  component: ToastDemo,
  decorators: [
    (Story: any) => (
      <Box className="flex-1">
        <ToastProvider variants={tailwindVariants}>
          <Story />
        </ToastProvider>
      </Box>
    ),
  ],
  title: 'components/Toast.tw',
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  args: {
    message: 'This is a default toast message with Tailwind',
    position: 'bottom',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    title: 'Success!',
    message: 'Operation completed successfully!',
    position: 'bottom',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    message: 'An error occurred!',
    position: 'bottom',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    message: 'Warning message!',
    position: 'bottom',
    variant: 'warning',
  },
};

export const TopPosition: Story = {
  args: {
    title: 'Top Toast',
    message: 'Toast at the top of the screen',
    position: 'top',
    variant: 'info',
  },
};

export const ComplexTailwind: Story = {
  args: {
    title: 'Complex Styling',
    message: 'This toast uses complex Tailwind classes for styling.',
    position: 'bottom',
    variant: 'success',
  },
};
