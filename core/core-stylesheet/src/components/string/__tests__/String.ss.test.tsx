import { TextStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import String from '../components/String';

// Mock du module StringSv pour éviter les erreurs avec les styles
jest.mock('../styles/String.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

describe('String Component (StyleSheet)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render text content correctly', () => {
      render(<String>Hello World</String>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should render with default props', () => {
      const { getByText } = render(<String>Default Text</String>);
      const textElement = getByText('Default Text');
      expect(textElement).toBeTruthy();
    });

    it('should handle empty children', () => {
      const component = render(<String />);
      expect(component).toBeTruthy();
    });
  });

  describe('Font Variants', () => {
    const fonts = [
      'primaryRegular',
      'primaryBold',
      'primaryMedium',
      'primarySemiBold',
      'primaryLight',
      'primaryThin',
      'secondaryRegular',
      'tertiaryRegular',
    ] as const;

    fonts.forEach(font => {
      it(`should render with font ${font}`, () => {
        render(<String font={font}>Font Test</String>);
        expect(screen.getByText('Font Test')).toBeTruthy();
      });
    });

    it('should use default font when not provided', () => {
      render(<String>Default Font</String>);
      expect(screen.getByText('Default Font')).toBeTruthy();
    });
  });

  describe('Text Variants', () => {
    const variants = [
      'body-1',
      'body-2',
      'body-3',
      'body-sm',
      'body-xs',
      'title-1',
      'title-2',
      'title-3',
      'title-4',
      'title-5',
    ] as const;

    variants.forEach(variant => {
      it(`should render with variant ${variant}`, () => {
        render(<String variant={variant}>Variant Test</String>);
        expect(screen.getByText('Variant Test')).toBeTruthy();
      });
    });

    it('should use default variant when not provided', () => {
      render(<String>Default Variant</String>);
      expect(screen.getByText('Default Variant')).toBeTruthy();
    });
  });

  describe('Position Variants', () => {
    const positions = ['left', 'center', 'right'] as const;

    positions.forEach(position => {
      it(`should render with position ${position}`, () => {
        render(<String position={position}>Position Test</String>);
        expect(screen.getByText('Position Test')).toBeTruthy();
      });
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

    sizes.forEach(size => {
      it(`should render with size ${size}`, () => {
        render(<String size={size}>Size Test</String>);
        expect(screen.getByText('Size Test')).toBeTruthy();
      });
    });
  });

  describe('Style Generation', () => {
    it('should call StringSv with base style parameters', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(
        <String font="primaryBold" position="center" variant="title-1">
          Styled Text
        </String>,
      );

      expect(mockStringSv).toHaveBeenCalledWith({
        font: 'primaryBold',
        position: 'center',
        variant: 'title-1',
      });
    });

    it('should call StringSv separately for size when provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String size="lg">Sized Text</String>);

      // Called once for base style, once for size
      expect(mockStringSv).toHaveBeenCalledTimes(2);
      expect(mockStringSv).toHaveBeenNthCalledWith(1, {
        font: 'primaryRegular',
        position: undefined,
        variant: 'body-1',
      });
      expect(mockStringSv).toHaveBeenNthCalledWith(2, { size: 'lg' });
    });

    it('should not call StringSv for size when not provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String>No Size</String>);

      // Called only once for base style
      expect(mockStringSv).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom color as inline style', () => {
      const { getByText } = render(<String color="#FF0000">Custom Color</String>);
      const textElement = getByText('Custom Color');
      expect(textElement.props.style).toContainEqual({ color: '#FF0000' });
    });

    it('should apply custom style', () => {
      const customStyle = { fontSize: 20, fontWeight: 'bold' } as TextStyle;
      const { getByText } = render(<String style={customStyle}>Custom Style</String>);
      const textElement = getByText('Custom Style');
      expect(textElement.props.style).toContainEqual(customStyle);
    });

    it('should combine base style, size style, color, and custom style', () => {
      const mockStringSv = require('../styles/String.styles').default;
      mockStringSv
        .mockReturnValueOnce({ fontFamily: 'primary', fontSize: 16 }) // base style
        .mockReturnValueOnce({ fontSize: 20 }); // size style

      const customStyle = { fontWeight: 'bold' } as TextStyle;
      const { getByText } = render(
        <String size="lg" color="#FF0000" style={customStyle}>
          Combined Styles
        </String>,
      );

      const textElement = getByText('Combined Styles');
      expect(textElement.props.style).toEqual([
        { fontFamily: 'primary', fontSize: 16 }, // baseStyle
        { fontSize: 20 }, // sizeStyle
        { color: '#FF0000' }, // color
        customStyle, // custom style
      ]);
    });
  });

  describe('React Native Text Props', () => {
    it('should forward all additional props to Text component', () => {
      const onPressMock = jest.fn();
      render(
        <String onPress={onPressMock} numberOfLines={2} ellipsizeMode="tail" selectable testID="string-test">
          Forwarded Props
        </String>,
      );

      const textElement = screen.getByText('Forwarded Props');
      expect(textElement).toBeTruthy();
      expect(textElement.props.onPress).toBeDefined();
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.selectable).toBe(true);
      expect(textElement.props.testID).toBe('string-test');
    });
  });

  describe('Default Values', () => {
    it('should use default font when not provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String>Default Font</String>);

      expect(mockStringSv).toHaveBeenCalledWith({
        font: 'primaryRegular',
        position: undefined,
        variant: 'body-1',
      });
    });

    it('should use default variant when not provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String>Default Variant</String>);

      expect(mockStringSv).toHaveBeenCalledWith({
        font: 'primaryRegular',
        position: undefined,
        variant: 'body-1',
      });
    });
  });

  describe('Style Array Handling', () => {
    it('should handle empty size style correctly', () => {
      const mockStringSv = require('../styles/String.styles').default;
      mockStringSv.mockReturnValueOnce({ fontSize: 16 }); // base style only

      const { getByText } = render(<String>No Size Style</String>);
      const textElement = getByText('No Size Style');

      expect(textElement.props.style).toEqual([
        { fontSize: 16 }, // baseStyle
        {}, // empty sizeStyle
        undefined, // no color
        undefined, // no custom style
      ]);
    });

    it('should handle all style combinations', () => {
      const mockStringSv = require('../styles/String.styles').default;
      mockStringSv
        .mockReturnValueOnce({ fontSize: 16 }) // base
        .mockReturnValueOnce({ fontSize: 20 }); // size

      const customStyle = { color: 'blue' };
      const { getByText } = render(
        <String size="lg" color="#FF0000" style={customStyle}>
          All Styles
        </String>,
      );

      const textElement = getByText('All Styles');
      expect(textElement.props.style).toEqual([{ fontSize: 16 }, { fontSize: 20 }, { color: '#FF0000' }, customStyle]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const component = render(<String>{null}</String>);
      expect(component).toBeTruthy();
    });

    it('should handle undefined children gracefully', () => {
      const component = render(<String>{undefined}</String>);
      expect(component).toBeTruthy();
    });

    it('should handle number children', () => {
      render(<String>{42}</String>);
      expect(screen.getByText('42')).toBeTruthy();
    });

    it('should handle complex children', () => {
      render(<String>Complex {42} text with interpolated values</String>);
      expect(screen.getByText('Complex 42 text with interpolated values')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should not create unnecessary style objects when no size is provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String>Performance Test</String>);

      // Should only be called once for base style, not for size
      expect(mockStringSv).toHaveBeenCalledTimes(1);
    });

    it('should create separate style objects when size is provided', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(<String size="lg">Performance Test with Size</String>);

      // Should be called twice: once for base, once for size
      expect(mockStringSv).toHaveBeenCalledTimes(2);
    });
  });
});
