type CreateStringStylesProps = {
  size?: string;
  colorVariant?: string;
  position?: string;
  variant?: string;
  weight?: string;
};

const createStringStyles = ({ colorVariant, position, size, variant, weight }: CreateStringStylesProps) => {
  // Size mappings (equivalent to Tailwind classes)
  const sizeMap: Record<string, { fontSize: number; lineHeight: number }> = {
    '2xl': { fontSize: 24, lineHeight: 32 },
    '2xs': { fontSize: 10, lineHeight: 14 },
    '3xl': { fontSize: 30, lineHeight: 36 },
    lg: { fontSize: 18, lineHeight: 28 },
    md: { fontSize: 16, lineHeight: 24 },
    sm: { fontSize: 14, lineHeight: 20 },
    xl: { fontSize: 20, lineHeight: 28 },
    xs: { fontSize: 12, lineHeight: 16 },
  };

  // Position mappings
  const positionMap: Record<string, { textAlign: 'auto' | 'left' | 'center' | 'right' | 'justify' }> = {
    center: { textAlign: 'center' },
    justify: { textAlign: 'justify' },
    left: { textAlign: 'left' },
    right: { textAlign: 'right' },
  };

  // Weight mappings
  const weightMap: Record<
    string,
    { fontWeight: 'normal' | '500' | '600' | 'bold' | '200' | '800' | 'italic' | '300' | '100' }
  > = {
    bold: { fontWeight: 'bold' },
    extraBold: { fontWeight: '800' },
    extraLight: { fontWeight: '200' },
    italic: { fontWeight: 'italic' },
    light: { fontWeight: '300' },
    medium: { fontWeight: '500' },
    normal: { fontWeight: 'normal' },
    regular: { fontWeight: 'normal' },
    semibold: { fontWeight: '600' },
    semiBold: { fontWeight: '600' },
    thin: { fontWeight: '100' },
  };

  // Variant mappings
  const variantMap: Record<string, { fontSize: number; fontWeight: string; lineHeight: number }> = {
    'body-1': { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    'body-2': { fontSize: 14, fontWeight: 'normal', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
    'title-1': { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
    'title-2': { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
    'title-3': { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
  };

  const sizeStyle = size ? sizeMap[size] : {};
  const positionStyle = position ? positionMap[position] : {};
  const weightStyle = weight ? weightMap[weight] : {};
  const variantStyle = variant ? variantMap[variant] : {};

  return {
    fontSize:
      (sizeStyle as { fontSize: number; lineHeight: number }).fontSize ||
      (variantStyle as { fontSize: number; fontWeight: string; lineHeight: number }).fontSize ||
      16,
    fontWeight:
      (weightStyle as { fontWeight: string }).fontWeight ||
      (variantStyle as { fontSize: number; fontWeight: string; lineHeight: number }).fontWeight ||
      'normal',
    lineHeight:
      (sizeStyle as { fontSize: number; lineHeight: number }).lineHeight ||
      (variantStyle as { fontSize: number; fontWeight: string; lineHeight: number }).lineHeight ||
      24,
    textAlign: (positionStyle as { textAlign: 'auto' | 'left' | 'center' | 'right' | 'justify' }).textAlign || 'auto',
  };
};

export default createStringStyles;
