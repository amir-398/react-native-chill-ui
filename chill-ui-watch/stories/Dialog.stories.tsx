import type { Meta, StoryObj } from '@storybook/react';

import { useRef } from 'react';
import { SafeAreaView } from 'react-native';

import Badge from '@/components/badge';
import Button from '@/components/button';
import { DialogClose, DialogToaster, DialogToasterRef } from '@/components/dialog/Dialog';

import UiPresentation from './storybook';
import { Box } from '../src/components/box';
import String from '../src/components/string';
import { Dialog, DialogContent, DialogTrigger } from '../src/components/dialog';

const meta: Meta<typeof DialogContent> = {
  argTypes: {
    animation: {
      control: 'select',
      description: 'Animation type for the dialog',
      options: ['fade', 'slide', 'none'],
    },
    backdropClassName: {
      control: 'text',
      description: 'Class name for the backdrop',
    },
    backdropColor: {
      control: 'text',
      description: 'Color for the backdrop',
    },
    children: {
      control: 'text',
      description: 'Close the dialog when the backdrop is pressed',
    },
    className: {
      control: 'text',
      description: 'Class name for the dialog content',
    },
    closeMarkClassName: {
      control: 'text',
      description: 'Class name for the close mark',
    },
    closeMarkColor: {
      control: 'color',
      description: 'Color of the close mark',
    },
    closeMarkPosition: {
      control: 'select',
      description: 'Position of the close mark',
      options: ['right', 'left'],
    },
    closeMarkSize: {
      control: 'select',
      description: 'Size of the close mark',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
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
    useDefaultContainer: {
      control: 'boolean',
      description: 'Wrap content in a default container with white background and padding',
    },
  },
  component: DialogContent,
  decorators: [
    Story => (
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
        <Badge>Open Dialog</Badge>
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
        <Badge>Open Dialog</Badge>
      </DialogTrigger>
      <DialogContent {...props}>
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
          <Box>
            <String>This is a dialog content</String>
          </Box>
          <Box className="w-full p-3">
            <DialogClose asChild>
              <Button title="Close" variant="info" />
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
        <Badge>Open Dialog</Badge>
      </DialogTrigger>
      <DialogContent {...props}>
        <DialogToaster ref={toasterRef} />
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
          <Box>
            <String>This is a dialog content with toaster</String>
          </Box>
          <Box className="w-full p-3">
            <Button title="show toast" variant="warning" onPress={handleShowToast} />
          </Box>
          <Box className="w-full p-3">
            <DialogClose asChild>
              <Button title="Close" variant="info" />
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
        <Badge>Open Dialog</Badge>
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
    useDefaultContainer: true,
  },
  render: args => <DialogExample {...args} />,
};

export const WithCloseMark: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: true,
    useDefaultContainer: true,
  },
  render: args => <DialogExample {...args} />,
};

export const WithoutDefaultContainer: Story = {
  args: {
    animation: 'fade',
    hasCloseMark: false,
    hasOverlay: true,
    useDefaultContainer: false,
  },
  render: args => <DialogWithoutDefaultContainer {...args} />,
};

export const WithoutBackdrop: Story = {
  args: {
    animation: 'fade',
    className: 'h-48 items-center justify-center bg-white',
    hasCloseMark: true,
    hasOverlay: false,
    useDefaultContainer: true,
  },
  render: args => <DialogExample {...args} />,
};

export const WithAnimation: Story = {
  args: {
    animation: 'slide',
    useDefaultContainer: false,
  },
  render: args => <DialogWithoutDefaultContainer {...args} />,
};

export const WithToaster: Story = {
  args: {
    animation: 'fade',
    useDefaultContainer: false,
  },
  render: args => <DialogWithToaster {...args} />,
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
    useDefaultContainer: true,
  },
  render: args => <DialogWithCustomBackdrop {...args} />,
};
