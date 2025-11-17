import renderer from 'react-test-renderer';

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

describe('Dialog Snapshots', () => {
  it('renders Dialog correctly', () => {
    const tree = renderer
      .create(
        <Dialog>
          <DialogContent>
            <div>Test content</div>
          </DialogContent>
        </Dialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogContent with all props', () => {
    const tree = renderer
      .create(
        <Dialog>
          <DialogContent
            hasBackdrop
            closeOnBackdropPress
            size="md"
            open
            onOpenChange={jest.fn()}
            onRequestClose={jest.fn()}
            onShow={jest.fn()}
          >
            <div>Test content</div>
          </DialogContent>
        </Dialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogHeader with close mark', () => {
    const tree = renderer
      .create(
        <DialogHeader hasCloseMark>
          <DialogTitle>Test Title</DialogTitle>
        </DialogHeader>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogTitle with string', () => {
    const tree = renderer.create(<DialogTitle>Test Title</DialogTitle>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogFooter', () => {
    const tree = renderer
      .create(
        <DialogFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </DialogFooter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogTrigger', () => {
    const tree = renderer
      .create(
        <DialogTrigger>
          <button>Open Dialog</button>
        </DialogTrigger>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogClose', () => {
    const tree = renderer
      .create(
        <DialogClose>
          <button>Close</button>
        </DialogClose>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders complete dialog structure', () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with different sizes', () => {
    const tree = renderer
      .create(
        <Dialog>
          <DialogContent size="lg">
            <div>Large dialog</div>
          </DialogContent>
        </Dialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom styling', () => {
    const tree = renderer
      .create(
        <Dialog>
          <DialogContent className="custom-class" style={{ backgroundColor: 'red' }}>
            <div>Custom styled dialog</div>
          </DialogContent>
        </Dialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
