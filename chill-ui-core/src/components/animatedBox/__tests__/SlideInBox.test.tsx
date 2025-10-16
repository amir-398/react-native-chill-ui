import React from 'react';
import { Animated } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { String } from '../../string';
import { SlideInBox } from '../index';

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

describe('SlideInBox Component', () => {
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
        <SlideInBox>
          <String>Slide Content</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Slide Content')).toBeTruthy();
    });
  });

  describe('Direction Props', () => {
    it('should handle different directions', () => {
      const directions = ['left', 'right', 'up', 'down'] as const;

      directions.forEach(direction => {
        const { unmount } = render(
          <SlideInBox direction={direction}>
            <String>{direction} Slide</String>
          </SlideInBox>,
        );
        expect(screen.getByText(`${direction} Slide`)).toBeTruthy();
        unmount();
      });
    });
  });

  describe('Animation Props', () => {
    it('should handle animation props', () => {
      render(
        <SlideInBox autoStart infiniteLoop duration={1000} distance={50}>
          <String>Animated Slide</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Animated Slide')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start slide animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <SlideInBox autoStart duration={1000} direction="left">
          <String>Auto Animation</String>
        </SlideInBox>,
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
        <SlideInBox ref={ref}>
          <String>Ref Test</String>
        </SlideInBox>,
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
        <SlideInBox style={customStyle}>
          <String>Custom Style</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });
});
