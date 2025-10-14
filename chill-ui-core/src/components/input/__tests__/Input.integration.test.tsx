import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import Input from '../components/Input';

// Mocks simples
jest.mock('../styles/Input.ss.styles', () => ({
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

describe('Input Component Integration Tests', () => {
  it('should handle form workflow', () => {
    function FormComponent() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      return (
        <>
          <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            hasSecureTextEntry
          />
        </>
      );
    }

    render(<FormComponent />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});
