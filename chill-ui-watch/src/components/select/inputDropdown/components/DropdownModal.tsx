import React from 'react';

import cn from '@/components/cn';
import { Box } from '@/components/box';

import { Position, DEFAULT_CONFIG } from '../types';

interface DropdownModalProps {
  visible: boolean;
  maxHeight: number;
  minHeight: number;
  position: Position;
  hasSearch: boolean;
  className?: string;
  onClose: () => void;
  hasShadow?: boolean;
  hasBackdrop?: boolean;
  keyboardHeight: number;
  backdropColor?: string;
  keyboardAvoiding: boolean;
  children: React.ReactNode;
  backdropClassName?: string;
  renderInput: () => React.ReactNode;
  dropdownPosition: 'auto' | 'top' | 'bottom';
}

export default function DropdownModal({
  backdropClassName,
  backdropColor,
  children,
  className,
  dropdownPosition,
  hasBackdrop,
  hasSearch,
  hasShadow,
  keyboardAvoiding,
  keyboardHeight,
  maxHeight,
  minHeight,
  onClose,
  position,
  renderInput,
  visible,
}: DropdownModalProps) {
  if (!visible || !position) return null;

  const { bottom, height, left, top, width } = position;

  const shouldPositionTop = () => {
    if (keyboardHeight > 0) {
      return bottom < keyboardHeight + height;
    }
    return bottom < (hasSearch ? DEFAULT_CONFIG.SCROLL_THRESHOLD : DEFAULT_CONFIG.FALLBACK_THRESHOLD);
  };

  if (!width || !top || !bottom) return null;

  return (
    <Box
      className={cn('elevation-lg absolute z-50 rounded-lg border border-[#E5E7EB] bg-white', className)}
      style={[
        { height: 200, maxHeight, minHeight, top: height, width },
        hasShadow && {
          shadowColor: '#000',
          shadowOffset: {
            height: 1,
            width: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
      ]}
    >
      {children}
    </Box>
  );
}
