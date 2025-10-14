import { Children, isValidElement } from 'react';

export function extractBorderRadius(children: React.ReactNode): number {
  if (!children) return 0;

  const firstChild = Children.toArray(children)[0];
  if (!isValidElement(firstChild)) return 0;

  const { style } = firstChild.props as { style?: any };
  if (!style) return 0;

  // Handle array of styles
  if (Array.isArray(style)) {
    const styleWithBorderRadius = style.find(styleObj => styleObj?.borderRadius);
    return styleWithBorderRadius?.borderRadius || 0;
  }

  // Handle single style object
  return style.borderRadius || 0;
}
