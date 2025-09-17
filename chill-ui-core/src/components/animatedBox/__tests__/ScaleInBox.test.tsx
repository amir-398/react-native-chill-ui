import React from 'react';
import { render, screen } from '@testing-library/react-native';

import String from '../../string/components/String';
import ScaleInBox from '../components/ScaleInBox/ScaleInBox';

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

describe('ScaleInBox Component', () => {
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
        <ScaleInBox>
          <String>Scale Content</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Scale Content')).toBeTruthy();
    });
  });

  describe('Scale Props', () => {
    it('should handle scale props', () => {
      render(
        <ScaleInBox>
          <String>Scaled Content</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Scaled Content')).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should handle animation props', () => {
      render(
        <ScaleInBox autoStart infiniteLoop delay={500}>
          <String>Animated Scale</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Animated Scale')).toBeTruthy();
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
  });

  describe('Custom Styling', () => {
    it('should apply custom styling', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <ScaleInBox style={customStyle}>
          <String>Custom Style</String>
        </ScaleInBox>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });
});
