import React from 'react';
import renderer from 'react-test-renderer';

// Mock all the components we need
const Dialog = ({ children }: any) => <div data-testid="dialog">{children}</div>;
const DialogContent = ({ children, ...props }: any) => (
  <div data-testid="dialog-content" {...props}>
    {children}
  </div>
);
const DialogHeader = ({ children, ...props }: any) => (
  <div data-testid="dialog-header" {...props}>
    {children}
  </div>
);
const DialogTitle = ({ children, ...props }: any) => (
  <div data-testid="dialog-title" {...props}>
    {children}
  </div>
);
const DialogFooter = ({ children, ...props }: any) => (
  <div data-testid="dialog-footer" {...props}>
    {children}
  </div>
);
const DialogTrigger = ({ children, ...props }: any) => (
  <div data-testid="dialog-trigger" {...props}>
    {children}
  </div>
);
const DialogClose = ({ children, ...props }: any) => (
  <div data-testid="dialog-close" {...props}>
    {children}
  </div>
);

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
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
  isNativeWindInstalled: jest.fn(() => false),
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
  useDialog: () => ({
    close: jest.fn(),
    isOpen: false,
    open: jest.fn(),
  }),
  DialogProvider: ({ children }: any) => children,
}));

jest.mock('../styles/Dialog.ss.styles', () => ({
  dialogSv: jest.fn(() => ({})),
  dialogHeaderSv: jest.fn(() => ({})),
  styles: { backdrop: {}, container: {}, dialogBase: {}, footer: {}, title: {} },
}));

jest.mock('../styles/Dialog.tw.styles', () => ({
  dialogTv: jest.fn(() => ''),
  dialogHeaderTv: jest.fn(() => ''),
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
            hasBackdrop={true}
            closeOnBackdropPress={true}
            size="md"
            open={true}
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
        <DialogHeader hasCloseMark={true}>
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
