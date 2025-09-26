import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '../src/components';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../src/components/accordion';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes (used with NativeWind)',
    },
    collapseIcon: {
      control: 'text',
      description: 'Icon to show when item is expanded',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed when type is single',
    },
    defaultValue: {
      control: 'text',
      description: 'Default open items (string for single, array for multiple)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    expandIcon: {
      control: 'text',
      description: 'Icon to show when item is collapsed',
    },
    hasCollapseIcon: {
      control: 'boolean',
      description: 'Whether to show the collapse icon',
    },
    iconPosition: {
      control: 'select',
      description: 'Position of the expand/collapse icon',
      options: ['left', 'right'],
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback fired when accordion state changes',
    },
    type: {
      control: 'select',
      description: 'Whether single or multiple items can be open at once',
      options: ['single', 'multiple'],
    },
  },
  component: Accordion,
  decorators: [
    Story => (
      <Box style={{ maxWidth: 600, padding: 16 }}>
        <Story />
      </Box>
    ),
  ],
  title: 'components/Accordion',
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    collapsible: true,
    hasCollapseIcon: true,

    iconPosition: 'right',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="getting-started">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <String className="text-black">Yes. It adheres to the WAI-ARIA design pattern.</String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="features">
        <AccordionTrigger>What are the key features?</AccordionTrigger>
        <AccordionContent>
          <Box className="space-y-2">
            <String className="text-gray-700">Our platform offers many powerful features:</String>
            <String className="text-gray-600">• Fast and reliable performance</String>
            <String className="text-gray-600">• Beautiful user interface</String>
            <String className="text-gray-600">• Comprehensive documentation</String>
            <String className="text-gray-600">• 24/7 customer support</String>
          </Box>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pricing">
        <AccordionTrigger>How much does it cost?</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            We offer flexible pricing plans to meet your needs. Contact our sales team for more information.
          </String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="support" disabled>
        <AccordionTrigger>How can I get support?</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            Need help? Our support team is available 24/7 via email, chat, or phone.
          </String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleAccordion: Story = {
  args: {
    defaultValue: ['getting-started', 'features'],
    iconPosition: 'right',
    type: 'multiple',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="getting-started">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            Welcome to our platform! This section will help you get started with the basics.
          </String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="features">
        <AccordionTrigger>Features & Benefits</AccordionTrigger>
        <AccordionContent>
          <Box className="space-y-2">
            <String className="text-gray-700">Our platform offers many powerful features:</String>
            <String className="text-gray-600">• Fast and reliable performance</String>
            <String className="text-gray-600">• Beautiful user interface</String>
            <String className="text-gray-600">• Comprehensive documentation</String>
            <String className="text-gray-600">• 24/7 customer support</String>
          </Box>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="pricing">
        <AccordionTrigger>Pricing Information</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            We offer flexible pricing plans to meet your needs. Contact our sales team for more information.
          </String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LeftIconPosition: Story = {
  args: {
    collapsible: true,
    iconPosition: 'left',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">Answer to question 1</String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item2">
        <AccordionTrigger>Question 2</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">Answer to question 2</String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NoAnimation: Story = {
  args: {
    collapsible: true,
    hasCollapseIcon: true,
    iconPosition: 'right',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>No Animation Example</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">This accordion does not use animations for instant expand/collapse.</String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">Content appears instantly without animation.</String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledAccordion: Story = {
  args: {
    collapsible: true,
    disabled: true,
    iconPosition: 'right',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>Disabled Accordion</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">This content cannot be accessed.</String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item2">
        <AccordionTrigger>Another Disabled Item</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">This content is also disabled.</String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomTriggerContent: Story = {
  args: {
    collapsible: true,
    iconPosition: 'right',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="custom">
        <AccordionTrigger>
          <Box className="flex-row items-center">
            <Box className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
            <String weight="bold" className="text-blue-600">
              Custom Trigger with Dot
            </String>
          </Box>
        </AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            This accordion item has a custom trigger with additional styling and components.
          </String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="standard">
        <AccordionTrigger>Standard Trigger</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">This is a standard trigger for comparison.</String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomIcons: Story = {
  args: {
    collapseIcon: 'minus-solid',
    collapsible: true,
    expandIcon: 'plus-solid',
    iconPosition: 'right',
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>Custom Icons Example</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            This accordion uses custom plus/minus icons instead of the default arrows.
          </String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item2">
        <AccordionTrigger>Another Item with Custom Icons</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">Notice how the icons change when you expand/collapse items.</String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithCallback: Story = {
  args: {
    collapsible: true,
    iconPosition: 'right',
    onValueChange: (value: any) => console.log('Accordion value changed:', value),
    type: 'single',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>Item with Callback</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            Check the console to see the callback being triggered when you expand/collapse items.
          </String>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          <String className="text-gray-700">
            The onValueChange callback will log the current state to the console.
          </String>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
