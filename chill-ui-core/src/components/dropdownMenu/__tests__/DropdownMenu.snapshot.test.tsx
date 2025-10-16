import React from 'react';
import { render } from '@testing-library/react-native';

// Mock all the components we need
function DropdownMenu({ children, ...props }: any) {
  return (
    <div data-testid="dropdown-menu" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuTrigger({ children, ...props }: any) {
  return (
    <div data-testid="dropdown-menu-trigger" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuContent({ children, ...props }: any) {
  return (
    <div data-testid="dropdown-menu-content" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuItem({ children, ...props }: any) {
  return (
    <div data-testid="dropdown-menu-item" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuLabel({ children, ...props }: any) {
  return (
    <div data-testid="dropdown-menu-label" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ ...props }: any) {
  return <div data-testid="dropdown-menu-separator" {...props} />;
}

// Mocks
jest.mock('react-native-reanimated', () => ({
  default: {
    View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  runOnJS: jest.fn(),
  useAnimatedStyle: jest.fn(() => ({})),
  useSharedValue: jest.fn(() => ({ value: 0 })),
  withTiming: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isNativeWindInstalled: jest.fn(() => false),
  isString: jest.fn(value => typeof value === 'string'),
  SlotSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SlotTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownModal: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  InputDropdownModalSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  InputDropdownModalTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../components/DropdownMenuContext', () => ({
  DropdownMenuProvider: ({ children }: any) => children,
  useDropdownMenuContext: () => ({
    dropdownRef: { current: null },
    dropdownStyles: {},
    eventClose: jest.fn(),
    eventOpen: jest.fn(),
    handleSelectItem: jest.fn(),
    inputRef: { current: null },
    setDropdownPosition: jest.fn(),
    setDropdownWidth: jest.fn(),
    setOffsets: jest.fn(),
    toggleDropdown: jest.fn(),
    visible: false,
    wrapperRef: { current: null },
  }),
}));

jest.mock('../styles/DropdownMenu.ss.styles', () => ({
  dropdownMenuItemSv: jest.fn(() => ({})),
  styles: {
    dropdown: {},
    item: {},
    label: {},
    separator: {},
    trigger: {},
  },
}));

jest.mock('../styles/DropdownMenu.tw.styles', () => ({
  dropdownMenuItemTv: jest.fn(() => ''),
  twStyles: {
    dropdown: '',
    item: '',
    label: '',
    separator: '',
    trigger: '',
  },
}));

jest.mock('../utils/defaultProps', () => ({
  dropdownMenuContentDefaultProps: {
    align: 'start',
    closeWhenInteractedOutside: true,
    offsetX: 0,
    offsetY: 5,
    side: 'bottom',
  },
  dropdownMenuDefaultProps: {
    defaultOpen: false,
  },
  dropdownMenuItemDefaultProps: {
    as: 'touchable-highlight',
    closeOnSelect: true,
    disabled: false,
    underlayColor: '#f0f0f0',
  },
  dropdownMenuLabelDefaultProps: {},
  dropdownMenuSeparatorDefaultProps: {},
  dropdownMenuTriggerDefaultProps: {
    as: 'pressable',
  },
}));

describe('DropdownMenu Snapshot Tests', () => {
  it('should match snapshot for basic dropdown', () => {
    const tree = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for controlled dropdown', () => {
    const tree = render(
      <DropdownMenu open onOpenChange={jest.fn()}>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with all components', () => {
    const tree = render(
      <DropdownMenu>
        <DropdownMenuTrigger as="touchable-opacity">
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={300} offsetX={10} offsetY={5} verticalPosition="top" horizontalPosition="left">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem as="pressable" onSelect={jest.fn()}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem as="touchable-highlight" underlayColor="#e0e0e0">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with asChild components', () => {
    const tree = render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Custom Trigger</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <div>Custom Label</div>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild closeOnSelect={false}>
            <button>Custom Item</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with custom styling', () => {
    const tree = render(
      <DropdownMenu>
        <DropdownMenuTrigger className="custom-trigger">
          <button>Styled Trigger</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 rounded-lg bg-white shadow-lg"
          style={{ backgroundColor: 'white', borderRadius: 8 }}
        >
          <DropdownMenuLabel className="font-semibold text-gray-500">Styled Label</DropdownMenuLabel>
          <DropdownMenuItem className="hover:bg-gray-100" style={{ padding: 12 }}>
            Styled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with all positioning options', () => {
    const tree = render(
      <DropdownMenuContent
        width={400}
        offsetX={20}
        offsetY={10}
        maxHeight={300}
        minHeight={100}
        hasScroll
        hasAnimation
        closeDropdownWhenSelectedItem={false}
        closeWhenInteractedOutside={false}
        verticalPosition="bottom"
        horizontalPosition="right"
      >
        <DropdownMenuItem>Positioned Item</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with all item variants', () => {
    const tree = render(
      <DropdownMenuContent>
        <DropdownMenuItem as="pressable" closeOnSelect>
          Pressable Item
        </DropdownMenuItem>
        <DropdownMenuItem as="touchable-opacity" closeOnSelect={false}>
          TouchableOpacity Item
        </DropdownMenuItem>
        <DropdownMenuItem as="touchable-highlight" underlayColor="#f0f0f0">
          TouchableHighlight Item
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for empty dropdown', () => {
    const tree = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Empty Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{/* Empty content */}</DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with string children', () => {
    const tree = render(
      <DropdownMenuContent>
        <DropdownMenuLabel>String Label</DropdownMenuLabel>
        <DropdownMenuItem>String Item</DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot for complex nested dropdown', () => {
    const tree = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger as="touchable-highlight">
          <button>Complex Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          width={500}
          offsetX={15}
          offsetY={8}
          maxHeight={400}
          hasScroll
          closeWhenInteractedOutside
          verticalPosition="auto"
          horizontalPosition="auto"
        >
          <DropdownMenuLabel>Account Management</DropdownMenuLabel>
          <DropdownMenuItem as="pressable" onSelect={jest.fn()}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem as="touchable-opacity" onSelect={jest.fn()}>
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem as="touchable-highlight" underlayColor="#e0e0e0" onSelect={jest.fn()}>
            Preferences
          </DropdownMenuItem>
          <DropdownMenuItem asChild closeOnSelect={false}>
            <button>Custom Action</button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Premium Features (Coming Soon)</DropdownMenuItem>
          <DropdownMenuItem onSelect={jest.fn()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
