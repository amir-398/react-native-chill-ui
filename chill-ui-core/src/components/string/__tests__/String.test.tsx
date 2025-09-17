import { render, screen, fireEvent } from '@testing-library/react-native';

import String from '../components/String';

// Mocks pour StyleSheet
jest.mock('../styles/String.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mocks pour Hybrid
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

// Mocks pour Tailwind
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

describe('String Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render text content correctly', () => {
    render(<String>Hello World</String>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('should handle different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<String size={size}>Size {size}</String>);
      expect(screen.getByText(`Size ${size}`)).toBeTruthy();
      unmount();
    });
  });

  it('should handle different text variants', () => {
    const variants = ['primary', 'secondary', 'error'] as const;

    variants.forEach(variant => {
      const { unmount } = render(<String variant={variant as any}>Variant {variant}</String>);
      expect(screen.getByText(`Variant ${variant}`)).toBeTruthy();
      unmount();
    });
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();

    render(<String onPress={onPressMock}>Clickable Text</String>);

    const textElement = screen.getByText('Clickable Text');
    fireEvent.press(textElement);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('should handle edge cases', () => {
    // Test with empty children
    const { rerender } = render(<String />);
    expect(screen.queryByText('')).toBeTruthy();

    // Test with number children
    rerender(<String>{123}</String>);
    expect(screen.getByText('123')).toBeTruthy();

    // Test with null children
    rerender(<String>{null}</String>);
    expect(screen.queryByText('')).toBeTruthy();
  });
});
