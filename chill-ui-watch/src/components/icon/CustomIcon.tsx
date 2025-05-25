import type { SvgProps } from 'react-native-svg';

import { cssInterop } from 'nativewind';
import Svg, { Path } from 'react-native-svg';

import { ICONS, type TIcons } from '../../constants/ICONS';

export type IconProps = {
  name: keyof TIcons;
  color?: string;
} & SvgProps;

cssInterop(Svg, {
  className: {
    target: 'style',
  },
});

export default function CustomIcon({ className, color = '#fff', name }: IconProps) {
  const viewBox = ICONS[name]?.viewBox;

  return (
    <Svg className={className || ''} focusable={false} viewBox={viewBox} color={color}>
      {ICONS[name]?.path.map((d: string, index: number) => <Path key={index} d={d} fill={color} />)}
    </Svg>
  );
}
