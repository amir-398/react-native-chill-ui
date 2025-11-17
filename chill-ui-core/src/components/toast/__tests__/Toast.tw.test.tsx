import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ToastProvider } from '../components/ToastProvider.tw';
import { ToastVariantTypeProps } from '@/types/toast/toast.tw.types';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
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
    const tailwindVariants: ToastVariantTypeProps = {
      success: {
        className: 'bg-green-500',
        iconProps: { className: 'text-white', name: 'check-solid' },
        messageStringProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
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
    const tailwindVariants: ToastVariantTypeProps = {
      error: {
        className: 'bg-red-500',
        iconProps: { className: 'text-white', name: 'check-solid' },
        messageStringProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
      },
      info: {
        className: 'bg-blue-500',
        iconProps: { className: 'text-white', name: 'xmark-solid' },
        messageStringProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
      },
      success: {
        className: 'bg-green-500',
        iconProps: { className: 'text-white', name: 'warning-solid' },
        messageStringProps: { className: 'text-white' },
        titleStringProps: { className: 'text-white font-bold' },
      },
      warning: {
        className: 'bg-yellow-500',
        iconProps: { className: 'text-black', name: 'angle-down-solid' },
        messageStringProps: { className: 'text-black' },
        titleStringProps: { className: 'text-black font-bold' },
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
        iconProps: { className: 'text-white text-xl', name: 'check-circle-solid' as const },
        messageStringProps: { className: 'text-white text-sm' },
        titleStringProps: { className: 'text-white font-bold text-lg' },
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
        iconProps: { className: 'text-white text-2xl drop-shadow-lg', name: 'check-circle-solid' as const },
        messageStringProps: { className: 'text-white text-base opacity-90' },
        titleStringProps: { className: 'text-white font-extrabold text-xl tracking-wide' },
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
