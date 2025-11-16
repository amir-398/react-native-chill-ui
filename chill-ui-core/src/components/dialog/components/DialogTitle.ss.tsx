import type { DialogTitlePropsSs } from '@types';

import { isString } from '@utils';
import { StringSs } from '@components/string';

import { styles } from '../styles/Dialog.ss.styles';

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
 *
 * @example
 * ```tsx
 * <DialogTitle>Confirm Action</DialogTitle>
 * ```
 *
 * @param children - Title content (string or React element)
 * @param style - Style object for the title container
 */
export function DialogTitle(props: DialogTitlePropsSs) {
  const { children, style, ...rest } = props;

  return isString(children) ? (
    <StringSs size="lg" font="primarySemiBold" style={[styles.title, style]} {...rest}>
      {children}
    </StringSs>
  ) : (
    children
  );
}

DialogTitle.displayName = 'DialogTitle';
