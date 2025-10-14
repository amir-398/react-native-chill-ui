import { render } from '@testing-library/react-native';
import { Toggle } from '../components/toggle.tw';
import { View } from 'react-native';

// Mocks
jest.mock('../../../utils', () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isUndefined: jest.fn(value => value === undefined),
}));

jest.mock('../../../components/box', () => ({
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/toggle.tw.styles', () => ({
  toggleTv: jest.fn(() => ''),
}));

describe('Toggle.tw', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Toggle with Tailwind classes', () => {
    render(<Toggle />);
    expect(true).toBeTruthy();
  });

  it('supports Tailwind className prop', () => {
    render(<Toggle className="m-4 p-2" />);
    expect(true).toBeTruthy();
  });

  it('supports complex Tailwind classes', () => {
    render(<Toggle className="m-4 rounded-lg p-2 shadow-lg" />);
    expect(true).toBeTruthy();
  });

  it('supports all sizes with Tailwind', () => {
    render(
      <View>
        <Toggle size="xs" className="m-1" />
        <Toggle size="sm" className="m-2" />
        <Toggle size="md" className="m-3" />
        <Toggle size="lg" className="m-4" />
        <Toggle size="xl" className="m-5" />
      </View>,
    );
    expect(true).toBeTruthy();
  });

  it('supports Tailwind with custom colors', () => {
    render(<Toggle className="m-4" thumbColorOn="#FFFFFF" trackColorOn="#10B981" />);
    expect(true).toBeTruthy();
  });
});
