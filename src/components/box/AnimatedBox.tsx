import type { AnimatedViewProps } from '../../types';

import { AnimatedView } from './View';

export default function AnimatedBox(props: AnimatedViewProps) {
  const { className, style, ...rest } = props;

  return <AnimatedView style={style} className={className} {...rest} />;
}
