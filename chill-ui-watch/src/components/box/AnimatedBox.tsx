import type { AnimatedViewProps } from '../../types';

import { AnimatedView as AnimatedViewNative } from './View';

export default function AnimatedBox(props: AnimatedViewProps) {
  return <AnimatedViewNative {...props} />;
}
