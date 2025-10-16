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
  Icon: ({ name }: any) => `Icon:${name}`,
  IconSs: ({ name }: any) => `Icon:${name}`,
  IconTw: ({ name }: any) => `Icon:${name}`,
}));

jest.mock('../../animatedBox', () => ({
  AnimatedBox: ({ children }: any) => children,
}));

jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children }: any) => children,
}));

describe('Accordion Component - Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render accordion without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with multiple items without crashing', () => {
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
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with different types without crashing', () => {
    expect(() => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();

    expect(() => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with different props without crashing', () => {
    expect(() => {
      render(
        <Accordion
          type="single"
          collapsible
          disabled
          hasCollapseIcon={false}
          iconPosition="left"
          expandIcon="angle-down-solid"
          collapseIcon="angle-up-solid"
          defaultValue="item-1"
          onValueChange={() => {}}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
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

  it('should render accordion with asChild trigger without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger asChild>
              <div>Custom Trigger</div>
            </AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with custom content without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div>Custom Trigger Content</div>
            </AccordionTrigger>
            <AccordionContent>
              <div>Custom Content</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render accordion with disabled item without crashing', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
    }).not.toThrow();
  });

  it('should render empty accordion without crashing', () => {
    expect(() => {
      render(<Accordion />);
    }).not.toThrow();
  });
});
