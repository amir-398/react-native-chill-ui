import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  String,
  Button,
  Box,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../../src/components';

const meta: Meta<typeof DialogTitle> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes (NativeWind only)',
    },
  },
  component: DialogTitle,
  decorators: [
    Story => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <Story />
          </DialogHeader>
          <String>Dialog content goes here.</String>
          <DialogFooter>
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dialog/DialogTitle',
};

export default meta;
type Story = StoryObj<typeof DialogTitle>;

export const Default: Story = {
  render: () => <DialogTitle>Default Title</DialogTitle>,
};

export const LongTitle: Story = {
  render: () => <DialogTitle>This is a very long title that might wrap to multiple lines</DialogTitle>,
};

export const CustomStyled: Story = {
  render: () => <DialogTitle className="text-xl font-bold text-blue-600">Custom Styled Title</DialogTitle>,
};

export const WithEmoji: Story = {
  render: () => <DialogTitle>🎉 Success! 🎉</DialogTitle>,
};

export const WithSpecialCharacters: Story = {
  render: () => <DialogTitle>Confirm Action & Delete Item</DialogTitle>,
};

export const MultilineTitle: Story = {
  render: () => <DialogTitle className="text-center">Multi-line{'\n'}Dialog Title</DialogTitle>,
};

export const DifferentSizes: Story = {
  decorators: [
    (StoryBox: any) => (
      <Dialog>
        <DialogTrigger>
          <Button title="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <StoryBox />
          </DialogHeader>
          <String>Compare different title sizes above.</String>
          <DialogFooter>
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  ],
  render: () => (
    <Box className="flex flex-col gap-4">
      <String className="text-lg font-semibold">Different Title Sizes</String>
      <Box className="flex flex-col gap-2">
        <DialogTitle className="text-sm">Small Title</DialogTitle>
        <DialogTitle className="text-base">Base Title</DialogTitle>
        <DialogTitle className="text-lg">Large Title</DialogTitle>
        <DialogTitle className="text-xl">Extra Large Title</DialogTitle>
        <DialogTitle className="text-2xl">2XL Title</DialogTitle>
      </Box>
    </Box>
  ),
};
