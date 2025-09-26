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
  Box: ({ children, ...props }: any) => children,
}));

jest.mock('../../string', () => ({
  String: ({ children, ...props }: any) => children,
}));

jest.mock('../../icon', () => ({
  __esModule: true,
  default: ({ name, ...props }: any) => `Icon:${name}`,
}));

jest.mock('../../animatedBox', () => ({
  AnimatedBox: ({ children, ...props }: any) => children,
}));

jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children, onPress, ...props }: any) => children,
}));

describe('Accordion Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic accordion correctly', () => {
    const { toJSON } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion with multiple items correctly', () => {
    const { toJSON } = render(
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

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render single type accordion correctly', () => {
    const { toJSON } = render(
      <Accordion type="single">
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

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render multiple type accordion correctly', () => {
    const { toJSON } = render(
      <Accordion type="multiple">
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

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render disabled accordion correctly', () => {
    const { toJSON } = render(
      <Accordion disabled>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion without icons correctly', () => {
    const { toJSON } = render(
      <Accordion hasCollapseIcon={false}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion with left icon position correctly', () => {
    const { toJSON } = render(
      <Accordion iconPosition="left">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion with custom icons correctly', () => {
    const { toJSON } = render(
      <Accordion expandIcon="chevron-down" collapseIcon="chevron-up">
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion with disabled item correctly', () => {
    const { toJSON } = render(
      <Accordion>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Question 1 (Disabled)</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render accordion with asChild trigger correctly', () => {
    const { toJSON } = render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger asChild>
            <div>Custom Trigger</div>
          </AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
