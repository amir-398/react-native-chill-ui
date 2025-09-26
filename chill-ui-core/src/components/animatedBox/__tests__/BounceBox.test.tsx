import React from 'react';
import { Animated } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import String from '../../string/components/String';
import BounceBox from '../components/BounceBox/BounceBox';

// Mock StyleSheet styles
jest.mock('../styles/AnimatedBox.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mock String styles
jest.mock('../../string/styles/String.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mock String variants
jest.mock('../../string/styles/String.variants', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
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

describe('BounceBox Component', () => {
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
        <BounceBox>
          <String>Bounce Content</String>
        </BounceBox>,
      );
      expect(screen.getByText('Bounce Content')).toBeTruthy();
    });
  });

  describe('Bounce Props', () => {
    it('should handle bounce props', () => {
      render(
        <BounceBox bounceHeight={20} bounceInterval={500} duration={1000}>
          <String>Bouncing Content</String>
        </BounceBox>,
      );
      expect(screen.getByText('Bouncing Content')).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should handle animation props', () => {
      render(
        <BounceBox autoStart infiniteLoop duration={1000}>
          <String>Animated Bounce</String>
        </BounceBox>,
      );
      expect(screen.getByText('Animated Bounce')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start bounce animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <BounceBox autoStart duration={1000} bounceHeight={10}>
          <String>Auto Bounce</String>
        </BounceBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose bounce, start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <BounceBox ref={ref}>
          <String>Ref Test</String>
        </BounceBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.bounce).toBe('function');
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom styling', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <BounceBox style={customStyle}>
          <String>Custom Style</String>
        </BounceBox>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });
});
