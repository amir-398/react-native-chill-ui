import type { StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import UiPresentation from './storybook/UiPresentation';
import { BoxTw as Box, StringTw as String } from '../src/components';
import {
  SegmentedControlTw as SegmentedControl,
  SegmentedControlIndicatorTw as SegmentedControlIndicator,
  SegmentedControlPanelTw as SegmentedControlPanel,
  SegmentedControlPanelContentTw as SegmentedControlPanelContent,
  SegmentedControlPanelSliderContentTw as SegmentedControlPanelSliderContent,
  SegmentedControlTriggerTw as SegmentedControlTrigger,
  SegmentedControlTriggerContentTw as SegmentedControlTriggerContent,
} from '../src/components/segmentedControl';

const meta = {
  argTypes: {
    // Base SegmentedControl props
    className: {
      control: 'text',
      description: 'Custom class name for the trigger content container',
      table: {
        category: 'SegmentedControlTriggerContent Props',
        type: { summary: 'string' },
      },
    },
    'className²': {
      control: 'text',
      description: 'Custom class name for the panel slider content container',
      table: {
        category: 'SegmentedControlPanelSliderContent Props',
        type: { summary: 'string' },
      },
    },
    'className⁶': {
      control: 'text',
      description: 'Custom class name for the panel slider content container',
      table: {
        category: 'SegmentedControlPanelContent Props',
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Initial selected option value (must match one of the trigger values)',
      table: {
        category: 'SegmentedControlTriggerContent Props',
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback function called when the selected option changes, receives the new option value',
      table: {
        category: 'SegmentedControlTriggerContent Props',
        type: { summary: '(value: string) => void' },
      },
    },

    style: {
      control: 'object',
      description: 'Custom style for the trigger content container',
      table: {
        category: 'SegmentedControlTriggerContent Props',
        type: { summary: 'ViewStyle' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Custom style for the panel slider content container',
      table: {
        category: 'SegmentedControlPanelContent Props',
        type: { summary: 'ViewStyle' },
      },
    },

    // TriggerContent props
    internalPadding: {
      control: { max: 20, min: 0, step: 1, type: 'number' },
      description: 'Internal padding between trigger items in pixels',
      table: {
        category: 'SegmentedControlTriggerContent Props',
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
    // Indicator props
    'className³': {
      control: 'text',
      description: 'Custom CSS classes for the indicator',
      table: {
        category: 'SegmentedControlIndicator Props',
        type: { summary: 'string' },
      },
    },
    duration: {
      control: { max: 1000, min: 0, step: 50, type: 'number' },
      description: 'Duration of the indicator animation in milliseconds',
      table: {
        category: 'SegmentedControlIndicator Props',
        defaultValue: { summary: '200' },
        type: { summary: 'number' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Custom style for the indicator',
      table: {
        category: 'SegmentedControlIndicator Props',
        type: { summary: 'ViewStyle' },
      },
    },
    // Trigger props
    activeClassName: {
      control: 'text',
      description: 'Custom CSS classes for the active trigger item',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'string' },
      },
    },
    activeStyle: {
      control: 'object',
      description: 'Custom active style for the trigger item',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'ViewStyle' },
      },
    },
    as: {
      control: 'select',
      description: 'Type of the trigger component',
      options: ['touchable-opacity', 'pressable'],
      table: {
        category: 'SegmentedControlTrigger Props',
        defaultValue: { summary: 'pressable' },
        type: { summary: 'touchable-opacity | pressable' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Whether the trigger is a child',
      table: {
        category: 'SegmentedControlTrigger Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'asChild⁵': {
      control: 'boolean',
      description: 'Whether the trigger is a child',
      table: {
        category: 'SegmentedControlPanelContent Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'className⁴': {
      control: 'text',
      description: 'Custom class name for the trigger item',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'string' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the trigger is disabled',
      table: {
        category: 'SegmentedControlTrigger Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    stringProps: {
      control: 'object',
      description: 'Props for the String component',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'StringProps' },
      },
    },
    'style⁴': {
      control: 'object',
      description: 'Custom style for the trigger item',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'ViewStyle' },
      },
    },
    'style⁶': {
      control: 'object',
      description: 'Custom style for the trigger item',
      table: {
        category: 'SegmentedControlPanel Props',
        type: { summary: 'ViewStyle' },
      },
    },
    'style⁷': {
      control: 'object',
      description: 'Custom style for the trigger item',
      table: {
        category: 'SegmentedControlPanelSliderContent Props',
        type: { summary: 'ViewStyle' },
      },
    },
    value: {
      control: 'text',
      description: 'Value of the trigger item',
      table: {
        category: 'SegmentedControlTrigger Props',
        type: { summary: 'string' },
      },
      type: { required: true },
    },
    // Panel props
    'asChild²': {
      control: 'boolean',
      description: 'Whether the panel should use asChild pattern',
      table: {
        category: 'SegmentedControlPanel Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'className⁵': {
      control: 'text',
      description: 'Custom class name for the panel item',
      table: {
        category: 'SegmentedControlPanel Props',
        type: { summary: 'string' },
      },
    },
    forceRender: {
      control: 'boolean',
      description: 'Whether the panel should be force rendered',
      table: {
        category: 'SegmentedControlPanel Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'value²': {
      control: 'text',
      description: 'Value of the panel item',
      table: {
        category: 'SegmentedControlPanel Props',
        type: { summary: 'string' },
      },
    },
  },
  component: SegmentedControl,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  subcomponents: {
    SegmentedControlIndicator,
    SegmentedControlPanel,
    SegmentedControlPanelContent,
    SegmentedControlPanelSliderContent,
    SegmentedControlTrigger,
    SegmentedControlTriggerContent,
  },
  title: 'FEEDBACK & OVERLAY/SegmentedControl',
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic SegmentedControl with three options',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with Option 2 selected by default',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent defaultValue="option2" onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const WithConditionalContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with conditional panel content that changes based on selection',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent defaultValue="home" onChange={action('onChange')}>
        <SegmentedControlTrigger value="home">Home</SegmentedControlTrigger>
        <SegmentedControlTrigger value="profile">Profile</SegmentedControlTrigger>
        <SegmentedControlTrigger value="settings">Settings</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />

      <SegmentedControlPanelContent>
        <SegmentedControlPanel value="home">
          <Box className="mt-4 rounded-lg p-4" style={{ backgroundColor: '#DBEAFE' }}>
            <String style={{ color: '#1E40AF', fontSize: 16, fontWeight: 'bold' }}>Home Content</String>
            <String style={{ color: '#1E40AF', marginTop: 8 }}>Welcome to the home page</String>
          </Box>
        </SegmentedControlPanel>
        <SegmentedControlPanel value="profile">
          <Box className="mt-4 rounded-lg p-4" style={{ backgroundColor: '#D1FAE5' }}>
            <String style={{ color: '#065F46', fontSize: 16, fontWeight: 'bold' }}>Profile Content</String>
            <String style={{ color: '#065F46', marginTop: 8 }}>View your profile information</String>
          </Box>
        </SegmentedControlPanel>
        <SegmentedControlPanel value="settings">
          <Box className="mt-4 rounded-lg p-4" style={{ backgroundColor: '#FEE2E2' }}>
            <String style={{ color: '#991B1B', fontSize: 16, fontWeight: 'bold' }}>Settings Content</String>
            <String style={{ color: '#991B1B', marginTop: 8 }}>Manage your settings</String>
          </Box>
        </SegmentedControlPanel>
      </SegmentedControlPanelContent>
    </SegmentedControl>
  ),
};

export const WithSliderContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with swipeable slider content that syncs with trigger selection',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="slide1">Slide 1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="slide2">Slide 2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="slide3">Slide 3</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />

      <SegmentedControlPanelSliderContent>
        <SegmentedControlPanel value="slide1">
          <Box className="mt-4 items-center justify-center rounded-lg p-8" style={{ backgroundColor: '#3B82F6' }}>
            <String style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Slide 1</String>
            <String style={{ color: 'white', marginTop: 8, textAlign: 'center' }}>Swipe to navigate</String>
          </Box>
        </SegmentedControlPanel>
        <SegmentedControlPanel value="slide2">
          <Box className="mt-4 items-center justify-center rounded-lg p-8" style={{ backgroundColor: '#10B981' }}>
            <String style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Slide 2</String>
            <String style={{ color: 'white', marginTop: 8, textAlign: 'center' }}>Keep swiping!</String>
          </Box>
        </SegmentedControlPanel>
        <SegmentedControlPanel value="slide3">
          <Box className="mt-4 items-center justify-center rounded-lg p-8" style={{ backgroundColor: '#EF4444' }}>
            <String style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Slide 3</String>
            <String style={{ color: 'white', marginTop: 8, textAlign: 'center' }}>Last slide!</String>
          </Box>
        </SegmentedControlPanel>
      </SegmentedControlPanelSliderContent>
    </SegmentedControl>
  ),
};

export const WithDisabledOption: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with a disabled option that cannot be selected',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Enabled</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2" isDisabled>
          Disabled
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Enabled</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const WithCustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom styling for triggers and indicator',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent className="rounded-xl p-2" style={{ backgroundColor: '#F3F4F6' }}>
        <SegmentedControlTrigger
          value="option1"
          activeClassName="rounded-lg"
          className="px-4 py-2"
          activeStyle={{ backgroundColor: '#3B82F6' }}
          stringProps={{
            activeColor: 'white',
            activeStyle: { fontWeight: 'bold' },
            color: '#6B7280',
          }}
        >
          Option 1
        </SegmentedControlTrigger>
        <SegmentedControlTrigger
          value="option2"
          activeClassName="rounded-lg"
          className="px-4 py-2"
          activeStyle={{ backgroundColor: '#3B82F6' }}
          stringProps={{
            activeColor: 'white',
            activeStyle: { fontWeight: 'bold' },
            color: '#6B7280',
          }}
        >
          Option 2
        </SegmentedControlTrigger>
        <SegmentedControlTrigger
          value="option3"
          activeClassName="rounded-lg"
          className="px-4 py-2"
          activeStyle={{ backgroundColor: '#3B82F6' }}
          stringProps={{
            activeColor: 'white',
            activeStyle: { fontWeight: 'bold' },
            color: '#6B7280',
          }}
        >
          Option 3
        </SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator className="rounded-lg" style={{ backgroundColor: '#3B82F6', height: 0 }} />
    </SegmentedControl>
  ),
};

export const WithCustomDuration: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom animation duration (500ms)',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Fast</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Slow</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Default</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator duration={500} />
    </SegmentedControl>
  ),
};

export const TwoOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with only two options',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="yes">Yes</SegmentedControlTrigger>
        <SegmentedControlTrigger value="no">No</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const FourOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with four options',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">3</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option4">4</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const WithCustomInternalPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom internal padding (16px)',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent internalPadding={16} onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Wide</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Spacing</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Here</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
};

export const CompactStyle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with compact, dark themed styling',
      },
    },
  },
  render: (_args: any) => (
    <SegmentedControl>
      <SegmentedControlTriggerContent
        className="rounded-lg"
        style={{ backgroundColor: '#1F2937', padding: 4 }}
        onChange={action('onChange')}
      >
        <SegmentedControlTrigger
          value="option1"
          className="rounded-md px-3 py-1.5"
          stringProps={{ color: 'white', style: { fontSize: 14 } }}
        >
          Compact
        </SegmentedControlTrigger>
        <SegmentedControlTrigger
          value="option2"
          className="rounded-md px-3 py-1.5"
          stringProps={{ color: 'white', style: { fontSize: 14 } }}
        >
          Style
        </SegmentedControlTrigger>
        <SegmentedControlTrigger
          value="option3"
          className="rounded-md px-3 py-1.5"
          stringProps={{ color: 'white', style: { fontSize: 14 } }}
        >
          Control
        </SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator className="rounded-md" style={{ backgroundColor: '#3B82F6' }} />
    </SegmentedControl>
  ),
};
