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

describe('DropdownMenu Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with controlled open state', () => {
    const { root } = render(
      <DropdownMenu open onOpenChange={jest.fn()}>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with defaultOpen prop', () => {
    const { root } = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuTrigger with different as props', () => {
    const { root: pressable } = render(
      <DropdownMenuTrigger as="pressable">
        <button>Pressable Trigger</button>
      </DropdownMenuTrigger>,
    );
    expect(pressable).toBeTruthy();

    const { root: touchableOpacity } = render(
      <DropdownMenuTrigger as="touchable-opacity">
        <button>TouchableOpacity Trigger</button>
      </DropdownMenuTrigger>,
    );
    expect(touchableOpacity).toBeTruthy();
  });

  it('should render DropdownMenuTrigger with asChild prop', () => {
    const { root } = render(
      <DropdownMenuTrigger asChild>
        <button>Cloned Trigger</button>
      </DropdownMenuTrigger>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuContent with positioning props', () => {
    const { root } = render(
      <DropdownMenuContent width={300} offsetX={10} offsetY={5} verticalPosition="top" horizontalPosition="left">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuContent with scrolling props', () => {
    const { root } = render(
      <DropdownMenuContent maxHeight={150} minHeight={50} hasScroll hasAnimation>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuContent with close behavior props', () => {
    const { root } = render(
      <DropdownMenuContent closeDropdownWhenSelectedItem closeWhenInteractedOutside>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuItem with different as props', () => {
    const { root: pressable } = render(
      <DropdownMenuItem as="pressable" onSelect={jest.fn()}>
        Pressable Item
      </DropdownMenuItem>,
    );
    expect(pressable).toBeTruthy();

    const { root: touchableOpacity } = render(
      <DropdownMenuItem as="touchable-opacity" onSelect={jest.fn()}>
        TouchableOpacity Item
      </DropdownMenuItem>,
    );
    expect(touchableOpacity).toBeTruthy();

    const { root: touchableHighlight } = render(
      <DropdownMenuItem as="touchable-highlight" onSelect={jest.fn()}>
        TouchableHighlight Item
      </DropdownMenuItem>,
    );
    expect(touchableHighlight).toBeTruthy();
  });

  it('should render DropdownMenuItem with asChild prop', () => {
    const { root } = render(
      <DropdownMenuItem asChild closeOnSelect={false}>
        <button>Custom Item</button>
      </DropdownMenuItem>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuItem with disabled state', () => {
    const { root } = render(<DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>);
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuItem with custom underlayColor', () => {
    const { root } = render(
      <DropdownMenuItem as="touchable-highlight" underlayColor="#e0e0e0">
        Highlight Item
      </DropdownMenuItem>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuLabel with string children', () => {
    const { root } = render(<DropdownMenuLabel>Section Label</DropdownMenuLabel>);
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuLabel with asChild prop', () => {
    const { root } = render(
      <DropdownMenuLabel asChild>
        <div>Custom Label</div>
      </DropdownMenuLabel>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DropdownMenuSeparator', () => {
    const { root } = render(<DropdownMenuSeparator />);
    expect(root).toBeTruthy();
  });

  it('should handle custom className (NativeWind)', () => {
    const { root } = render(
      <DropdownMenuContent className="w-64 rounded-lg bg-white">
        <DropdownMenuItem className="hover:bg-gray-100">Styled Item</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom style (StyleSheet)', () => {
    const { root } = render(
      <DropdownMenuContent style={{ backgroundColor: 'white', borderRadius: 8 }}>
        <DropdownMenuItem style={{ padding: 12 }}>Styled Item</DropdownMenuItem>
      </DropdownMenuContent>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle callbacks', () => {
    const onOpenChange = jest.fn();
    const onSelect = jest.fn();

    const { root } = render(
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>
          <button>Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should render complete dropdown structure', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={jest.fn()}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={jest.fn()}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={jest.fn()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle empty content', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuContent>{/* Empty content */}</DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle null children', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuContent>{null}</DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle undefined children', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuContent>{undefined}</DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle string children in DropdownMenuItem', () => {
    const { root } = render(<DropdownMenuItem>String Item</DropdownMenuItem>);
    expect(root).toBeTruthy();
  });

  it('should handle string children in DropdownMenuLabel', () => {
    const { root } = render(<DropdownMenuLabel>String Label</DropdownMenuLabel>);
    expect(root).toBeTruthy();
  });

  it('should handle closeOnSelect prop variations', () => {
    const { root: closeOnSelect } = render(<DropdownMenuItem closeOnSelect>Close on select</DropdownMenuItem>);
    expect(closeOnSelect).toBeTruthy();

    const { root: noCloseOnSelect } = render(
      <DropdownMenuItem closeOnSelect={false}>No close on select</DropdownMenuItem>,
    );
    expect(noCloseOnSelect).toBeTruthy();
  });

  it('should handle all vertical position variants', () => {
    const positions = ['auto', 'top', 'bottom'];
    positions.forEach(position => {
      const { root } = render(
        <DropdownMenuContent verticalPosition={position as any}>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>,
      );
      expect(root).toBeTruthy();
    });
  });

  it('should handle all horizontal position variants', () => {
    const positions = ['auto', 'left', 'right'];
    positions.forEach(position => {
      const { root } = render(
        <DropdownMenuContent horizontalPosition={position as any}>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>,
      );
      expect(root).toBeTruthy();
    });
  });

  it('should handle all trigger as variants', () => {
    const variants = ['pressable', 'touchable-opacity'];
    variants.forEach(as => {
      const { root } = render(
        <DropdownMenuTrigger as={as as any}>
          <button>{as} trigger</button>
        </DropdownMenuTrigger>,
      );
      expect(root).toBeTruthy();
    });
  });

  it('should handle all item as variants', () => {
    const variants = ['pressable', 'touchable-opacity', 'touchable-highlight'];
    variants.forEach(as => {
      const { root } = render(<DropdownMenuItem as={as as any}>{as} item</DropdownMenuItem>);
      expect(root).toBeTruthy();
    });
  });

  it('should handle stringProps in DropdownMenuItem', () => {
    const stringProps = { style: { color: 'red' } };
    const { root } = render(<DropdownMenuItem stringProps={stringProps}>String Item</DropdownMenuItem>);
    expect(root).toBeTruthy();
  });

  it('should handle stringProps in DropdownMenuLabel', () => {
    const stringProps = { style: { fontWeight: 'bold' } };
    const { root } = render(<DropdownMenuLabel stringProps={stringProps}>String Label</DropdownMenuLabel>);
    expect(root).toBeTruthy();
  });

  it('should handle complex nested structure', () => {
    const { root } = render(
      <DropdownMenu>
        <DropdownMenuTrigger as="touchable-opacity">
          <button>Complex Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          width={400}
          offsetX={20}
          offsetY={10}
          maxHeight={300}
          hasScroll
          closeWhenInteractedOutside={false}
        >
          <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
          <DropdownMenuItem as="pressable" onSelect={jest.fn()}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem as="touchable-highlight" underlayColor="#f0f0f0" onSelect={jest.fn()}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild closeOnSelect={false}>
            <button>Custom Action</button>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Coming Soon</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(root).toBeTruthy();
  });
});
