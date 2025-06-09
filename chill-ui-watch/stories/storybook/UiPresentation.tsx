import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { Box, cn } from '../../src/components';

interface UiPresentationProps {
  className?: string;
  children: ReactNode;
}

export default function UiPresentation(props: UiPresentationProps) {
  const { children, className } = props;

  return (
    <ScrollView>
      <Box {...props} className={cn('container flex-1 items-center justify-center py-6', className)}>
        {children}
      </Box>
    </ScrollView>
  );
}
