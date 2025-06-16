import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';

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

  const { bottom, height, isFull, left, top, width } = position;

  const shouldPositionTop = () => {
    if (keyboardHeight > 0) {
      return bottom < keyboardHeight + height;
    }
    return bottom < (hasSearch ? DEFAULT_CONFIG.SCROLL_THRESHOLD : DEFAULT_CONFIG.FALLBACK_THRESHOLD);
  };

  if (!width || !top || !bottom) return null;

  const isTopPosition = dropdownPosition === 'auto' ? shouldPositionTop() : dropdownPosition === 'top';
  let extendHeight = !isTopPosition ? top : bottom;

  if (keyboardAvoiding && keyboardHeight > 0 && isTopPosition && dropdownPosition === 'auto') {
    extendHeight = keyboardHeight;
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      supportedOrientations={['landscape', 'portrait']}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Box
          className={cn(
            'flex-1',
            { 'bg-black/20': hasBackdrop, 'items-center': isFull },
            hasBackdrop && backdropClassName,
          )}
          style={{ ...(hasBackdrop && { backgroundColor: backdropColor }) }}
        >
          <Box className="absolute" style={{ left, top: top - height, width }}>
            {renderInput()}
          </Box>
          <Box
            className={cn('flex-1', { 'items-center justify-center': isFull })}
            style={[
              !isTopPosition
                ? { paddingTop: extendHeight }
                : {
                    justifyContent: 'flex-end',
                    paddingBottom: extendHeight,
                  },
            ]}
          >
            <Box
              className={cn('elevation-lg flex-shrink rounded-lg border border-[#E5E7EB] bg-white', className)}
              style={[
                { left, maxHeight, minHeight, width },
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
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
