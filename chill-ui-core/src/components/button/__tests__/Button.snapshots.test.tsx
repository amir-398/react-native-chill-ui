import { render } from '@testing-library/react-native';
import { Button } from '../index';

// Mocks
jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, onPress, ...props }: any) => <div data-testid={`icon-${name}`} onClick={onPress} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: ({ name, ...props }: any) => <div data-testid={`loading-${name}`} {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, onPress, ...props }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress} {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, onPress, ...props }: any) => (
    <div data-testid="scale-pressable" onClick={onPress} {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  colorVariantPropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../styles/Button.ss.styles', () => ({
  ButtonSv: jest.fn(() => ({})),
  IconContainerSv: jest.fn(() => ({})),
  styles: { contentContainer: {}, stringContainer: {}, pointerEventsNone: {} },
}));

jest.mock('../styles/Button.tw.styles', () => ({
  ButtonTv: jest.fn(() => ''),
  IconPositionTv: jest.fn(() => ''),
  twStyles: { contentContainer: '', stringContainer: '', pointerEventsNone: '' },
}));

describe('Button Snapshots', () => {
  describe('Basic Button Variants', () => {
    it('should match snapshot for basic button', () => {
      const tree = render(<Button title="Basic Button" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for button with onPress', () => {
      const tree = render(<Button title="Clickable Button" onPress={() => {}} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for disabled button', () => {
      const tree = render(<Button title="Disabled Button" isDisabled={true} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for loading button', () => {
      const tree = render(<Button title="Loading Button" isLoading={true} />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Button Variants', () => {
    it('should match snapshot for contained variant', () => {
      const tree = render(<Button title="Contained Button" variant="contained" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for outlined variant', () => {
      const tree = render(<Button title="Outlined Button" variant="outlined" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for text variant', () => {
      const tree = render(<Button title="Text Button" variant="text" />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Button Sizes', () => {
    it('should match snapshot for 2xs size', () => {
      const tree = render(<Button title="2XS Button" size="2xs" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for xs size', () => {
      const tree = render(<Button title="XS Button" size="xs" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for sm size', () => {
      const tree = render(<Button title="SM Button" size="sm" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for md size', () => {
      const tree = render(<Button title="MD Button" size="md" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for lg size', () => {
      const tree = render(<Button title="LG Button" size="lg" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for xl size', () => {
      const tree = render(<Button title="XL Button" size="xl" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for 2xl size', () => {
      const tree = render(<Button title="2XL Button" size="2xl" />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Color Variants (NativeWind)', () => {
    it('should match snapshot for primary color', () => {
      const tree = render(<Button title="Primary Button" colorVariant="primary" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for secondary color', () => {
      const tree = render(<Button title="Secondary Button" colorVariant="secondary" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for error color', () => {
      const tree = render(<Button title="Error Button" colorVariant="error" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for success color', () => {
      const tree = render(<Button title="Success Button" colorVariant="success" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for warning color', () => {
      const tree = render(<Button title="Warning Button" colorVariant="warning" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for info color', () => {
      const tree = render(<Button title="Info Button" colorVariant="info" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for accent color', () => {
      const tree = render(<Button title="Accent Button" colorVariant="accent" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for dark color', () => {
      const tree = render(<Button title="Dark Button" colorVariant="dark" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for light color', () => {
      const tree = render(<Button title="Light Button" colorVariant="light" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for danger color', () => {
      const tree = render(<Button title="Danger Button" colorVariant="danger" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for neutral color', () => {
      const tree = render(<Button title="Neutral Button" colorVariant="neutral" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for muted color', () => {
      const tree = render(<Button title="Muted Button" colorVariant="muted" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for tertiary color', () => {
      const tree = render(<Button title="Tertiary Button" colorVariant="tertiary" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for inverted color', () => {
      const tree = render(<Button title="Inverted Button" colorVariant="inverted" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for white color', () => {
      const tree = render(<Button title="White Button" colorVariant="white" />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Touchable Types', () => {
    it('should match snapshot for touchable-opacity', () => {
      const tree = render(<Button title="Touchable Opacity" as="touchable-opacity" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for pressable', () => {
      const tree = render(<Button title="Pressable" as="pressable" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for ripple-pressable', () => {
      const tree = render(<Button title="Ripple Pressable" as="ripple-pressable" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for scale-pressable', () => {
      const tree = render(<Button title="Scale Pressable" as="scale-pressable" />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Icon Buttons', () => {
    it('should match snapshot for left icon', () => {
      const tree = render(<Button title="Left Icon Button" leftIconAction={{ name: 'home-solid', size: 'md' }} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for right icon', () => {
      const tree = render(
        <Button title="Right Icon Button" rightIconAction={{ name: 'arrow-right-solid', size: 'md' }} />,
      );
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for both icons', () => {
      const tree = render(
        <Button
          title="Both Icons Button"
          leftIconAction={{ name: 'home-solid', size: 'md' }}
          rightIconAction={{ name: 'arrow-right-solid', size: 'md' }}
        />,
      );
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for custom icon', () => {
      const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
      const tree = render(
        <Button title="Custom Icon Button" leftIconAction={{ customIcon: <CustomIcon />, size: 'md' }} />,
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Custom Content', () => {
    it('should match snapshot for custom children', () => {
      const tree = render(
        <Button>
          <div data-testid="custom-content">Custom Button Content</div>
        </Button>,
      );
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for complex custom content', () => {
      const tree = render(
        <Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Custom</span>
            <span>→</span>
          </div>
        </Button>,
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Combined Props', () => {
    it('should match snapshot for complex button with all props', () => {
      const tree = render(
        <Button
          title="Complex Button"
          variant="contained"
          colorVariant="primary"
          size="lg"
          leftIconAction={{ name: 'home-solid', size: 'md' }}
          rightIconAction={{ name: 'arrow-right-solid', size: 'md' }}
          contentPosition="center"
          className="custom-class"
          style={{ marginTop: 10 }}
          onPress={() => {}}
        />,
      );
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for loading button with custom props', () => {
      const tree = render(
        <Button
          title="Loading Button"
          isLoading={true}
          loadingIndicatorProps={{ color: 'white', size: 24 }}
          isDisabled={true}
        />,
      );
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for outlined button with error color', () => {
      const tree = render(<Button title="Error Outlined" variant="outlined" colorVariant="error" size="md" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for text button with success color', () => {
      const tree = render(<Button title="Success Text" variant="text" colorVariant="success" size="sm" />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Edge Cases', () => {
    it('should match snapshot for empty title', () => {
      const tree = render(<Button title="" />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for undefined title', () => {
      const tree = render(<Button title={undefined} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for very long title', () => {
      const longTitle = 'This is a very long button title that should test how the component handles long text content';
      const tree = render(<Button title={longTitle} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot for button with special characters', () => {
      const tree = render(<Button title="Button with émojis 🚀 and spëcial chars" />);
      expect(tree).toMatchSnapshot();
    });
  });
});
