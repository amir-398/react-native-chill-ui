import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useState } from 'react';

import {
  BoxTw as Box,
  ButtonTw as Button,
  StringTw as String,
  DialogTw as Dialog,
  DialogTriggerTw as DialogTrigger,
  DialogContentTw as DialogContent,
  DialogHeaderTw as DialogHeader,
  DialogTitleTw as DialogTitle,
  DialogFooterTw as DialogFooter,
  DialogCloseTw as DialogClose,
} from '../src/components';

const meta: Meta<typeof Dialog> = {
  argTypes: {
    // DialogContent Props
    animation: {
      control: 'select',
      description: 'Animation type for the dialog',
      options: ['fade', 'slide', 'none'],
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: 'fade' },
        type: { summary: 'string' },
      },
    },
    backdropColor: {
      control: 'color',
      description: 'Custom backdrop color',
      table: {
        category: 'DialogContent Props',
        type: { summary: 'string' },
      },
    },
    'className²': {
      control: 'text',
      description: 'Custom class name for the dialog content',
      table: {
        category: 'DialogContent Props',
        type: { summary: 'string' },
      },
    },
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Whether to close dialog when backdrop is pressed',
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    closeOnGoBack: {
      control: 'boolean',
      description: 'Whether to close dialog when back button is pressed',
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Whether to show backdrop',
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    onRequestClose: {
      action: 'onRequestClose',
      description: 'Callback when dialog is requested to close',
      table: {
        category: 'DialogContent Props',
        type: { summary: '() => void' },
      },
    },
    size: {
      control: 'select',
      description: 'Size variant for the dialog',
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: 'md' },
        type: { summary: 'string' },
      },
    },
    useDefaultContainer: {
      control: 'boolean',
      description: 'Whether to use default white container',
      table: {
        category: 'DialogContent Props',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },

    // DialogHeader Props
    'className³': {
      control: 'text',
      description: 'Custom class name for the dialog header',
      table: {
        category: 'DialogHeader Props',
        type: { summary: 'string' },
      },
    },
    closeMarkProps: {
      control: 'object',
      description: 'Custom close mark icon props',
      table: {
        category: 'DialogHeader Props',
        type: {
          summary: 'IconProps',
        },
      },
    },
    hasCloseMark: {
      control: 'boolean',
      description: 'Show close button in header',
      table: {
        category: 'DialogHeader Props',
        type: { summary: 'boolean' },
      },
    },
    ViewProps: {
      control: 'object',
      description: 'accept all View props',
      table: {
        category: 'DialogHeader Props',
      },
    },

    // DialogTrigger Props
    'as²': {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
      table: {
        category: 'DialogTrigger Props',
        defaultValue: { summary: 'pressable' },
        type: { summary: 'string' },
      },
    },
    'asChild²': {
      control: 'boolean',
      description: 'Use the child component as the trigger element',
      table: {
        category: 'DialogTrigger Props',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    'className⁴': {
      control: 'text',
      description: 'Custom class name for the trigger',
      table: {
        category: 'DialogTrigger Props',
        type: { summary: 'string' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Custom styles for the trigger element',
      table: {
        category: 'DialogTrigger Props',
        type: {
          detail:
            '{\n  [key: string]: any;\n  opacity?: number;\n  elevation?: number;\n  // ... other ViewStyle properties\n}',
          summary: 'StyleProp<ViewStyle>',
        },
      },
    },

    // DialogFooter Props
    'className⁶': {
      control: 'text',
      description: 'Custom class name for the dialog footer',
      table: {
        category: 'DialogFooter Props',
        type: { summary: 'string' },
      },
    },
    'ViewProps²': {
      control: 'object',
      description: 'accept all View props',
      table: {
        category: 'DialogFooter Props',
      },
    },

    // DialogClose Props
    'as³': {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
      table: {
        category: 'DialogClose Props',
        defaultValue: { summary: 'pressable' },
        type: { summary: 'string' },
      },
    },
    'asChild³': {
      control: 'boolean',
      description: 'Use the child component as the close button',
      table: {
        category: 'DialogClose Props',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    'className⁵': {
      control: 'text',
      description: 'Custom class name for the close button',
      table: {
        category: 'DialogClose Props',
        type: { summary: 'string' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Custom styles for the close button',
      table: {
        category: 'DialogClose Props',
        type: {
          detail:
            '{\n  [key: string]: any;\n  opacity?: number;\n  elevation?: number;\n  // ... other ViewStyle properties\n}',
          summary: 'StyleProp<ViewStyle>',
        },
      },
    },

    // DialogTitle Props
    'className⁷': {
      control: 'text',
      description: 'Custom CSS classes for additional styling (NativeWind)',
      table: {
        category: 'DialogTitle Props',
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'color',
      description: 'Custom color override (hex, rgb, etc.)',
      table: {
        category: 'DialogTitle Props',
        type: { summary: 'string' },
      },
    },
    onPress: {
      action: 'onPress',
      description: 'Callback when text is pressed',
      table: {
        category: 'DialogTitle Props',
        type: { summary: '() => void' },
      },
    },
    useFastText: {
      control: 'boolean',
      description: 'Use fast text rendering',
      table: {
        category: 'DialogTitle Props',
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
  },
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  },
  tags: ['autodocs'],
  title: 'FEEDBACK & OVERLAY/Dialog',
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (_args: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Default Dialog</DialogTitle>
        </DialogHeader>
        <String>This is a default dialog content.</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithCloseMark: Story = {
  render: (_args: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Open Dialog with Close Mark" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Dialog with Close Mark</DialogTitle>
        </DialogHeader>
        <String>This dialog has a close mark in the header.</String>
        <DialogFooter>
          <Button title="Action" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: (_args: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box className="flex flex-col items-center gap-4">
        <String className="text-lg font-semibold">Controlled Dialog</String>
        <Button title={isOpen ? 'Close Dialog' : 'Open Dialog'} onPress={() => setIsOpen(!isOpen)} />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button title="Open via Trigger" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
            <String>This dialog is controlled by parent state.</String>
            <DialogFooter>
              <DialogClose asChild>
                <Button title="Close" />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Box>
    );
  },
};

export const MultipleDialogs: Story = {
  render: (args: any) => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Multiple Dialogs</String>
      <Box className="flex flex-row gap-4">
        <Dialog {...args}>
          <DialogTrigger asChild>
            <Button title="Dialog 1" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>First Dialog</DialogTitle>
            </DialogHeader>
            <String>This is the first dialog.</String>
          </DialogContent>
        </Dialog>

        <Dialog {...args}>
          <DialogTrigger asChild>
            <Button title="Dialog 2" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hasCloseMark>
              <DialogTitle>Second Dialog</DialogTitle>
            </DialogHeader>
            <String>This is the second dialog.</String>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  ),
};
