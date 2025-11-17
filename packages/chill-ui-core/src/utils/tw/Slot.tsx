import { Children, cloneElement, isValidElement, PropsWithChildren } from 'react';

import { cn } from './cn';

export function Slot({ children, ...props }: PropsWithChildren<Record<string, any>>) {
  if (isValidElement(children)) {
    return cloneElement(children as any, {
      ...props,
      ...((children.props || {}) as any),
      className: cn(props.className, (children.props as any)?.className),
      style: {
        ...props.style,
        ...(((children.props as any)?.style || {}) as any),
      },
    });
  }
  if (Children.count(children) > 1) {
    Children.only(null);
  }
  return null;
}
