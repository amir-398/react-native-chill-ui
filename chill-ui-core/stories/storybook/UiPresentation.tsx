import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { cn } from '../../src/utils';
import { Box } from '../../src/components';

interface UiPresentationProps {
  className?: string;
  children: ReactNode;
}

export default function UiPresentation(props: UiPresentationProps) {
  const { children, className } = props;

  return (
    <ScrollView>
      <Box {...props} className={cn('flex-1  justify-center p-4', className)}>
        {children}
      </Box>
    </ScrollView>
  );
}
