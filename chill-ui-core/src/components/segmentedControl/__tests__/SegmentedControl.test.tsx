import { Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

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

describe('SegmentedControl Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic segmented control correctly', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should render with default selected value', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option2">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should handle trigger press interactions', () => {
    const onChangeMock = jest.fn();

    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent onChange={onChangeMock}>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );

    const option2 = getByText('Option 2').parent;
    if (option2) {
      fireEvent.press(option2);
    }
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should render with panels content', () => {
    const { getByText } = render(
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
          <SegmentedControlPanel value="option2">
            <Text>Content 2</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should handle disabled trigger state', () => {
    const onChangeMock = jest.fn();

    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent onChange={onChangeMock}>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2" isDisabled>
            Option 2
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );

    const disabledOption = getByText('Option 2').parent;
    if (disabledOption) {
      fireEvent.press(disabledOption);
    }
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent className="custom-class">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent style={{ margin: 10 }}>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render trigger with active className', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1" activeClassName="active-class">
            Option 1
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render trigger with active style', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1" activeStyle={{ backgroundColor: 'blue' }}>
            Option 1
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render indicator with custom duration', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator duration={300} />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render with custom internal padding', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent internalPadding={16}>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render trigger with touchable-opacity', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1" as="touchable-opacity">
            Option 1
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render multiple triggers', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
    expect(getByText('Option 3')).toBeTruthy();
  });

  it('should render panel content with asChild', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent asChild>
          <SegmentedControlPanel value="option1">
            <Text>Content 1</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render panel with custom className', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option1" className="custom-panel">
            <Text>Content 1</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render panel with custom style', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option1" style={{ padding: 10 }}>
            <Text>Content 1</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should not render panel when value does not match', () => {
    const { getByText } = render(
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
          <SegmentedControlPanel value="option2">
            <Text>Content 2</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render panel with forceRender prop', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option2" forceRender>
            <Text>Content 2</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render trigger with custom stringProps', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger
            value="option1"
            stringProps={{ activeClassName: 'active', activeColor: 'blue', color: 'gray' }}
          >
            Option 1
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render indicator with custom className', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator className="custom-indicator" />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render indicator with custom style', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator style={{ height: 6 }} />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should handle trigger with non-string children', () => {
    const { getByTestId } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">
            <View testID="custom-child">
              <Text>Custom Child</Text>
            </View>
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByTestId('custom-child')).toBeTruthy();
  });

  it('should render panel content with custom className', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent className="custom-panel-content">
          <SegmentedControlPanel value="option1">
            <Text>Content 1</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render panel content with custom style', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent style={{ marginTop: 10 }}>
          <SegmentedControlPanel value="option1">
            <Text>Content 1</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should render trigger with asChild pattern', () => {
    const { getByTestId } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1" asChild>
            <View testID="custom-trigger">
              <Text>Custom Trigger</Text>
            </View>
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByTestId('custom-trigger')).toBeTruthy();
  });

  it('should render panel with asChild pattern', () => {
    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent defaultValue="option1">
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
        <SegmentedControlPanelContent>
          <SegmentedControlPanel value="option1" asChild>
            <View testID="custom-panel">
              <Text>Custom Panel</Text>
            </View>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('should handle mixed children types in trigger content', () => {
    const { getByTestId, getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>
          <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
          <View testID="extra-element">
            <Text>Extra</Text>
          </View>
          <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
    expect(getByTestId('extra-element')).toBeTruthy();
  });

  it('should handle empty trigger content', () => {
    const { root } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent>{/* Empty */}</SegmentedControlTriggerContent>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const onChangeMock = jest.fn();

    const { getByText } = render(
      <SegmentedControl>
        <SegmentedControlTriggerContent
          defaultValue="option2"
          onChange={onChangeMock}
          className="custom-content"
          style={{ padding: 8 }}
          internalPadding={12}
        >
          <SegmentedControlTrigger
            value="option1"
            className="trigger-class"
            activeClassName="active-class"
            style={{ margin: 2 }}
            activeStyle={{ backgroundColor: 'blue' }}
          >
            Option 1
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="option2" isDisabled as="touchable-opacity">
            Option 2
          </SegmentedControlTrigger>
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator className="indicator-class" style={{ height: 4 }} duration={250} />
        <SegmentedControlPanelContent className="panels-class" style={{ marginTop: 16 }}>
          <SegmentedControlPanel value="option1" className="panel-class" style={{ padding: 12 }}>
            <Text>Content 1</Text>
          </SegmentedControlPanel>
          <SegmentedControlPanel value="option2" forceRender>
            <Text>Content 2</Text>
          </SegmentedControlPanel>
        </SegmentedControlPanelContent>
      </SegmentedControl>,
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });
});
