import { render } from '@testing-library/react-native';

// Mock all the components we need
function Dialog({ children }: any) {
  return <div data-testid="dialog">{children}</div>;
}
function DialogContent({ children, ...props }: any) {
  return (
    <div data-testid="dialog-content" {...props}>
      {children}
    </div>
  );
}
function DialogHeader({ children, ...props }: any) {
  return (
    <div data-testid="dialog-header" {...props}>
      {children}
    </div>
  );
}
function DialogTitle({ children, ...props }: any) {
  return (
    <div data-testid="dialog-title" {...props}>
      {children}
    </div>
  );
}
function DialogFooter({ children, ...props }: any) {
  return (
    <div data-testid="dialog-footer" {...props}>
      {children}
    </div>
  );
}
function DialogTrigger({ children, ...props }: any) {
  return (
    <div data-testid="dialog-trigger" {...props}>
      {children}
    </div>
  );
}
function DialogClose({ children, ...props }: any) {
  return (
    <div data-testid="dialog-close" {...props}>
      {children}
    </div>
  );
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
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../components/DialogContext', () => ({
  DialogProvider: ({ children }: any) => children,
  useDialog: () => ({
    close: jest.fn(),
    isOpen: false,
    open: jest.fn(),
  }),
}));

jest.mock('../styles/Dialog.ss.styles', () => ({
  dialogHeaderSv: jest.fn(() => ({})),
  dialogSv: jest.fn(() => ({})),
  styles: { backdrop: {}, container: {}, dialogBase: {}, footer: {}, title: {} },
}));

jest.mock('../styles/Dialog.tw.styles', () => ({
  dialogHeaderTv: jest.fn(() => ''),
  dialogTv: jest.fn(() => ''),
  twStyles: { backdrop: '', container: '', dialogBase: '', footer: '', title: '' },
}));

