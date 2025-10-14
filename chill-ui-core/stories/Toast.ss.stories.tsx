import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, Button } from '../src/components';
import { ToastVariantType } from '../src/types/toast.types';
import { ToastProvider, useToast } from '../src/components/toast/ToastProvider.ss';

const styleSheetVariants: ToastVariantType = {
  error: {
    style: {
      backgroundColor: '#F44336',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconProps: {
      name: 'xmark-circle-solid',
      style: { color: '#FFFFFF', fontSize: 20 },
    },
    titleStringProps: {
      style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    },
    messageStringProps: {
      style: { color: '#FFFFFF', fontSize: 14 },
    },
    progressBarColor: '#FFFFFF',
  },
  info: {
    style: {
      backgroundColor: '#2196F3',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconProps: {
      name: 'circle-info-solid',
      style: { color: '#FFFFFF', fontSize: 20 },
    },
    titleStringProps: {
      style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    },
    messageStringProps: {
      style: { color: '#FFFFFF', fontSize: 14 },
    },
    progressBarColor: '#FFFFFF',
  },
  success: {
    style: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconProps: {
      name: 'check-circle-solid',
      style: { color: '#FFFFFF', fontSize: 20 },
    },
    titleStringProps: {
      style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    },
    messageStringProps: {
      style: { color: '#FFFFFF', fontSize: 14 },
    },
    progressBarColor: '#FFFFFF',
  },
  warning: {
    style: {
      backgroundColor: '#FF9800',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconProps: {
      name: 'warning-solid',
      style: { color: '#FFFFFF', fontSize: 20 },
    },
    titleStringProps: {
      style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    },
    messageStringProps: {
      style: { color: '#FFFFFF', fontSize: 14 },
    },
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
        <ToastProvider variants={styleSheetVariants}>
          <Story />
        </ToastProvider>
      </Box>
    ),
  ],
  title: 'components/Toast.ss',
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  args: {
    message: 'This is a default toast message with StyleSheet',
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

export const ComplexStyleSheet: Story = {
  args: {
    title: 'Complex Styling',
    message: 'This toast uses complex StyleSheet styles with shadows and elevation.',
    position: 'bottom',
    variant: 'success',
  },
};
