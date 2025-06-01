import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../box';
import String from '../string';
import { TooltipProps } from '../../types';
import TooltipRoot from './core/TooltipRoot';

export default function Tooltip({
  children,
  className,
  side = 'top',
  sideOffset = 0,
  textColor = '#000',
  textSize = 'md',
  title,
  useReactNativeModal = true,
  ...rest
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipRoot
      closeOnChildInteraction={false}
      closeOnContentInteraction={false}
      isVisible={isVisible}
      content={
        <String color={textColor} size={textSize}>
          {title}
        </String>
      }
      side={side}
      className={className}
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
