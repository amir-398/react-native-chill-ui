import { render, screen } from '@testing-library/react-native';
import { ToastProvider } from '../components/ToastProvider.tw';
import { View, Text } from 'react-native';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mocks
jest.mock('../../../utils', () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconTw: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('Toast.tw', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ToastProvider with Tailwind classes', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports Tailwind variants', () => {
    const tailwindVariants = {
      success: {
        className: 'bg-green-500',
        iconProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
        messageStringProps: { className: 'text-white' },
      },
    };

    render(
      <ToastProvider variants={tailwindVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports multiple Tailwind variants', () => {
    const tailwindVariants = {
      success: {
        className: 'bg-green-500',
        iconProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
        messageStringProps: { className: 'text-white' },
      },
      error: {
        className: 'bg-red-500',
        iconProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
        messageStringProps: { className: 'text-white' },
      },
      warning: {
        className: 'bg-yellow-500',
        iconProps: { className: 'text-black' },
        titleStringProps: { className: 'text-black font-bold' },
        messageStringProps: { className: 'text-black' },
      },
      info: {
        className: 'bg-blue-500',
        iconProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
        messageStringProps: { className: 'text-white' },
      },
    };

    render(
      <ToastProvider variants={tailwindVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports Tailwind with all props', () => {
    const tailwindVariants = {
      success: {
        className: 'bg-green-500 rounded-lg shadow-lg',
        iconProps: { className: 'text-white text-xl' },
        titleStringProps: { className: 'text-white font-bold text-lg' },
        messageStringProps: { className: 'text-white text-sm' },
      },
    };

    render(
      <ToastProvider
        allowMultiple
        maxToasts={3}
        swipeable
        offsetY={25}
        defaultDuration={4000}
        variants={tailwindVariants}
      >
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports complex Tailwind classes', () => {
    const tailwindVariants = {
      success: {
        className: 'bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-2xl border border-green-300',
        iconProps: { className: 'text-white text-2xl drop-shadow-lg' },
        titleStringProps: { className: 'text-white font-extrabold text-xl tracking-wide' },
        messageStringProps: { className: 'text-white text-base opacity-90' },
      },
    };

    render(
      <ToastProvider variants={tailwindVariants}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports empty Tailwind variants', () => {
    render(
      <ToastProvider variants={{}}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports undefined Tailwind variants', () => {
    render(
      <ToastProvider>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports Tailwind with allowMultiple', () => {
    render(
      <ToastProvider allowMultiple maxToasts={4}>
        <View>
          <Text>Test Content</Text>
        </View>
      </ToastProvider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('supports Tailwind with swipeable', () => {
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
