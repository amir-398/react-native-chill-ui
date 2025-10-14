import { cn } from '@utils';
import { Children, cloneElement, isValidElement, PropsWithChildren } from 'react';

export function Slot({ children, ...props }: PropsWithChildren<Record<string, any>>) {
  if (isValidElement(children)) {
    return cloneElement(children as any, {
      ...props,
      ...(children.props || {}),
      className: cn(props.className, (children.props as any)?.className),
      style: {
        ...props.style,
        ...((children.props as any)?.style || {}),
      },
    });
  }
  if (Children.count(children) > 1) {
    Children.only(null);
  }
  return null;
}
