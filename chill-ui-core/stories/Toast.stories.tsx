import type { StoryObj } from '@storybook/react-native-web-vite';

import { fn } from 'storybook/test';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

function Toast({
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
              fn()('toast', variant || 'info');
            }}
            size="sm"
            variant={variant || 'info'}
          />
        </Box>
      </Box>
    </Box>
  );
}

const meta = {
  argTypes: {
    // Toast Props
    'allowMultiple²': {
      control: 'boolean',
      description: 'Allow multiple toasts for this specific toast (overrides provider setting)',
      table: {
        category: 'Toast Props',
        type: { summary: 'boolean' },
      },
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before the toast disappears',
      table: {
        category: 'Toast Props',
        defaultValue: { summary: '3000' },
        type: { summary: 'number' },
      },
    },
    'iconProps²': {
      control: 'object',
      description: 'Props for the Icon component',
      table: {
        category: 'Toast Props',
        type: { summary: 'IconProps' },
      },
    },
    id: {
      control: 'text',
      description: 'Toast id',
      table: {
        category: 'Toast Props',
        type: { summary: 'string' },
      },
    },
    'maxToasts²': {
      control: 'number',
      description: 'Maximum number of toasts for this specific toast (overrides provider setting)',
      table: {
        category: 'Toast Props',
        type: { summary: 'number' },
      },
    },
    message: {
      control: 'text',
      description: 'Message to display in the toast',
      table: {
        category: 'Toast Props',
        type: { summary: 'string' },
      },
    },
    'messageStringProps²': {
      control: 'object',
      description: 'Props for the message String component',
      table: {
        category: 'Toast Props',
        type: { summary: 'StringProps' },
      },
    },
    'offsetY²': {
      control: 'number',
      description: 'Vertical offset in pixels to adjust toast position',
      table: {
        category: 'Toast Props',
        type: { summary: 'number' },
      },
    },
    position: {
      control: 'select',
      description: 'Position of the toast on screen',
      options: ['top', 'bottom'],
      table: {
        category: 'Toast Props',
        defaultValue: { summary: 'bottom' },
        type: { summary: "'top' | 'bottom'" },
      },
    },
    render: {
      control: 'object',
      description: 'Custom render function for toast content',
      table: {
        category: 'Toast Props',
        type: { summary: 'React.ReactNode' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Style object for additional styling',
      table: {
        category: 'Toast Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'swipeable²': {
      control: 'boolean',
      description: 'Allow swipe to dismiss for this specific toast',
      table: {
        category: 'Toast Props',
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'Title to display in the toast',
      table: {
        category: 'Toast Props',
        type: { summary: 'string' },
      },
    },
    'titleStringProps²': {
      control: 'object',
      description: 'Props for the title String component',
      table: {
        category: 'Toast Props',
        type: { summary: 'StringProps' },
      },
    },
    variant: {
      control: 'select',
      description: 'Type of toast to display (success, error, info, warning)',
      options: ['success', 'error', 'info', 'warning'],
      table: {
        category: 'Toast Props',
        defaultValue: { summary: 'info' },
        type: { summary: "'success' | 'error' | 'info' | 'warning'" },
      },
    },

    // ToastProvider Props
    allowMultiple: {
      control: 'boolean',
      description: 'Whether to allow multiple toasts simultaneously',
      table: {
        category: 'ToastProvider Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    defaultDuration: {
      control: 'number',
      description: 'Default duration in milliseconds for toasts',
      table: {
        category: 'ToastProvider Props',
        defaultValue: { summary: '3000' },
        type: { summary: 'number' },
      },
    },
    maxToasts: {
      control: 'number',
      description: 'Maximum number of toasts to show simultaneously',
      table: {
        category: 'ToastProvider Props',
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset in pixels to adjust toast position',
      table: {
        category: 'ToastProvider Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    swipeable: {
      control: 'boolean',
      description: 'Whether toasts can be dismissed by swiping',
      table: {
        category: 'ToastProvider Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variants: {
      control: 'object',
      description: 'Custom styling variants for different toast types',
      table: {
        category: 'ToastProvider Props',
        type: { summary: 'ToastVariantTypeProps' },
      },
    },

    // ToastVariantConfig Props
    className: {
      control: 'text',
      description: 'CSS classes for the toast container (Tailwind/Hybrid only)',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'string' },
      },
    },
    customIcon: {
      control: 'object',
      description: 'Custom icon component to replace the default icon',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'React.ReactNode' },
      },
    },
    iconProps: {
      control: 'object',
      description: 'Props to customize the icon component',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'IconProps' },
      },
    },
    messageStringProps: {
      control: 'object',
      description: 'Props to customize the message String component',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'StringProps' },
      },
    },
    progressBarColor: {
      control: 'color',
      description: 'Color of the progress bar indicator',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'string' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Style object for the entire toast container',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    titleStringProps: {
      control: 'object',
      description: 'Props to customize the title String component',
      table: {
        category: 'ToastVariantConfig Props',
        type: { summary: 'StringProps' },
      },
    },
  },
  component: Toast,
  decorators: [
    (Story: any) => (
      <SafeAreaProvider>
        <Box className="flex-1">
          <ToastProvider variants={defaultVariants}>
            <Story />
          </ToastProvider>
        </Box>
      </SafeAreaProvider>
    ),
  ],
  subcomponents: {
    ToastProvider,
  },
  title: 'FEEDBACK & OVERLAY/Toast',
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: (_args: any) => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() =>
          toast({
            message: 'This is a default toast message',
            position: 'bottom',
            variant: 'info',
          })
        }
        size="sm"
        variant="info"
      />
    );
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    position: 'bottom',
    variant: 'success',
  },
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred!',
    position: 'bottom',
    variant: 'error',
  },
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning message!',
    position: 'bottom',
    variant: 'warning',
  },
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
  },
};

export const TopPosition: Story = {
  args: {
    message: 'Toast at the top of the screen',
    position: 'top',
    variant: 'info',
  },
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
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
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
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
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            duration: args.duration,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
  },
};

export const AllowMultiple: Story = {
  args: {
    message: 'This toast will stay visible for a long time.',
    position: 'bottom',
    title: 'Persistent Toast',
    variant: 'info',
  },
  render: args => {
    const { toast } = useToast();
    return (
      <Button
        title="Show Toast"
        onPress={() => {
          toast({
            allowMultiple: true,
            message: args.message,
            position: args.position,
            title: args.title,
            variant: args.variant,
          });
          fn()('toast', args.variant || 'info');
        }}
        size="sm"
        variant={args.variant || 'info'}
      />
    );
  },
};
