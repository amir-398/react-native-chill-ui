import { render, screen } from '@testing-library/react-native';
import { ToastProvider } from '../components/ToastProvider.ss';
import { View, Text } from 'react-native';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
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
    const styleSheetVariants = {
      success: {
        style: { backgroundColor: '#10B981' },
        iconProps: { style: { color: '#FFFFFF' } },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold' } },
        messageStringProps: { style: { color: '#FFFFFF' } },
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
    const styleSheetVariants = {
      success: {
        style: { backgroundColor: '#10B981', borderRadius: 8 },
        iconProps: { style: { color: '#FFFFFF', fontSize: 20 } },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 14 } },
      },
      error: {
        style: { backgroundColor: '#EF4444', borderRadius: 12 },
        iconProps: { style: { color: '#FFFFFF', fontSize: 22 } },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 16 } },
      },
      warning: {
        style: { backgroundColor: '#F59E0B', borderRadius: 6 },
        iconProps: { style: { color: '#000000', fontSize: 18 } },
        titleStringProps: { style: { color: '#000000', fontWeight: 'bold', fontSize: 14 } },
        messageStringProps: { style: { color: '#000000', fontSize: 12 } },
      },
      info: {
        style: { backgroundColor: '#3B82F6', borderRadius: 10 },
        iconProps: { style: { color: '#FFFFFF', fontSize: 24 } },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 20 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 18 } },
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
    const styleSheetVariants = {
      success: {
        style: {
          backgroundColor: '#10B981',
          borderRadius: 8,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        iconProps: { style: { color: '#FFFFFF', fontSize: 20 } },
        titleStringProps: { style: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 } },
        messageStringProps: { style: { color: '#FFFFFF', fontSize: 14 } },
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
    const styleSheetVariants = {
      success: {
        style: {
          backgroundColor: '#10B981',
          borderRadius: 16,
          padding: 20,
          margin: 10,
          borderWidth: 2,
          borderColor: '#059669',
          shadowColor: '#10B981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        },
        iconProps: {
          style: {
            color: '#FFFFFF',
            fontSize: 24,
            textShadowColor: '#000',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          },
        },
        titleStringProps: {
          style: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 18,
            textShadowColor: '#000',
            textShadowOffset: { width: 1, height: 1 },
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
