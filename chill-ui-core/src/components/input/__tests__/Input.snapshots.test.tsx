import { render } from '@testing-library/react-native';

import Input from '../components/Input';

// Mocks simples
jest.mock('../styles/Input.styles', () => ({
  inputContainerSv: jest.fn(() => ({})),
  inputSv: jest.fn(() => ({})),
  styles: {},
}));

jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  getStringLength: jest.fn(str => str?.length || 0),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children }: any) => children,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, onPress }: any) => {
    function MockIcon() {
      return <div data-testid={`icon-${name}`} onClick={onPress} />;
    }
    return <MockIcon />;
  },
}));

jest.mock('../../../components/string', () => ({
  String: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children }: any) => children,
}));

describe('Input Component Snapshots', () => {
  it('should match snapshot for basic input', () => {
    const tree = render(<Input placeholder="Basic input" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for input with error', () => {
    const tree = render(<Input placeholder="Input with error" hasError errorMessage="This is an error message" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for password input', () => {
    const tree = render(<Input placeholder="Enter password" hasSecureTextEntry value="password123" />);
    expect(tree).toMatchSnapshot();
  });
});
