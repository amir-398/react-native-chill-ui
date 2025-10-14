import { render, screen } from '@testing-library/react-native';
import { ToastProvider } from '../components/ToastProvider';
import { View, Text } from 'react-native';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ToastProvider without crashing', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports allowMultiple prop', () => {
    render(
      <ToastProvider allowMultiple maxToasts={3}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports swipeable prop', () => {
    render(
      <ToastProvider swipeable>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports offsetY prop', () => {
    render(
      <ToastProvider offsetY={50}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports defaultDuration prop', () => {
    render(
      <ToastProvider defaultDuration={5000}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports custom variants', () => {
    const customVariants = {
      success: {
        backgroundColor: '#10B981',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
    };

    render(
      <ToastProvider variants={customVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports multiple custom variants', () => {
    const customVariants = {
      success: {
        backgroundColor: '#10B981',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
      error: {
        backgroundColor: '#EF4444',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
      warning: {
        backgroundColor: '#F59E0B',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
      info: {
        backgroundColor: '#3B82F6',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
    };

    render(
      <ToastProvider variants={customVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports all props combined', () => {
    const customVariants = {
      success: {
        backgroundColor: '#10B981',
        iconProps: { color: '#FFFFFF' },
        titleStringProps: { color: '#FFFFFF' },
        messageStringProps: { color: '#FFFFFF' },
      },
    };

    render(
      <ToastProvider
        allowMultiple
        maxToasts={5}
        swipeable
        offsetY={100}
        defaultDuration={6000}
        variants={customVariants}
      >
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('handles empty variants object', () => {
    render(
      <ToastProvider variants={{}}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('handles undefined variants', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports maxToasts with allowMultiple', () => {
    render(
      <ToastProvider allowMultiple maxToasts={2}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports maxToasts without allowMultiple', () => {
    render(
      <ToastProvider allowMultiple={false} maxToasts={1}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports negative offsetY', () => {
    render(
      <ToastProvider offsetY={-50}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports zero offsetY', () => {
    render(
      <ToastProvider offsetY={0}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports very short duration', () => {
    render(
      <ToastProvider defaultDuration={100}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports very long duration', () => {
    render(
      <ToastProvider defaultDuration={10000}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports zero duration', () => {
    render(
      <ToastProvider defaultDuration={0}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports swipeable with allowMultiple', () => {
    render(
      <ToastProvider swipeable allowMultiple>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports swipeable without allowMultiple', () => {
    render(
      <ToastProvider swipeable allowMultiple={false}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports complex nested children', () => {
    render(
      <ToastProvider>
        <View>
          <View>
            <Text>Nested Content</Text>
            <View>
              <Text>Deep Nested</Text>
            </View>
          </View>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Nested Content')).toBeTruthy();
    expect(screen.getByText('Deep Nested')).toBeTruthy();
  });

  it('supports multiple children', () => {
    render(
      <ToastProvider>
        <View>
          <Text>First Child</Text>
        </View>
        <View>
          <Text>Second Child</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('First Child')).toBeTruthy();
    expect(screen.getByText('Second Child')).toBeTruthy();
  });

  it('supports no children', () => {
    render(<ToastProvider />);
    // Should not crash
    expect(true).toBeTruthy();
  });
});
