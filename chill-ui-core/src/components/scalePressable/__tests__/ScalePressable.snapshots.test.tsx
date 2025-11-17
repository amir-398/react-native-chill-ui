import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { ScalePressable } from '../components/ScalePressable.hybrid';

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
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="animated-box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

describe('ScalePressable Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with basic props', () => {
    const tree = render(
      <ScalePressable>
        <Text>Basic Content</Text>
      </ScalePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom scaleValue', () => {
    const tree = render(
      <ScalePressable scaleValue={0.85}>
        <Text>Small Scale</Text>
      </ScalePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom duration', () => {
    const tree = render(
      <ScalePressable duration={200}>
        <Text>Fast Animation</Text>
      </ScalePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with disabled state', () => {
    const tree = render(
      <ScalePressable disabled>
        <Text>Disabled</Text>
      </ScalePressable>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom styling', () => {
    const tree = render(
      <ScalePressable className="custom-class" style={{ margin: 10 }}>
        <View style={{ backgroundColor: '#10B981', borderRadius: 8, padding: 16 }}>
          <Text style={{ color: 'white' }}>Styled Button</Text>
        </View>
      </ScalePressable>,
    );
    expect(tree).toMatchSnapshot();
  });
});
