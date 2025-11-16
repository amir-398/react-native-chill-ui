import React from 'react';
import { Animated } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { String } from '../../string';
import { RotatingBox } from '../index';

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
  AnimatedView: ({ children }: any) => children,
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

describe('RotatingBox Component', () => {
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
        <RotatingBox>
          <String>Rotating Content</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Rotating Content')).toBeTruthy();
    });
  });

  describe('Rotation Props', () => {
    it('should handle rotation props', () => {
      render(
        <RotatingBox duration={2000} autoStart infiniteLoop>
          <String>Rotating Content</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Rotating Content')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start rotation animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <RotatingBox autoStart duration={1000}>
          <String>Auto Rotation</String>
        </RotatingBox>,
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
        <RotatingBox ref={ref}>
          <String>Ref Test</String>
        </RotatingBox>,
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
        <RotatingBox style={customStyle}>
          <String>Custom Style</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });
});
