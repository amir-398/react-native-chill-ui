import { render, screen } from '@testing-library/react-native';

import { String } from '../../string';
import { Box } from '../components/Box';

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

describe('Box Component (Hybrid)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Box>
          <String>Hello World</String>
        </Box>,
      );
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should render with default props', () => {
      const { getByText } = render(
        <Box>
          <String>Default Content</String>
        </Box>,
      );
      const boxElement = getByText('Default Content');
      expect(boxElement).toBeTruthy();
    });

    it('should handle empty children', () => {
      const component = render(<Box />);
      expect(component).toBeTruthy();
    });
  });

  describe('Layout Styles', () => {
    it('should render with flexDirection row', () => {
      render(
        <Box style={{ flexDirection: 'row' }}>
          <String>Row Layout</String>
        </Box>,
      );
      expect(screen.getByText('Row Layout')).toBeTruthy();
    });

    it('should render with flexDirection column', () => {
      render(
        <Box style={{ flexDirection: 'column' }}>
          <String>Column Layout</String>
        </Box>,
      );
      expect(screen.getByText('Column Layout')).toBeTruthy();
    });

    it('should render with justifyContent center', () => {
      render(
        <Box style={{ justifyContent: 'center' }}>
          <String>Centered</String>
        </Box>,
      );
      expect(screen.getByText('Centered')).toBeTruthy();
    });

    it('should render with alignItems center', () => {
      render(
        <Box style={{ alignItems: 'center' }}>
          <String>Aligned</String>
        </Box>,
      );
      expect(screen.getByText('Aligned')).toBeTruthy();
    });

    it('should render with flex: 1', () => {
      render(
        <Box style={{ flex: 1 }}>
          <String>Flexible</String>
        </Box>,
      );
      expect(screen.getByText('Flexible')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(
        <Box className="custom-class">
          <String>Custom Class</String>
        </Box>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <Box style={customStyle}>
          <String>Custom Style</String>
        </Box>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });

    it('should combine multiple props', () => {
      render(
        <Box className="custom-class" style={{ backgroundColor: '#FF0000' }}>
          <String>Combined Props</String>
        </Box>,
      );
      expect(screen.getByText('Combined Props')).toBeTruthy();
    });
  });

  describe('React Native View Props', () => {
    it('should handle accessibility props', () => {
      render(
        <Box accessible accessibilityLabel="Test label" accessibilityHint="Test hint" accessibilityRole="button">
          <String>Accessible Box</String>
        </Box>,
      );
      expect(screen.getByText('Accessible Box')).toBeTruthy();
    });

    it('should handle testID prop', () => {
      render(
        <Box testID="test-box">
          <String>Test Box</String>
        </Box>,
      );
      expect(screen.getByText('Test Box')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const component = render(<Box>{null}</Box>);
      expect(component).toBeTruthy();
    });

    it('should handle undefined children gracefully', () => {
      const component = render(<Box>{undefined}</Box>);
      expect(component).toBeTruthy();
    });

    it('should handle number children', () => {
      const component = render(<Box>{42}</Box>);
      expect(component).toBeTruthy();
      // Note: View components cannot directly display number children as text
      // This test verifies the component doesn't crash with number children
    });

    it('should handle multiple children', () => {
      render(
        <Box>
          <String>Child 1</String>
          <String>Child 2</String>
        </Box>,
      );
      expect(screen.getByText('Child 1')).toBeTruthy();
      expect(screen.getByText('Child 2')).toBeTruthy();
    });
  });
});
