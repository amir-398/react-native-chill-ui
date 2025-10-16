import React from 'react';
import { Animated } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { FadeInBox } from '../index';
import { String } from '../../string';

// Mock StyleSheet styles
jest.mock('../styles/AnimatedBox.ss.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock('../styles/AnimatedBox.tw.styles', () => ({
  twStyles: jest.fn(() => ({})),
}));

// Mock String styles
jest.mock('../../string/styles/String.ss.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
  StringSv: jest.fn(() => ({})),
  styles: jest.fn(() => ({})),
}));

jest.mock('../../string/styles/String.tw.styles', () => ({
  stringTv: jest.fn(() => ({})),
  twStyles: jest.fn(() => ({})),
}));

// Mock AnimatedBox component
jest.mock('../components/animatedBox/AnimatedBox', () => ({
  __esModule: true,
  AnimatedBox: ({ children }: any) => children,
  default: ({ children }: any) => children,
}));

// Mock Box component
jest.mock('../../box/components/View', () => ({
  AnimatedView: ({ children, ...props }: any) => children,
}));

// Mock Tailwind utilities
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

// Mock cn from @utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  isNativeWindInstalled: jest.fn(() => false),
  StringSv: jest.fn(() => ({})),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
  sv: jest.fn(() => ({})),
}));

// Mock Hybrid utilities
jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style?.defaultStyle || style })),
}));

describe('FadeInBox Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(
        <FadeInBox>
          <String>Fade In Content</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Fade In Content')).toBeTruthy();
    });

    it('should handle empty children', () => {
      const component = render(<FadeInBox />);
      expect(component).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should handle autoStart and infiniteLoop props', () => {
      render(
        <FadeInBox autoStart infiniteLoop duration={1000}>
          <String>Animated Content</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Animated Content')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <FadeInBox autoStart duration={1000}>
          <String>Auto Animation</String>
        </FadeInBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <FadeInBox ref={ref}>
          <String>Ref Test</String>
        </FadeInBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom styling', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <FadeInBox style={customStyle}>
          <String>Custom Style</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });
});
