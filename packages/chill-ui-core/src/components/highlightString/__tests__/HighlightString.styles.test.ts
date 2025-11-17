import { styles } from '../styles/HightlightString.ss.styles';
import { twStyles } from '../styles/HightlightString.tw.styles';

const { defaultHighlightClassName } = twStyles;

describe('HighlightString Styles', () => {
  describe('StyleSheet styles', () => {
    it('has default highlight style with correct background color', () => {
      expect(styles.defaultHighlightStyle).toBeDefined();
      expect(styles.defaultHighlightStyle.backgroundColor).toBe('#FFE4B5');
    });

    it('has proper StyleSheet structure', () => {
      expect(typeof styles.defaultHighlightStyle).toBe('object');
      expect(styles.defaultHighlightStyle).not.toBeNull();
    });
  });

  describe('Tailwind variants', () => {
    it('has default highlight className', () => {
      expect(defaultHighlightClassName).toBeDefined();
      expect(typeof defaultHighlightClassName).toBe('string');
      expect(defaultHighlightClassName).toBe('bg-[#FFE4B5]');
    });

    it('has valid Tailwind class format', () => {
      expect(defaultHighlightClassName).toMatch(/^bg-\[#[A-Fa-f0-9]{6}\]$/);
    });
  });

  describe('Style consistency', () => {
    it('has consistent colors between StyleSheet and Tailwind', () => {
      const styleSheetColor = styles.defaultHighlightStyle.backgroundColor;
      const tailwindColor = defaultHighlightClassName.match(/#[A-Fa-f0-9]{6}/)?.[0];

      expect(styleSheetColor).toBe(tailwindColor);
    });
  });
});
