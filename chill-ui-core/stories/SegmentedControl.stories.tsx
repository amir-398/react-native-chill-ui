import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box, String } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlPanel,
  SegmentedControlPanelContent,
  SegmentedControlPanelSliderContent,
  SegmentedControlTrigger,
  SegmentedControlTriggerContent,
} from '../src/components/segmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  component: SegmentedControl,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
        <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/SegmentedControl',
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic SegmentedControl with three options',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent defaultValue="option2" onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with Option 2 selected by default',
      },
    },
  },
};

export const WithConditionalContent: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with conditional panel content that changes based on selection',
      },
    },
  },
};

export const WithSliderContent: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with swipeable slider content that syncs with trigger selection',
      },
    },
  },
};

export const WithDisabledOption: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with a disabled option that cannot be selected',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom styling for triggers and indicator',
      },
    },
  },
};

export const WithCustomDuration: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Fast</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Slow</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Default</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator duration={500} />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom animation duration (500ms)',
      },
    },
  },
};

export const TwoOptions: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="yes">Yes</SegmentedControlTrigger>
        <SegmentedControlTrigger value="no">No</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with only two options',
      },
    },
  },
};

export const FourOptions: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with four options',
      },
    },
  },
};

export const WithCustomInternalPadding: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent internalPadding={16} onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1">Wide</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2">Spacing</SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3">Here</SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with custom internal padding (16px)',
      },
    },
  },
};

export const WithTouchableOpacity: Story = {
  render: () => (
    <SegmentedControl>
      <SegmentedControlTriggerContent onChange={action('onChange')}>
        <SegmentedControlTrigger value="option1" as="touchable-opacity">
          Option 1
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="option2" as="touchable-opacity">
          Option 2
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="option3" as="touchable-opacity">
          Option 3
        </SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator />
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl using TouchableOpacity instead of Pressable',
      },
    },
  },
};

export const CompactStyle: Story = {
  render: () => (
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
  parameters: {
    docs: {
      description: {
        story: 'SegmentedControl with compact, dark themed styling',
      },
    },
  },
};
