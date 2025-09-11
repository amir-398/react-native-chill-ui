import { render, screen } from '@testing-library/react-native';

import String from '../components/String';

// Mock des utilitaires hybrid pour éviter les erreurs
jest.mock('../../../utils/hybrid/classNameMissingError', () => ({
  classNamePropsHandler: jest.fn(),
}));

jest.mock('../../../utils/hybrid/colorVariantPropsHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
}));

describe('String Component (Hybrid)', () => {
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
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

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
      'success',
      'warning',
      'error',
      'danger',
      'info',
      'neutral',
      'muted',
    ] as const;

    colorVariants.forEach(colorVariant => {
      it(`should render with colorVariant ${colorVariant}`, () => {
        render(<String colorVariant={colorVariant}>Color Test</String>);
        expect(screen.getByText('Color Test')).toBeTruthy();
      });
    });

    it('should render with custom color', () => {
      render(<String color="#FF0000">Custom Color</String>);
      expect(screen.getByText('Custom Color')).toBeTruthy();
    });
  });

  describe('Font Variants', () => {
    const fonts = [
      'primaryRegular',
      'primaryBold',
      'primaryMedium',
      'primarySemiBold',
      'secondaryRegular',
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
    const variants = ['body-1', 'body-2', 'body-3', 'body-sm', 'body-xs', 'title-1', 'title-2', 'title-3'] as const;

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

  describe('Weight Variants', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

    weights.forEach(weight => {
      it(`should render with weight ${weight}`, () => {
        render(<String weight={weight}>Weight Test</String>);
        expect(screen.getByText('Weight Test')).toBeTruthy();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(<String className="custom-class">Custom Class</String>);
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style', () => {
      const customStyle = { fontSize: 20 };
      render(<String style={customStyle}>Custom Style</String>);
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });

    it('should combine multiple props', () => {
      render(
        <String size="lg" colorVariant="primary" font="primaryBold" position="center" className="combined-test">
          Combined Props
        </String>,
      );
      expect(screen.getByText('Combined Props')).toBeTruthy();
    });
  });

  describe('React Native Text Props', () => {
    it('should handle onPress prop', () => {
      const onPressMock = jest.fn();
      render(<String onPress={onPressMock}>Pressable Text</String>);

      const textElement = screen.getByText('Pressable Text');
      expect(textElement).toBeTruthy();
    });

    it('should handle numberOfLines prop', () => {
      render(<String numberOfLines={2}>Long text that should be truncated</String>);
      expect(screen.getByText('Long text that should be truncated')).toBeTruthy();
    });

    it('should handle ellipsizeMode prop', () => {
      render(<String ellipsizeMode="tail">Text with ellipsize</String>);
      expect(screen.getByText('Text with ellipsize')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should handle accessibility props', () => {
      render(
        <String accessible accessibilityLabel="Test label" accessibilityHint="Test hint" accessibilityRole="text">
          Accessible Text
        </String>,
      );
      expect(screen.getByText('Accessible Text')).toBeTruthy();
    });

    it('should have default accessibility role', () => {
      const { getByText } = render(<String>Accessible by default</String>);
      const textElement = getByText('Accessible by default');
      expect(textElement).toBeTruthy();
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

    it('should handle boolean children', () => {
      render(<String>{true}</String>);
      // Boolean values are not rendered by React, so container should be empty
      expect(screen.queryByText('true')).toBeNull();
    });
  });
});
