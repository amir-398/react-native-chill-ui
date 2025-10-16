import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, Button, ToastProvider, useToast } from '../src/components';

const defaultVariants: any = {
  error: {
    backgroundColor: '#F44336',
    iconProps: { color: '#FFFFFF', name: 'xmark-circle-solid' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
    titleStringProps: { color: '#FFFFFF' },
  },
  info: {
    backgroundColor: '#2196F3',
    iconProps: { color: '#FFFFFF', name: 'circle-info-solid' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
    titleStringProps: { color: '#FFFFFF' },
  },
  success: {
    backgroundColor: '#4CAF50',
    iconProps: { color: '#FFFFFF', name: 'check-circle-solid' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
    titleStringProps: { color: '#FFFFFF' },
  },
  warning: {
    backgroundColor: '#FF9800',
    iconProps: { color: '#FFFFFF', name: 'warning-solid' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
    titleStringProps: { color: '#FFFFFF' },
  },
};

function ToastDemo({
  duration,
  message,
  position,
  title,
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
                position: position || 'bottom',
                title,
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
    position: {
      control: 'select',
      description: 'Position of the toast on screen',
      options: ['top', 'bottom'],
    },
    title: {
      control: 'text',
      description: 'Title to display in the toast',
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
    message: 'Your action was completed successfully.',
    position: 'bottom',
    title: 'Success!',
    variant: 'success',
  },
};

export const WithTitleAndLongMessage: Story = {
  args: {
    message:
      'This is a very long message that should wrap to multiple lines in the toast notification. It demonstrates how the toast handles longer content with a title.',
    position: 'bottom',
    title: 'Important Notice',
    variant: 'warning',
  },
};

export const ShortDuration: Story = {
  args: {
    duration: 1000,
    message: 'This toast will disappear quickly.',
    position: 'bottom',
    title: 'Quick Toast',
    variant: 'info',
  },
};

export const LongDuration: Story = {
  args: {
    duration: 8000,
    message: 'This toast will stay visible for a long time.',
    position: 'bottom',
    title: 'Persistent Toast',
    variant: 'info',
  },
};

export const TopWithTitle: Story = {
  args: {
    message: 'This toast appears at the top of the screen.',
    position: 'top',
    title: 'Top Toast',
    variant: 'info',
  },
};

export const ErrorWithTitle: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    position: 'bottom',
    title: 'Error Occurred',
    variant: 'error',
  },
};

export const WarningWithTitle: Story = {
  args: {
    message: 'Please be careful with this action.',
    position: 'bottom',
    title: 'Warning',
    variant: 'warning',
  },
};

export const SuccessWithTitle: Story = {
  args: {
    message: 'Your operation completed successfully.',
    position: 'bottom',
    title: 'Success!',
    variant: 'success',
  },
};
