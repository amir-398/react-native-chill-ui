import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import RipplePressable from '../components/RipplePressable';

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
}));

// Mock AnimatedBox
jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children, ...props }: any) => {
    const React = require('react');
    const { View } = require('react-native');
    return (
      <View testID="animated-box" {...props}>
        {children}
      </View>
    );
  },
}));

describe('RipplePressable Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with basic props', () => {
    const tree = render(
      <RipplePressable>
        <Text>Basic Content</Text>
      </RipplePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom effectColor', () => {
    const tree = render(
      <RipplePressable effectColor="rgba(255, 0, 0, 0.3)">
        <Text>Red Ripple</Text>
      </RipplePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom speed', () => {
    const tree = render(
      <RipplePressable speed={300}>
        <Text>Fast Ripple</Text>
      </RipplePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with disabled state', () => {
    const tree = render(
      <RipplePressable disabled>
        <Text>Disabled</Text>
      </RipplePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom styling', () => {
    const tree = render(
      <RipplePressable className="custom-class" style={{ margin: 10 }}>
        <View style={{ padding: 16, backgroundColor: '#3B82F6', borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>Styled Button</Text>
        </View>
      </RipplePressable>,
    );
    expect(tree).toMatchSnapshot();
  });
});
