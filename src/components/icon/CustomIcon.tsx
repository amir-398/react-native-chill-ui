import type { SvgProps } from 'react-native-svg';

import { cssInterop } from 'nativewind';
import Svg, { Path } from 'react-native-svg';

import { ICONS, type TIcons } from '../../constants/ICONS';

export type IconProps = {
  name: keyof TIcons;
  color?: string;
  className?: string;
} & SvgProps;

cssInterop(Svg, {
  className: {
    target: 'style',
  },
});

export default function CustomIcon({ color = '#fff', name, ...props }: IconProps) {
  const viewBox = ICONS[name]?.viewBox;

  return (
    <Svg focusable={false} viewBox={viewBox} color={color} {...props}>
      {ICONS[name]?.path.map((d: string, index: number) => <Path key={index} d={d} fill={color} />)}
    </Svg>
  );
}
