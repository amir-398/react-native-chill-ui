import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, Button } from '../src/components';
import { ToastVariantType } from '../src/types/toast.types';
import { ToastProvider, useToast } from '../src/components/toast/ToastProvider';

const defaultVariants: ToastVariantType = {
  error: {
    backgroundColor: '#F44336',
    iconProps: { name: 'xmark-circle-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2196F3',
    iconProps: { name: 'circle-info-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  success: {
    backgroundColor: '#4CAF50',
    iconProps: { name: 'check-circle-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#FF9800',
    iconProps: { name: 'warning-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
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
        <ToastProvider variants={defaultVariants}>
          <Story />
        </ToastProvider>
      </Box>
    ),
  ],
  title: 'components/Toast',
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  args: {
    message: 'This is a default toast message',
    position: 'bottom',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    position: 'bottom',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred!',
    position: 'bottom',
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning message!',
    position: 'bottom',
    variant: 'warning',
  },
};

export const TopPosition: Story = {
  args: {
    message: 'Toast at the top of the screen',
    position: 'top',
    variant: 'info',
  },
};

export const BottomPosition: Story = {
  args: {
    message: 'Toast at the bottom of the screen',
    position: 'bottom',
    variant: 'info',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a very long message that should wrap to multiple lines in the toast notification. It demonstrates how the toast handles longer content.',
    position: 'bottom',
    variant: 'info',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Success!',
    message: 'Your action was completed successfully.',
    position: 'bottom',
    variant: 'success',
  },
};

export const WithTitleAndLongMessage: Story = {
  args: {
    title: 'Important Notice',
    message:
      'This is a very long message that should wrap to multiple lines in the toast notification. It demonstrates how the toast handles longer content with a title.',
    position: 'bottom',
    variant: 'warning',
  },
};

export const ShortDuration: Story = {
  args: {
    title: 'Quick Toast',
    message: 'This toast will disappear quickly.',
    duration: 1000,
    position: 'bottom',
    variant: 'info',
  },
};

export const LongDuration: Story = {
  args: {
    title: 'Persistent Toast',
    message: 'This toast will stay visible for a long time.',
    duration: 8000,
    position: 'bottom',
    variant: 'info',
  },
};

export const TopWithTitle: Story = {
  args: {
    title: 'Top Toast',
    message: 'This toast appears at the top of the screen.',
    position: 'top',
    variant: 'info',
  },
};

export const ErrorWithTitle: Story = {
  args: {
    title: 'Error Occurred',
    message: 'Something went wrong. Please try again.',
    position: 'bottom',
    variant: 'error',
  },
};

export const WarningWithTitle: Story = {
  args: {
    title: 'Warning',
    message: 'Please be careful with this action.',
    position: 'bottom',
    variant: 'warning',
  },
};

export const SuccessWithTitle: Story = {
  args: {
    title: 'Success!',
    message: 'Your operation completed successfully.',
    position: 'bottom',
    variant: 'success',
  },
};
