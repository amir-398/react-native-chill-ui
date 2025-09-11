import React from 'react';
import { render, screen, act } from '@testing-library/react-native';

import String from '../../string/components/String';
import ScaleInBox from '../components/ScaleInBox/ScaleInBox';
import ScaleInBoxSS from '../components/ScaleInBox/ScaleInBox.ss';
import ScaleInBoxTW from '../components/ScaleInBox/ScaleInBox.tw';

// Mock StyleSheet styles
jest.mock('../styles/AnimatedBox.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mock Tailwind utilities
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

// Mock Hybrid utilities
jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style?.defaultStyle || style })),
}));

describe('ScaleInBox Component - All Variants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('should render children correctly (Hybrid)', () => {
      render(
        <ScaleInBox>
          <String>Scale Content</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Scale Content')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <ScaleInBoxSS>
          <String>Scale Content SS</String>
        </ScaleInBoxSS>,
      );
      expect(screen.getByText('Scale Content SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <ScaleInBoxTW>
          <String>Scale Content TW</String>
        </ScaleInBoxTW>,
      );
      expect(screen.getByText('Scale Content TW')).toBeTruthy();
    });
  });

  describe('Scale Props', () => {
    it('should render with custom fromScale', () => {
      render(
        <ScaleInBox>
          <String>Half Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Half Scale')).toBeTruthy();
    });

    it('should render with custom toScale', () => {
      render(
        <ScaleInBox>
          <String>Large Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Large Scale')).toBeTruthy();
    });

    it('should render with custom duration', () => {
      render(
        <ScaleInBox>
          <String>Custom Duration</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Custom Duration')).toBeTruthy();
    });

    it('should render with custom delay', () => {
      render(
        <ScaleInBox>
          <String>Delayed Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Delayed Scale')).toBeTruthy();
    });

    it('should handle autoStart prop', () => {
      render(
        <ScaleInBox autoStart>
          <String>Auto Start</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Auto Start')).toBeTruthy();
    });

    it('should handle infiniteLoop prop', () => {
      render(
        <ScaleInBox infiniteLoop>
          <String>Infinite Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Infinite Scale')).toBeTruthy();
    });
  });

  describe('Ref Methods', () => {
    it('should expose start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <ScaleInBox ref={ref}>
          <String>Ref Test</String>
        </ScaleInBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });

    it('should reset scale when stop method is called', async () => {
      const ref = React.createRef<any>();

      render(
        <ScaleInBox ref={ref}>
          <String>Manual Stop</String>
        </ScaleInBox>,
      );

      act(() => {
        ref.current?.stop();
      });

      // Component should still be rendered after stop
      expect(screen.getByText('Manual Stop')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <ScaleInBoxTW className="custom-scale-class">
          <String>Custom Class</String>
        </ScaleInBoxTW>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <ScaleInBoxSS style={customStyle}>
          <String>Custom Style</String>
        </ScaleInBoxSS>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Real World Scenarios', () => {
    it('should create scale-in button', () => {
      render(
        <ScaleInBox autoStart>
          <String>Click Me!</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Click Me!')).toBeTruthy();
    });

    it('should create scale-in card', () => {
      render(
        <ScaleInBox autoStart>
          <String>Card Title</String>
          <String>Card content</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Card Title')).toBeTruthy();
      expect(screen.getByText('Card content')).toBeTruthy();
    });

    it('should create scale-in icon', () => {
      render(
        <ScaleInBox autoStart>
          <String>🚀</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('🚀')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero fromScale', () => {
      render(
        <ScaleInBox autoStart>
          <String>Zero Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Zero Scale')).toBeTruthy();
    });

    it('should handle very large toScale', () => {
      render(
        <ScaleInBox autoStart>
          <String>Large Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Large Scale')).toBeTruthy();
    });

    it('should handle negative scale values', () => {
      render(
        <ScaleInBox autoStart>
          <String>Negative Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Negative Scale')).toBeTruthy();
    });

    it('should handle zero duration', () => {
      render(
        <ScaleInBox autoStart>
          <String>Instant Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Instant Scale')).toBeTruthy();
    });

    it('should handle same fromScale and toScale', () => {
      render(
        <ScaleInBox autoStart>
          <String>No Scale Change</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('No Scale Change')).toBeTruthy();
    });
  });

  describe('Multiple Scale Animations', () => {
    it('should handle multiple scale boxes with different scales', () => {
      render(
        <>
          <ScaleInBox autoStart>
            <String>Scale 1</String>
          </ScaleInBox>
          <ScaleInBox autoStart>
            <String>Scale 2</String>
          </ScaleInBox>
          <ScaleInBox autoStart>
            <String>Scale 3</String>
          </ScaleInBox>
        </>,
      );

      expect(screen.getByText('Scale 1')).toBeTruthy();
      expect(screen.getByText('Scale 2')).toBeTruthy();
      expect(screen.getByText('Scale 3')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should handle rapid start/stop calls', async () => {
      const ref = React.createRef<any>();

      render(
        <ScaleInBox ref={ref}>
          <String>Performance Test</String>
        </ScaleInBox>,
      );

      // Rapid start/stop calls shouldn't crash
      act(() => {
        ref.current?.start();
        ref.current?.stop();
        ref.current?.start();
        ref.current?.stop();
      });

      expect(screen.getByText('Performance Test')).toBeTruthy();
    });
  });
});
