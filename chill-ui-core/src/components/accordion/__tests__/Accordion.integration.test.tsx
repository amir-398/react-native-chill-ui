import { render } from '@testing-library/react-native';

import Accordion from '../components/Accordion';
import AccordionItem from '../components/AccordionItem';
import AccordionTrigger from '../components/AccordionTrigger';
import AccordionContent from '../components/AccordionContent';

// Mock des utilitaires hybrid pour éviter les erreurs
jest.mock('../../../utils/hybrid/classNamePropsHandler', () => ({
  classNamePropsHandler: jest.fn(),
}));

jest.mock('../../../utils/hybrid/colorVariantPropsHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
}));

// Mock des composants enfants
jest.mock('../../box', () => ({
  Box: ({ children }: any) => children,
}));

jest.mock('../../string', () => ({
  String: ({ children }: any) => children,
}));

jest.mock('../../icon', () => ({
  __esModule: true,
  default: ({ name }: any) => `Icon:${name}`,
}));

jest.mock('../../animatedBox', () => ({
  AnimatedBox: ({ children }: any) => children,
}));

jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children }: any) => children,
}));

describe('Accordion Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render complete accordion with multiple items without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Question 3</AccordionTrigger>
            <AccordionContent>Answer 3</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render single type accordion with collapsible without crashing', () => {
    const onValueChangeMock = jest.fn();

    expect(() => {
      render(
        <Accordion type="single" collapsible onValueChange={onValueChangeMock}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render multiple type accordion without crashing', () => {
    const onValueChangeMock = jest.fn();

    expect(() => {
      render(
        <Accordion type="multiple" onValueChange={onValueChangeMock}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render disabled accordion without crashing', () => {
    expect(() => {
      render(
        <Accordion disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with mixed disabled items without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" disabled>
            <AccordionTrigger>Question 2 (Disabled)</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Question 3</AccordionTrigger>
            <AccordionContent>Answer 3</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with custom icons and positioning without crashing', () => {
    expect(() => {
      render(
        <Accordion expandIcon="angle-down-solid" collapseIcon="angle-up-solid" iconPosition="left">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion without icons without crashing', () => {
    expect(() => {
      render(
        <Accordion hasCollapseIcon={false}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with complex content structures without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Complex Question 1</AccordionTrigger>
            <AccordionContent>
              <div>
                <div>Section 1</div>
                <div>
                  <div>Subsection 1.1</div>
                  <div>Subsection 1.2</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Complex Question 2</AccordionTrigger>
            <AccordionContent>
              <div>
                <div>Section 2</div>
                <div>Section 2.1</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with different trigger types without crashing', () => {
    const triggerTypes = ['touchable-opacity', 'pressable', 'ripple-pressable'] as const;

    triggerTypes.forEach(type => {
      expect(() => {
        render(
          <Accordion>
            <AccordionItem value="item-1">
              <AccordionTrigger as={type}>Question 1</AccordionTrigger>
              <AccordionContent>Answer 1</AccordionContent>
            </AccordionItem>
          </Accordion>,
        );
      }).not.toThrow();
    });
  });

  it('should render accordion with asChild triggers without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger asChild>
              <div>Custom Trigger 1</div>
            </AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger asChild>
              <div>Custom Trigger 2</div>
            </AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with defaultValue without crashing', () => {
    expect(() => {
      render(
        <Accordion defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with multiple defaultValue without crashing', () => {
    expect(() => {
      render(
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Question 3</AccordionTrigger>
            <AccordionContent>Answer 3</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should handle edge cases gracefully', () => {
    // Test with empty accordion
    expect(() => {
      render(<Accordion />);
    }).not.toThrow();

    // Test with single item
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="single-item">
            <AccordionTrigger>Single Question</AccordionTrigger>
            <AccordionContent>Single Answer</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();

    // Test with empty items
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="empty-item">
            <AccordionTrigger />
            <AccordionContent />
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });
});
