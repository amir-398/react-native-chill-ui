import type { AnimatedBoxProps } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

export default function AnimatedBox(props: AnimatedBoxProps) {
  return <AnimatedViewNative {...props} />;
}
