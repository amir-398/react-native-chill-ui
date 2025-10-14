import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, Button } from '../src/components';
import { ToastVariantType } from '../src/types/toast.types';
import { ToastProvider, useToast } from '../src/components/toast/ToastProvider';

const advancedVariants: ToastVariantType = {
  error: {
    backgroundColor: '#F44336',
    iconProps: { name: 'xmark-circle-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF', fontWeight: 'bold' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2196F3',
    iconProps: { name: 'circle-info-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF', fontWeight: 'bold' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  success: {
    backgroundColor: '#4CAF50',
    iconProps: { name: 'check-circle-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF', fontWeight: 'bold' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#FF9800',
    iconProps: { name: 'warning-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF', fontWeight: 'bold' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
  custom: {
    backgroundColor: '#9C27B0',
    iconProps: { name: 'star-solid', color: '#FFFFFF' },
    titleStringProps: { color: '#FFFFFF', fontWeight: 'bold' },
    messageStringProps: { color: '#FFFFFF' },
    progressBarColor: '#FFFFFF',
  },
};

function AdvancedToastDemo({
  allowMultiple,
  swipeable,
  offsetY,
  defaultDuration,
  maxToasts,
}: {
  allowMultiple?: boolean;
  swipeable?: boolean;
  offsetY?: number;
  defaultDuration?: number;
  maxToasts?: number;
}) {
  const { toast } = useToast();

  const showMultipleToasts = () => {
    toast({ message: 'First toast', variant: 'success' });
    setTimeout(() => toast({ message: 'Second toast', variant: 'info' }), 500);
    setTimeout(() => toast({ message: 'Third toast', variant: 'warning' }), 1000);
  };

  return (
    <Box className="flex flex-col" style={{ height: 300, paddingHorizontal: 10 }}>
      <Box className="flex-1 flex-col gap-3 px-5">
        <Box className="flex-row gap-2">
          <Button
            title="Success"
            onPress={() => {
              toast({
                title: 'Success!',
                message: 'Operation completed successfully.',
                variant: 'success',
              });
              action('toast')('success');
            }}
            size="sm"
            variant="success"
          />
          <Button
            title="Error"
            onPress={() => {
              toast({
                title: 'Error',
                message: 'Something went wrong.',
                variant: 'error',
              });
              action('toast')('error');
            }}
            size="sm"
            variant="error"
          />
        </Box>

        <Box className="flex-row gap-2">
          <Button
            title="Info"
            onPress={() => {
              toast({
                title: 'Information',
                message: 'Here is some useful information.',
                variant: 'info',
              });
              action('toast')('info');
            }}
            size="sm"
            variant="info"
          />
          <Button
            title="Warning"
            onPress={() => {
              toast({
                title: 'Warning',
                message: 'Please be careful.',
                variant: 'warning',
              });
              action('toast')('warning');
            }}
            size="sm"
            variant="warning"
          />
        </Box>

        <Box className="flex-row gap-2">
          <Button
            title="Custom"
            onPress={() => {
              toast({
                title: 'Custom Toast',
                message: 'This is a custom variant.',
                variant: 'custom',
              });
              action('toast')('custom');
            }}
            size="sm"
            variant="info"
          />
          <Button
            title="Top Position"
            onPress={() => {
              toast({
                title: 'Top Toast',
                message: 'This appears at the top.',
                position: 'top',
                variant: 'info',
              });
              action('toast')('top');
            }}
            size="sm"
            variant="info"
          />
        </Box>

        {allowMultiple && <Button title="Multiple Toasts" onPress={showMultipleToasts} size="sm" variant="info" />}

        <Button
          title="Long Duration"
          onPress={() => {
            toast({
              title: 'Long Toast',
              message: 'This will stay for 8 seconds.',
              duration: 8000,
              variant: 'info',
            });
            action('toast')('long');
          }}
          size="sm"
          variant="info"
        />
      </Box>
    </Box>
  );
}

const meta: Meta<typeof AdvancedToastDemo> = {
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple toasts simultaneously',
    },
    swipeable: {
      control: 'boolean',
      description: 'Allow toasts to be dismissed by swiping',
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset for toast positioning',
    },
    defaultDuration: {
      control: 'number',
      description: 'Default duration for toasts',
    },
    maxToasts: {
      control: 'number',
      description: 'Maximum number of toasts when allowMultiple is true',
    },
  },
  component: AdvancedToastDemo,
  decorators: [
    (Story: any) => (
      <Box className="flex-1">
        <ToastProvider
          variants={advancedVariants}
          allowMultiple={true}
          swipeable={true}
          offsetY={20}
          defaultDuration={4000}
          maxToasts={3}
        >
          <Story />
        </ToastProvider>
      </Box>
    ),
  ],
  title: 'components/Toast.advanced',
};

export default meta;
type Story = StoryObj<typeof AdvancedToastDemo>;

export const Default: Story = {
  args: {
    allowMultiple: true,
    swipeable: true,
    offsetY: 20,
    defaultDuration: 4000,
    maxToasts: 3,
  },
};

export const SingleToast: Story = {
  args: {
    allowMultiple: false,
    swipeable: false,
    offsetY: 0,
    defaultDuration: 3000,
    maxToasts: 1,
  },
};

export const SwipeableToasts: Story = {
  args: {
    allowMultiple: true,
    swipeable: true,
    offsetY: 10,
    defaultDuration: 5000,
    maxToasts: 4,
  },
};

export const QuickToasts: Story = {
  args: {
    allowMultiple: true,
    swipeable: false,
    offsetY: 0,
    defaultDuration: 1000,
    maxToasts: 2,
  },
};
