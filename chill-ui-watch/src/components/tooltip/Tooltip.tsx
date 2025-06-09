import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../box';
import String from '../string';
import { TooltipProps } from '../../types';
import TooltipRoot from './core/TooltipRoot';

export default function Tooltip({
  children,
  content,
  textColor = '#000',
  textSize = 'md',
  title,
  ...rest
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipRoot
      {...rest}
      isVisible={isVisible}
      content={
        content || (
          <String color={textColor} size={textSize}>
            {title}
          </String>
        )
      }
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
