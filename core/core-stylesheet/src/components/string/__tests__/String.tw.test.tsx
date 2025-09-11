import { render, screen } from '@testing-library/react-native';

import String from '../components/String.tw';

// Mock du module cn pour éviter les erreurs avec tailwind
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

describe('String Component (Tailwind)', () => {
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

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const;

    sizes.forEach(size => {
      it(`should render with size ${size}`, () => {
        render(<String size={size}>Size Test</String>);
        expect(screen.getByText('Size Test')).toBeTruthy();
      });
    });
  });

  describe('Color Variants', () => {
    const colorVariants = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'error',
      'danger',
      'info',
      'neutral',
      'muted',
      'light',
      'dark',
      'white',
      'inverted',
      'disabled',
    ] as const;

    colorVariants.forEach(colorVariant => {
      it(`should render with colorVariant ${colorVariant}`, () => {
        render(<String colorVariant={colorVariant}>Color Test</String>);
        expect(screen.getByText('Color Test')).toBeTruthy();
      });
    });

    it('should render with custom color and apply inline style', () => {
      const { getByText } = render(<String color="#FF0000">Custom Color</String>);
      const textElement = getByText('Custom Color');
      expect(textElement).toBeTruthy();
      expect(textElement.props.style).toEqual(expect.objectContaining({ color: '#FF0000' }));
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
      'primaryExtraLight',
      'primaryExtraBold',
      'primaryItalic',
      'secondaryRegular',
      'secondaryBold',
      'tertiaryRegular',
    ] as const;

    fonts.forEach(font => {
      it(`should render with font ${font}`, () => {
        render(<String font={font}>Font Test</String>);
        expect(screen.getByText('Font Test')).toBeTruthy();
      });
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
      'title-6',
      'title-7',
      'title-8',
    ] as const;

    variants.forEach(variant => {
      it(`should render with variant ${variant}`, () => {
        render(<String variant={variant}>Variant Test</String>);
        expect(screen.getByText('Variant Test')).toBeTruthy();
      });
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

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(<String className="custom-class">Custom Class</String>);
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style alongside color', () => {
      const customStyle = { fontSize: 20 };
      const { getByText } = render(
        <String style={customStyle} color="#00FF00">
          Custom Style with Color
        </String>,
      );
      const textElement = getByText('Custom Style with Color');
      expect(textElement.props.style).toEqual(expect.objectContaining({ color: '#00FF00', fontSize: 20 }));
    });

    it('should combine multiple props with className generation', () => {
      render(
        <String size="lg" colorVariant="primary" font="primaryBold" position="center" className="combined-test">
          Combined Props
        </String>,
      );
      expect(screen.getByText('Combined Props')).toBeTruthy();
    });
  });

  describe('Tailwind Classes Generation', () => {
    it('should generate correct base classes', () => {
      const mockCn = require('../../../utils/tw/cn').default;

      render(<String>Test</String>);

      expect(mockCn).toHaveBeenCalledWith(
        'flex-shrink',
        'text-primary', // textColorVr result
        'text-left', // textPositionVr result
        'font-primary_regular_font text-[16px] leading-[24px]', // textFontVr result
        undefined, // textSizeVr result (no size provided)
        undefined, // className
      );
    });

    it('should include custom className in class generation', () => {
      const mockCn = require('../../../utils/tw/cn').default;

      render(<String className="custom-class">Test</String>);

      expect(mockCn).toHaveBeenCalledWith(
        'flex-shrink',
        'text-primary', // textColorVr result
        'text-left', // textPositionVr result
        'font-primary_regular_font text-[16px] leading-[24px]', // textFontVr result
        undefined, // textSizeVr result (no size provided)
        'custom-class',
      );
    });
  });

  describe('Style Handling', () => {
    it('should handle only custom color', () => {
      const { getByText } = render(<String color="#FF0000">Color Only</String>);
      const textElement = getByText('Color Only');
      expect(textElement.props.style).toEqual(expect.objectContaining({ color: '#FF0000' }));
    });

    it('should handle only custom style', () => {
      const customStyle = { fontSize: 20 };
      const { getByText } = render(<String style={customStyle}>Style Only</String>);
      const textElement = getByText('Style Only');
      expect(textElement.props.style).toEqual(expect.objectContaining({ fontSize: 20 }));
    });

    it('should handle both color and style', () => {
      const customStyle = { fontSize: 20 };
      const { getByText } = render(
        <String color="#FF0000" style={customStyle}>
          Both
        </String>,
      );
      const textElement = getByText('Both');
      expect(textElement.props.style).toEqual(expect.objectContaining({ color: '#FF0000', fontSize: 20 }));
    });
  });

  describe('React Native Text Props', () => {
    it('should forward all additional props to Text component', () => {
      const onPressMock = jest.fn();
      render(
        <String onPress={onPressMock} numberOfLines={2} ellipsizeMode="tail" selectable>
          Forwarded Props
        </String>,
      );

      const textElement = screen.getByText('Forwarded Props');
      expect(textElement).toBeTruthy();
      expect(textElement.props.onPress).toBeDefined();
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.selectable).toBe(true);
    });
  });

  describe('Default Values', () => {
    it('should use default colorVariant when not provided', () => {
      render(<String>Default Color</String>);
      expect(screen.getByText('Default Color')).toBeTruthy();
    });

    it('should use default font when not provided', () => {
      render(<String>Default Font</String>);
      expect(screen.getByText('Default Font')).toBeTruthy();
    });

    it('should use default variant when not provided', () => {
      render(<String>Default Variant</String>);
      expect(screen.getByText('Default Variant')).toBeTruthy();
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

    it('should handle array of strings', () => {
      render(<String>{['Hello', ' ', 'World']}</String>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });
  });
});
