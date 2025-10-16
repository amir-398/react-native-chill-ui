import type { Meta, StoryObj } from '@storybook/react';

import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import UiPresentation from './storybook';
import {
  Chip,
  Box,
  Button,
  String,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogToaster,
  DialogToasterRef,
} from '../src/components';

const meta: Meta<typeof DialogContent> = {
  argTypes: {
    animation: {
      control: 'select',
      description: 'Animation type for the dialog',
      options: ['fade', 'slide', 'none'],
    },

    backdropColor: {
      control: 'text',
      description: 'Custom backdrop color',
    },
    children: {
      control: 'text',
      description: 'Dialog content',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes for dialog content (NativeWind only)',
    },
    closeMarkPosition: {
      control: 'select',
      description: 'Position of the close mark',
      options: ['right', 'left'],
    },
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Close the dialog when the backdrop is pressed',
    },
    closeOnGoBack: {
      control: 'boolean',
      description: 'Close the dialog when the user goes back',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Control dialog visibility',
    },
    hasCloseMark: {
      control: 'boolean',
      description: 'Show close button in the top right corner',
    },
    hasOverlay: {
      control: 'boolean',
      description: 'Show overlay behind the dialog',
    },
    onOpenChange: {
      action: 'text',
      description: 'Function to control dialog visibility',
    },
    onRequestClose: {
      action: 'text',
      description: 'Function to close the dialog',
    },
    onShow: {
      action: 'text',
      description: 'Function to show the dialog',
    },
    rounded: {
      control: 'select',
      description: 'Border radius variant for the dialog',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    size: {
      control: 'select',
      description: 'Size variant for the dialog',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    style: {
      control: 'object',
      description: 'Additional inline styles (StyleSheet only)',
    },
    useDefaultContainer: {
      control: 'boolean',
      description: 'Wrap content in a default container with white background and padding',
    },
  },
  component: DialogContent,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Dialog',
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

function DialogExample(props: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Chip>Open Dialog</Chip>
      </DialogTrigger>
      <DialogContent {...props}>
        <String>This is a dialog content</String>
      </DialogContent>
    </Dialog>
  );
}

function DialogWithoutDefaultContainer(props: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Chip>Open Dialog</Chip>
      </DialogTrigger>
      <DialogContent {...props}>
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
          <Box>
            <String>This is a dialog content</String>
          </Box>
          <Box className="w-full p-3">
            <DialogClose asChild>
              <Button title="Close" variant="contained" />
            </DialogClose>
          </Box>
        </SafeAreaView>
      </DialogContent>
    </Dialog>
  );
}

function DialogWithToaster(props: any) {
  const toasterRef = useRef<DialogToasterRef>(null);

  const handleShowToast = () => {
    toasterRef.current?.showToast({
      message: 'Hello',
      position: 'top',
      variant: 'success',
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Chip>Open Dialog</Chip>
      </DialogTrigger>
      <DialogContent {...props}>
        <DialogToaster ref={toasterRef} />
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
          <Box>
            <String>This is a dialog content with toaster</String>
          </Box>
          <Box className="w-full p-3">
            <Button title="show toast" colorVariant="warning" onPress={handleShowToast} />
          </Box>
          <Box className="w-full p-3">
            <DialogClose asChild>
              <Button title="Close" colorVariant="info" />
            </DialogClose>
          </Box>
        </SafeAreaView>
      </DialogContent>
    </Dialog>
  );
}

function DialogWithCustomBackdrop(props: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Chip>Open Dialog</Chip>
      </DialogTrigger>
      <DialogContent {...props}>
        <String>This is a dialog content</String>
      </DialogContent>
    </Dialog>
  );
}

export const Default: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasCloseMark: false,
    hasOverlay: true,
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogExample {...args} />,
};

export const WithCloseMark: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: true,
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogExample {...args} />,
};

export const WithoutDefaultContainer: Story = {
  args: {
    animation: 'fade',
    hasCloseMark: false,
    hasOverlay: true,
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: false,
  },
  render: (args: any) => <DialogWithoutDefaultContainer {...args} />,
};

export const WithoutBackdrop: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: false,
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogExample {...args} />,
};

export const WithAnimation: Story = {
  args: {
    animation: 'slide',
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: false,
  },
  render: (args: any) => <DialogWithoutDefaultContainer {...args} />,
};

export const WithToaster: Story = {
  args: {
    animation: 'fade',
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: false,
  },
  render: (args: any) => <DialogWithToaster {...args} />,
};

export const WithCustomBackdrop: Story = {
  args: {
    animation: 'fade',
    backdropColor: 'red',
    className: 'h-48 items-center justify-center bg-white',
    closeOnBackdropPress: true,
    closeOnGoBack: true,
    hasCloseMark: true,
    hasOverlay: true,
    rounded: 'lg',
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogWithCustomBackdrop {...args} />,
};

export const WithSizeVariants: Story = {
  args: {
    animation: 'fade',
    className: 'items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: true,
    rounded: 'lg',
    size: 'lg',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogExample {...args} />,
};

export const WithRoundedVariants: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: true,
    rounded: 'xl',
    size: 'md',
    useDefaultContainer: true,
  },
  render: (args: any) => <DialogExample {...args} />,
};