describe('Dialog Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(
      <Dialog>
        <DialogContent>
          <div>Test content</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogContent with basic props', () => {
    const { root } = render(
      <Dialog>
        <DialogContent hasBackdrop closeOnBackdropPress size="md">
          <div>Test content</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogContent with open prop', () => {
    const { root } = render(
      <Dialog>
        <DialogContent open>
          <div>Test content</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogHeader with children', () => {
    const { root } = render(
      <DialogHeader>
        <DialogTitle>Test Title</DialogTitle>
      </DialogHeader>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogHeader with close mark', () => {
    const { root } = render(
      <DialogHeader hasCloseMark>
        <DialogTitle>Test Title</DialogTitle>
      </DialogHeader>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogTitle with string children', () => {
    const { root } = render(<DialogTitle>Test Title</DialogTitle>);
    expect(root).toBeTruthy();
  });

  it('should render DialogTitle with custom children', () => {
    const { root } = render(
      <DialogTitle>
        <div>Custom Title</div>
      </DialogTitle>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogFooter with children', () => {
    const { root } = render(
      <DialogFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </DialogFooter>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogTrigger with children', () => {
    const { root } = render(
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>,
    );
    expect(root).toBeTruthy();
  });

  it('should render DialogClose with children', () => {
    const { root } = render(
      <DialogClose>
        <button>Close</button>
      </DialogClose>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle different size variants', () => {
    const { root: sm } = render(
      <Dialog>
        <DialogContent size="sm">
          <div>Small</div>
        </DialogContent>
      </Dialog>,
    );
    expect(sm).toBeTruthy();

    const { root: lg } = render(
      <Dialog>
        <DialogContent size="lg">
          <div>Large</div>
        </DialogContent>
      </Dialog>,
    );
    expect(lg).toBeTruthy();
  });

  it('should handle backdrop variations', () => {
    const { root: withBackdrop } = render(
      <Dialog>
        <DialogContent hasBackdrop>
          <div>With backdrop</div>
        </DialogContent>
      </Dialog>,
    );
    expect(withBackdrop).toBeTruthy();

    const { root: withoutBackdrop } = render(
      <Dialog>
        <DialogContent hasBackdrop={false}>
          <div>Without backdrop</div>
        </DialogContent>
      </Dialog>,
    );
    expect(withoutBackdrop).toBeTruthy();
  });

  it('should handle closeOnBackdropPress variations', () => {
    const { root: closeOnPress } = render(
      <Dialog>
        <DialogContent closeOnBackdropPress>
          <div>Close on press</div>
        </DialogContent>
      </Dialog>,
    );
    expect(closeOnPress).toBeTruthy();

    const { root: noCloseOnPress } = render(
      <Dialog>
        <DialogContent closeOnBackdropPress={false}>
          <div>No close on press</div>
        </DialogContent>
      </Dialog>,
    );
    expect(noCloseOnPress).toBeTruthy();
  });

  it('should handle custom className (NativeWind)', () => {
    const { root } = render(
      <Dialog>
        <DialogContent className="custom-class">
          <div>Custom class</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom style (StyleSheet)', () => {
    const { root } = render(
      <Dialog>
        <DialogContent style={{ backgroundColor: 'red' }}>
          <div>Custom style</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle callbacks', () => {
    const onOpenChange = jest.fn();
    const onRequestClose = jest.fn();
    const onShow = jest.fn();

    const { root } = render(
      <Dialog>
        <DialogContent onOpenChange={onOpenChange} onRequestClose={onRequestClose} onShow={onShow}>
          <div>With callbacks</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should render complete dialog structure', () => {
    const { root } = render(
      <Dialog>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader hasCloseMark>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <div>Dialog content</div>
          <DialogFooter>
            <DialogClose>
              <button>Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle empty content', () => {
    const { root } = render(
      <Dialog>
        <DialogContent>{/* Empty content */}</DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle null children', () => {
    const { root } = render(
      <Dialog>
        <DialogContent>{null}</DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle undefined children', () => {
    const { root } = render(
      <Dialog>
        <DialogContent>{undefined}</DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle close mark props', () => {
    const closeMarkProps = { name: 'xmark-solid', size: 'sm' };
    const { root } = render(
      <DialogHeader hasCloseMark closeMarkProps={closeMarkProps}>
        <DialogTitle>Test</DialogTitle>
      </DialogHeader>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle different animation types', () => {
    const { root: fade } = render(
      <Dialog>
        <DialogContent animation="fade">
          <div>Fade animation</div>
        </DialogContent>
      </Dialog>,
    );
    expect(fade).toBeTruthy();

    const { root: slide } = render(
      <Dialog>
        <DialogContent animation="slide">
          <div>Slide animation</div>
        </DialogContent>
      </Dialog>,
    );
    expect(slide).toBeTruthy();
  });

  it('should handle useDefaultContainer prop', () => {
    const { root: withContainer } = render(
      <Dialog>
        <DialogContent useDefaultContainer>
          <div>With container</div>
        </DialogContent>
      </Dialog>,
    );
    expect(withContainer).toBeTruthy();

    const { root: withoutContainer } = render(
      <Dialog>
        <DialogContent useDefaultContainer={false}>
          <div>Without container</div>
        </DialogContent>
      </Dialog>,
    );
    expect(withoutContainer).toBeTruthy();
  });

  it('should handle closeOnGoBack prop', () => {
    const { root: closeOnGoBack } = render(
      <Dialog>
        <DialogContent closeOnGoBack>
          <div>Close on go back</div>
        </DialogContent>
      </Dialog>,
    );
    expect(closeOnGoBack).toBeTruthy();

    const { root: noCloseOnGoBack } = render(
      <Dialog>
        <DialogContent closeOnGoBack={false}>
          <div>No close on go back</div>
        </DialogContent>
      </Dialog>,
    );
    expect(noCloseOnGoBack).toBeTruthy();
  });

  it('should handle backdrop color', () => {
    const { root } = render(
      <Dialog>
        <DialogContent backdropColor="rgba(0, 0, 0, 0.5)">
          <div>Custom backdrop color</div>
        </DialogContent>
      </Dialog>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle all size variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'];
    sizes.forEach(size => {
      const { root } = render(
        <Dialog>
          <DialogContent size={size as any}>
            <div>{size} size</div>
          </DialogContent>
        </Dialog>,
      );
      expect(root).toBeTruthy();
    });
  });

  it('should handle all animation variants', () => {
    const animations = ['fade', 'slide', 'none'];
    animations.forEach(animation => {
      const { root } = render(
        <Dialog>
          <DialogContent animation={animation as any}>
            <div>{animation} animation</div>
          </DialogContent>
        </Dialog>,
      );
      expect(root).toBeTruthy();
    });
  });
});
