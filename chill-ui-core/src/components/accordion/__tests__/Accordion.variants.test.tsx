import { render } from '@testing-library/react-native';

// Import des variantes
import Accordion from '../components/Accordion';
import AccordionTw from '../components/Accordion.tw';
import AccordionSs from '../components/Accordion.ss';
import AccordionItem from '../components/AccordionItem';
import AccordionItemTw from '../components/AccordionItem.tw';
import AccordionItemSs from '../components/AccordionItem.ss';
import AccordionTrigger from '../components/AccordionTrigger';
import AccordionContent from '../components/AccordionContent';
import AccordionTriggerTw from '../components/AccordionTrigger.tw';
import AccordionTriggerSs from '../components/AccordionTrigger.ss';
import AccordionContentTw from '../components/AccordionContent.tw';
import AccordionContentSs from '../components/AccordionContent.ss';

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
  BoxSs: ({ children }: any) => children,
  BoxTw: ({ children }: any) => children,
}));

jest.mock('../../string', () => ({
  String: ({ children }: any) => children,
  StringSs: ({ children }: any) => children,
  StringTw: ({ children }: any) => children,
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
  RipplePressableTw: ({ children }: any) => children,
}));

describe('Accordion Variants Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderAccordionVariant = (
    AccordionComponent: any,
    AccordionItemComponent: any,
    AccordionTriggerComponent: any,
    AccordionContentComponent: any,
  ) =>
    render(
      <AccordionComponent>
        <AccordionItemComponent value="item-1">
          <AccordionTriggerComponent>Question 1</AccordionTriggerComponent>
          <AccordionContentComponent>Answer 1</AccordionContentComponent>
        </AccordionItemComponent>
        <AccordionItemComponent value="item-2">
          <AccordionTriggerComponent>Question 2</AccordionTriggerComponent>
          <AccordionContentComponent>Answer 2</AccordionContentComponent>
        </AccordionItemComponent>
      </AccordionComponent>,
    );

  describe('Hybrid Variant', () => {
    it('should render hybrid accordion without crashing', () => {
      expect(() => {
        renderAccordionVariant(Accordion, AccordionItem, AccordionTrigger, AccordionContent);
      }).not.toThrow();
    });

    it('should render hybrid accordion with custom props without crashing', () => {
      expect(() => {
        render(
          <Accordion type="multiple" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Question 1</AccordionTrigger>
              <AccordionContent>Answer 1</AccordionContent>
            </AccordionItem>
          </Accordion>,
        );
      }).not.toThrow();
    });
  });

  describe('Tailwind Variant', () => {
    it('should render tailwind accordion without crashing', () => {
      expect(() => {
        renderAccordionVariant(AccordionTw, AccordionItemTw, AccordionTriggerTw, AccordionContentTw);
      }).not.toThrow();
    });

    it('should render tailwind accordion with custom props without crashing', () => {
      expect(() => {
        render(
          <AccordionTw type="multiple" collapsible>
            <AccordionItemTw value="item-1">
              <AccordionTriggerTw>Question 1</AccordionTriggerTw>
              <AccordionContentTw>Answer 1</AccordionContentTw>
            </AccordionItemTw>
          </AccordionTw>,
        );
      }).not.toThrow();
    });
  });

  describe('StyleSheet Variant', () => {
    it('should render stylesheet accordion without crashing', () => {
      expect(() => {
        renderAccordionVariant(AccordionSs, AccordionItemSs, AccordionTriggerSs, AccordionContentSs);
      }).not.toThrow();
    });

    it('should render stylesheet accordion with custom props without crashing', () => {
      expect(() => {
        render(
          <AccordionSs type="multiple" collapsible>
            <AccordionItemSs value="item-1">
              <AccordionTriggerSs>Question 1</AccordionTriggerSs>
              <AccordionContentSs>Answer 1</AccordionContentSs>
            </AccordionItemSs>
          </AccordionSs>,
        );
      }).not.toThrow();
    });
  });

  describe('Cross-variant consistency', () => {
    it('should render all variants without crashing', () => {
      const variants = [
        { components: [Accordion, AccordionItem, AccordionTrigger, AccordionContent], name: 'Hybrid' },
        { components: [AccordionTw, AccordionItemTw, AccordionTriggerTw, AccordionContentTw], name: 'Tailwind' },
        { components: [AccordionSs, AccordionItemSs, AccordionTriggerSs, AccordionContentSs], name: 'StyleSheet' },
      ];

      variants.forEach(({ components }) => {
        expect(() => {
          renderAccordionVariant(components[0], components[1], components[2], components[3]);
        }).not.toThrow();
      });
    });

    it('should handle disabled state consistently across variants', () => {
      const variants = [
        { components: [Accordion, AccordionItem, AccordionTrigger, AccordionContent], name: 'Hybrid' },
        { components: [AccordionTw, AccordionItemTw, AccordionTriggerTw, AccordionContentTw], name: 'Tailwind' },
        { components: [AccordionSs, AccordionItemSs, AccordionTriggerSs, AccordionContentSs], name: 'StyleSheet' },
      ];

      variants.forEach(({ components }) => {
        const AccordionComponent = components[0];
        const AccordionItemComponent = components[1];
        const AccordionTriggerComponent = components[2];
        const AccordionContentComponent = components[3];

        expect(() => {
          render(
            <AccordionComponent value="item-1" disabled>
              <AccordionItemComponent value="item-1">
                <AccordionTriggerComponent value="item-1">Question 1</AccordionTriggerComponent>
                <AccordionContentComponent value="item-1">Answer 1</AccordionContentComponent>
              </AccordionItemComponent>
            </AccordionComponent>,
          );
        }).not.toThrow();
      });
    });

    it('should handle different trigger types consistently across variants', () => {
      const triggerTypes = ['touchable-opacity', 'pressable', 'ripple-pressable'] as const;
      const variants = [
        { components: [Accordion, AccordionItem, AccordionTrigger, AccordionContent], name: 'Hybrid' },
        { components: [AccordionTw, AccordionItemTw, AccordionTriggerTw, AccordionContentTw], name: 'Tailwind' },
        { components: [AccordionSs, AccordionItemSs, AccordionTriggerSs, AccordionContentSs], name: 'StyleSheet' },
      ];

      variants.forEach(({ components }) => {
        const AccordionComponent = components[0];
        const AccordionItemComponent = components[1];
        const AccordionTriggerComponent = components[2];
        const AccordionContentComponent = components[3];

        triggerTypes.forEach(type => {
          expect(() => {
            render(
              <AccordionComponent value="item-1">
                <AccordionItemComponent value="item-1">
                  <AccordionTriggerComponent value="item-1" as={type}>
                    Question 1
                  </AccordionTriggerComponent>
                  <AccordionContentComponent value="item-1">Answer 1</AccordionContentComponent>
                </AccordionItemComponent>
              </AccordionComponent>,
            );
          }).not.toThrow();
        });
      });
    });
  });
});
