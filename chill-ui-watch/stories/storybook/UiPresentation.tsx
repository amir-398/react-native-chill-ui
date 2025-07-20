import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { Box } from '../../src/components';

interface UiPresentationProps {
  children: ReactNode;
}

export default function UiPresentation(props: UiPresentationProps) {
  const { children } = props;

  return (
    <ScrollView>
      <Box {...props} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', padding: 16 }}>
        {children}
      </Box>
    </ScrollView>
  );
}
