import { render, screen, fireEvent } from '@testing-library/react-native';

import Input from '../components/Input';

// Mocks simples
jest.mock('../styles/Input.ss.styles', () => ({
  inputContainerSv: jest.fn(() => ({})),
  inputSv: jest.fn(() => ({})),
  styles: {},
}));

jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  getStringLength: jest.fn(str => str?.length || 0),
  isString: jest.fn(value => typeof value === 'string'),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children }: any) => children,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, onPress }: any) => {
    const MockIcon = () => <div data-testid={`icon-${name}`} onClick={onPress} />;
    return <MockIcon />;
  },
}));

jest.mock('../../../components/string', () => ({
  String: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children }: any) => children,
}));

describe('Input Component (Hybrid)', () => {
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
    const { root } = render(<Input hasError={true} errorMessage="This is an error" />);
    expect(root).toBeTruthy();
  });

  it('should handle disabled state', () => {
    render(<Input isDisabled={true} placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
  });
});
