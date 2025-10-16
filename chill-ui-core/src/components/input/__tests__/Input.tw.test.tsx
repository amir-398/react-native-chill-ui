import { render, screen, fireEvent } from '@testing-library/react-native';

import Input from '../components/Input.tw';

// Mocks simples
jest.mock('../../../utils', () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  getStringLength: jest.fn(str => str?.length || 0),
  isNativeWindInstalled: jest.fn(() => true),
  isString: jest.fn(value => typeof value === 'string'),
}));

jest.mock('../../../components', () => ({
  BoxTw: ({ children }: any) => children,
}));

jest.mock('../../../components/icon', () => ({
  IconTw: ({ name, onPress }: any) => {
    function MockIcon() {
      return <div data-testid={`icon-${name}`} onClick={onPress} />;
    }
    return <MockIcon />;
  },
}));

jest.mock('../../../components/string', () => ({
  StringTw: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBoxTw: ({ children }: any) => children,
}));

describe('Input Component (Tailwind)', () => {
  it('should render input with placeholder', () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeTruthy();
  });

  it('should handle text input changes', () => {
    const onChangeTextMock = jest.fn();
    render(<Input placeholder="Test input" onChangeText={onChangeTextMock} />);

    const input = screen.getByPlaceholderText('Test input');
    fireEvent.changeText(input, 'Hello World');

    expect(onChangeTextMock).toHaveBeenCalledWith('Hello World');
  });

  it('should render without crashing', () => {
    const { root } = render(<Input hasError errorMessage="This is an error" />);
    expect(root).toBeTruthy();
  });

  it('should handle disabled state', () => {
    render(<Input isDisabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
  });
});
