import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ToastProvider } from '../components/ToastProvider.ss';
import { ToastVariantTypePropsSs } from '@types';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
}));

// Mocks
jest.mock('../../../utils', () => ({
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  StringSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconSs: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('Toast.ss', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ToastProvider with StyleSheet styles', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports StyleSheet variants', () => {
    const styleSheetVariants: ToastVariantTypePropsSs = {
      success: {
        iconProps: { style: { color: '#FFFFFF' }, name: 'angle-down-solid' },
        messageStringProps: { style: { color: '#FFFFFF' } },
        style: { backgroundColor: '#10B981' },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold' } },
      },
    };

    render(
      <ToastProvider variants={styleSheetVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports multiple StyleSheet variants', () => {
    const styleSheetVariants: ToastVariantTypePropsSs = {
      error: {
        iconProps: { style: { color: '#FFFFFF', fontSize: 22 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 16 } },
        style: { backgroundColor: '#EF4444', borderRadius: 12 },
        titleStringProps: { style: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' } },
      },
      info: {
        iconProps: { style: { color: '#FFFFFF', fontSize: 24 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 18 } },
        style: { backgroundColor: '#3B82F6', borderRadius: 10 },
        titleStringProps: { style: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' } },
      },
      success: {
        iconProps: { style: { color: '#FFFFFF', fontSize: 20 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 14 } },
        style: { backgroundColor: '#10B981', borderRadius: 8 },
        titleStringProps: { style: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' } },
      },
      warning: {
        iconProps: { style: { color: '#000000', fontSize: 18 } },
        messageStringProps: { style: { color: '#000000', fontSize: 12 } },
        style: { backgroundColor: '#F59E0B', borderRadius: 6 },
        titleStringProps: { style: { color: '#000000', fontSize: 14, fontWeight: 'bold' } },
      },
    };

    render(
      <ToastProvider variants={styleSheetVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports StyleSheet with all props', () => {
    const styleSheetVariants: ToastVariantTypePropsSs = {
      success: {
        iconProps: { style: { color: '#FFFFFF', fontSize: 20 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 14 } },
        style: {
          backgroundColor: '#10B981',
          borderRadius: 8,
          elevation: 5,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { height: 2, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        titleStringProps: { style: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' } },
      },
    };

    render(
      <ToastProvider
        allowMultiple
        maxToasts={3}
        swipeable
        offsetY={30}
        defaultDuration={3500}
        variants={styleSheetVariants}
      >
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports complex StyleSheet styles', () => {
    const styleSheetVariants: ToastVariantTypePropsSs = {
      success: {
        iconProps: {
          style: {
            color: '#FFFFFF',
            fontSize: 24,
            textShadowColor: '#000',
            textShadowOffset: { height: 1, width: 1 },
            textShadowRadius: 2,
          },
        },
        messageStringProps: {
          style: {
            color: '#FFFFFF',
            fontSize: 16,
            opacity: 0.9,
          },
        },
        style: {
          backgroundColor: '#10B981',
          borderColor: '#059669',
          borderRadius: 16,
          borderWidth: 2,
          elevation: 8,
          margin: 10,
          padding: 20,
          shadowColor: '#10B981',
          shadowOffset: { height: 4, width: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        },
        titleStringProps: {
          style: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            textShadowColor: '#000',
            textShadowOffset: { height: 1, width: 1 },
            textShadowRadius: 2,
          },
        },
      },
    };

    render(
      <ToastProvider variants={styleSheetVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports empty StyleSheet variants', () => {
    render(
      <ToastProvider variants={{}}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports undefined StyleSheet variants', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports StyleSheet with allowMultiple', () => {
    render(
      <ToastProvider allowMultiple maxToasts={2}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports StyleSheet with swipeable', () => {
    render(
      <ToastProvider swipeable>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});
