import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../box';
import String from '../string';
import { StringProps } from '../../types';
import TooltipRoot from './core/TooltipRoot';

type TooltipProps = {
  children: React.ReactNode;
  title: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
  useReactNativeModal?: boolean;
  arrowColor?: string;
  arrowSize?: { width: number; height: number };
  backgroundColor?: string;
  disableShadow?: boolean;
  onClose?: () => void;
  textColor?: string;
  textSize?: StringProps['size'];
};

export default function Tooltip({
  children,
  side = 'top',
  sideOffset = 0,
  textColor,
  textSize,
  title,
  useReactNativeModal = true,
  ...rest
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipRoot
      isVisible={isVisible}
      content={
        <String color={textColor} size={textSize}>
          {title}
        </String>
      }
      side={side}
      {...rest}
    >
      <Box>
        <Pressable
          onPressIn={() => setIsVisible(true)}
          onPressOut={() => setIsVisible(false)}
          className="absolute z-50 size-full"
        />
        {children}
      </Box>
    </TooltipRoot>
  );
}
