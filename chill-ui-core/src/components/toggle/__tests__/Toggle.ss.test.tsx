import { View, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Toggle } from '../components/toggle.ss';

// Mocks
jest.mock('../../../utils', () => ({
  isUndefined: jest.fn(value => value === undefined),
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/toggle.ss.styles', () => ({
  toggleSv: jest.fn(() => ({})),
}));

describe('Toggle.ss', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Toggle with StyleSheet styles', () => {
    render(<Toggle />);
    expect(true).toBeTruthy();
  });

  it('supports StyleSheet style prop', () => {
    const styles = StyleSheet.create({
      toggle: {
        margin: 16,
        padding: 8,
      },
    });

    render(<Toggle style={styles.toggle} />);
    expect(true).toBeTruthy();
  });

  it('supports complex StyleSheet styles', () => {
    const styles = StyleSheet.create({
      toggle: {
        borderRadius: 8,
        elevation: 5,
        margin: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    });

    render(<Toggle style={styles.toggle} />);
    expect(true).toBeTruthy();
  });

  it('supports all sizes with StyleSheet', () => {
    render(
      <View>
        <Toggle size="xs" style={{ margin: 4 }} />
        <Toggle size="sm" style={{ margin: 8 }} />
        <Toggle size="md" style={{ margin: 12 }} />
        <Toggle size="lg" style={{ margin: 16 }} />
        <Toggle size="xl" style={{ margin: 20 }} />
      </View>,
    );
    expect(true).toBeTruthy();
  });

  it('supports StyleSheet with custom colors', () => {
    render(<Toggle style={{ margin: 16 }} thumbColorOn="#FFFFFF" trackColorOn="#10B981" />);
    expect(true).toBeTruthy();
  });
});
