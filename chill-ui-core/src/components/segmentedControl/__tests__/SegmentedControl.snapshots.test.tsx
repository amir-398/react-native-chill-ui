import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SegmentedControl } from '../components/SegmentedControl';
import { SegmentedControlPanel } from '../components/SegmentedControlPanel';
import { SegmentedControlTrigger } from '../components/SegmentedControlTrigger';
import { SegmentedControlIndicator } from '../components/SegmentedControlIndicator';
import { SegmentedControlPanelContent } from '../components/SegmentedControlPanelContent';
import { SegmentedControlTriggerContent } from '../components/SegmentedControlTriggerContent';

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isString: jest.fn(value => typeof value === 'string'),
  SlotTw: ({ children }: any) => children,
  styleHandler: jest.fn(() => ({})),
}));

// Mock AnimatedBox
jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="animated-box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

// Mock Box
jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

// Mock String
jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => {
    const { Text: ReactNativeText } = require('react-native');
    return (
      <ReactNativeText testID="string" {...props}>
        {children}
      </ReactNativeText>
    );
  },
}));

// Mock Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({
    start: () => {},
  });
  return RN;
});

describe('SegmentedControl Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with basic props', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with default value', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option2">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom styling', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent className="custom-content" style={{ padding: 8 }}>
          <SegmentedControlTrigger
            value="option1"
            className="custom-trigger"
            activeClassName="active-trigger"
            style={{ margin: 4 }}
            activeStyle={{ backgroundColor: '#3B82F6' }}
          >
            Option 1
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator className="custom-indicator" style={{ height: 6 }} />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with disabled state', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2" isDisabled>
            Option 2
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with panels content', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option1">
            <View style={{ backgroundColor: '#DBEAFE', borderRadius: 8, padding: 16 }}>
              <Text style={{ color: '#1E40AF', fontSize: 16, fontWeight: 'bold' }}>Content for Option 1</Text>
            </View>
          </SegmentedControlPanel>
          <SegmentedControlPanel value="option2">
            <View style={{ backgroundColor: '#FEE2E2', borderRadius: 8, padding: 16 }}>
              <Text style={{ color: '#991B1B', fontSize: 16, fontWeight: 'bold' }}>Content for Option 2</Text>
            </View>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom duration', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Fast Animation</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator duration={100} />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom internal padding', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent internalPadding={16}>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with touchable-opacity', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1" as="touchable-opacity">
            Touchable Option
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with multiple triggers', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option4">Option 4</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with forceRender prop', () => {
    const tree = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option1">
            <Text>Content 1</Text>
          </SegmentedControlPanel>
          <SegmentedControlPanel value="option2" forceRender>
            <Text>Content 2 (Force Rendered)</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(tree).toMatchSnapshot();
  });
});
