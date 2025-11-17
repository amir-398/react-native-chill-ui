import { render, screen } from '@testing-library/react-native';

import { HighlightString } from '../components/HighlightString.hybrid';

// Mock the String components
jest.mock('../../string', () => ({
  String: ({ children, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>{children}</Text>;
  },
}));

// Mock the hybrid utils
jest.mock('@utils', () => ({
  classNameHandler: (className: string) => ({ className }),
  classNamePropsHandler: jest.fn(),
  styleHandler: ({ defaultStyle, style }: any) => ({ style: style || defaultStyle }),
}));

describe('HighlightString Component', () => {
  const defaultProps = {
    content: 'Hello world, welcome to the world of programming',
    highlightTerm: 'world',
  };

  describe('Basic Functionality', () => {
    it('renders without highlighting when highlightTerm is empty', () => {
      render(<HighlightString {...defaultProps} highlightTerm="" />);
      expect(screen.getByText(defaultProps.content)).toBeTruthy();
    });

    it('highlights multiple occurrences of term', () => {
      render(<HighlightString {...defaultProps} />);
      const highlightedTexts = screen.getAllByText('world');
      expect(highlightedTexts).toHaveLength(2);
    });

    it('handles case insensitive highlighting', () => {
      render(<HighlightString content="Hello WORLD" highlightTerm="world" />);
      expect(screen.getByText('WORLD')).toBeTruthy();
    });

    it('escapes special regex characters', () => {
      const content = 'Test $100 + 50% = $150';
      render(<HighlightString content={content} highlightTerm="$100" />);
      expect(screen.getByText('$100')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('applies custom className and highlightClassName', () => {
      render(<HighlightString {...defaultProps} className="custom-class" highlightClassName="highlight-class" />);
      const textElement = screen.getByText(defaultProps.content);
      const highlightedElements = screen.getAllByText('world');

      expect(textElement.props.className).toContain('custom-class');
      highlightedElements.forEach(element => {
        expect(element.props.className).toContain('highlight-class');
      });
    });

    it('applies custom style and highlightStyle', () => {
      const customStyle = { color: 'red', fontSize: 18 };
      const customHighlightStyle = { backgroundColor: 'yellow', fontWeight: 'bold' as const };

      render(<HighlightString {...defaultProps} style={customStyle} highlightStyle={customHighlightStyle} />);

      const textElement = screen.getByText(defaultProps.content);
      const highlightedElements = screen.getAllByText('world');

      expect(textElement.props.style).toEqual(expect.objectContaining(customStyle));
      highlightedElements.forEach(element => {
        expect(element.props.style).toEqual(expect.objectContaining(customHighlightStyle));
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      render(<HighlightString content="" highlightTerm="test" />);
      expect(screen.getByText('')).toBeTruthy();
    });

    it('handles unicode characters', () => {
      const content = 'Hello 世界, welcome to the 世界 of programming';
      render(<HighlightString content={content} highlightTerm="世界" />);
      const highlightedTexts = screen.getAllByText('世界');
      expect(highlightedTexts).toHaveLength(2);
    });
  });

  describe('Snapshots', () => {
    it('matches snapshot for basic highlighting', () => {
      const tree = render(<HighlightString {...defaultProps} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot with custom styling', () => {
      const tree = render(
        <HighlightString
          {...defaultProps}
          className="text-lg text-blue-500"
          highlightClassName="bg-yellow-200 font-bold"
          style={{ fontSize: 16 }}
          highlightStyle={{ backgroundColor: '#FFE4B5' }}
        />,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot with no highlighting', () => {
      const tree = render(<HighlightString {...defaultProps} highlightTerm="" />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('matches snapshot with special characters', () => {
      const tree = render(<HighlightString content="Test $100 + 50% = $150" highlightTerm="$100" />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('Integration', () => {
    it('works with stringProps and highlightStringProps', () => {
      const stringProps = { colorVariant: 'primary' as const, size: 'lg' as const };
      const highlightStringProps = { colorVariant: 'secondary' as const, size: 'sm' as const };

      render(
        <HighlightString {...defaultProps} stringProps={stringProps} highlightStringProps={highlightStringProps} />,
      );

      const textElement = screen.getByText(defaultProps.content);
      const highlightedElements = screen.getAllByText('world');

      expect(textElement.props).toEqual(expect.objectContaining(stringProps));
      highlightedElements.forEach(element => {
        expect(element.props).toEqual(expect.objectContaining(highlightStringProps));
      });
    });

    it('handles complex content with multiple highlights', () => {
      const content = 'The quick brown fox jumps over the lazy dog. The fox is quick.';
      render(<HighlightString content={content} highlightTerm="fox" />);

      const highlightedElements = screen.getAllByText('fox');
      expect(highlightedElements).toHaveLength(2);
      expect(screen.getByText(content)).toBeTruthy();
    });

    it('maintains performance with large content', () => {
      const largeContent = `${'word '.repeat(100)}target ${'word '.repeat(100)}`;
      const startTime = Date.now();

      render(<HighlightString content={largeContent} highlightTerm="target" />);

      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(100); // Should render in less than 100ms
      expect(screen.getByText('target')).toBeTruthy();
    });
  });
});
