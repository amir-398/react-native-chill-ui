import { render, screen } from '@testing-library/react-native';

import { String } from '../../string';
import { Box, BoxCenter } from '../components/Box';

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

describe('Box Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    render(
      <Box>
        <String>Hello World</String>
      </Box>,
    );
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('should handle layout styles', () => {
    render(
      <BoxCenter>
        <String>Centered Content</String>
      </BoxCenter>,
    );
    expect(screen.getByText('Centered Content')).toBeTruthy();
  });

  it('should handle custom styling', () => {
    const customStyle = { backgroundColor: '#FF0000', padding: 10 };

    render(
      <Box style={customStyle}>
        <String>Styled Content</String>
      </Box>,
    );
    expect(screen.getByText('Styled Content')).toBeTruthy();
  });

  it('should handle accessibility props', () => {
    render(
      <Box accessible accessibilityLabel="Custom container">
        <String>Accessible Content</String>
      </Box>,
    );
    expect(screen.getByText('Accessible Content')).toBeTruthy();
  });
});
