import { render } from '@testing-library/react-native';
import { Checkbox, CheckboxSs, CheckboxTw } from '../index';

// Mocks
jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isUndefined: jest.fn(value => value === undefined),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
  IconSs: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
  IconTw: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/Checkbox.ss.styles', () => ({
  checkboxSv: jest.fn(() => ({})),
  styles: { container: {}, contentCheckBox: {}, isDisabled: {}, label: {}, pressable: {} },
}));

jest.mock('../styles/Checkbox.tw.styles', () => ({
  checkboxTv: jest.fn(() => ''),
  twStyles: { container: '', contentCheckBox: '', isDisabled: '', label: '', pressable: '' },
}));

describe('Checkbox Component (Integration)', () => {
  it('should export all versions', () => {
    expect(Checkbox).toBeDefined();
    expect(CheckboxSs).toBeDefined();
    expect(CheckboxTw).toBeDefined();
  });

  it('should render all three versions', () => {
    const { root: hybrid } = render(<Checkbox label="Hybrid" />);
    expect(hybrid).toBeTruthy();

    const { root: ss } = render(<CheckboxSs label="StyleSheet" />);
    expect(ss).toBeTruthy();

    const { root: tw } = render(<CheckboxTw label="Tailwind" />);
    expect(tw).toBeTruthy();
  });

  it('should handle form scenario with multiple checkboxes', () => {
    const { root } = render(
      <div>
        <Checkbox label="Accept terms" isChecked={true} />
        <Checkbox label="Subscribe" isChecked={false} />
        <Checkbox label="Notifications" isDisabled />
      </div>,
    );
    expect(root).toBeTruthy();
  });
});
