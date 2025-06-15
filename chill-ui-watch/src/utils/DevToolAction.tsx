import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { Box, Icon } from '../components';

interface DevToolActionProps {
  children?: React.ReactNode;
  handleToggleStorybook: () => void;
}

const variants = tv({
  base: 'absolute right-5 z-50 flex-row items-center justify-center gap-5 rounded-xl bg-[#8B5CF6] p-2',
  variants: {
    position: {
      bottom: 'bottom-20',
      top: 'top-20',
    },
  },
});

export default function DevToolAction({ children, handleToggleStorybook }: DevToolActionProps) {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const handleTogglePosition = () => {
    setPosition(position === 'bottom' ? 'top' : 'bottom');
  };

  return (
    <>
      <Box className={variants({ position })}>
        <Icon name="open-book-solid" size="sm" hasPressEffect onPress={handleToggleStorybook} color="#fff" />
        <Icon
          name={position === 'bottom' ? 'angle-up-solid' : 'angle-down-solid'}
          size="sm"
          onPress={handleTogglePosition}
          color="#fff"
        />
      </Box>
      {children}
    </>
  );
}
