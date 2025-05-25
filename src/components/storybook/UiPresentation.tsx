import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

interface UiPresentationProps {
  className?: string;
  children: ReactNode;
}

export default function UiPresentation(props: UiPresentationProps) {
  const { children, className } = props;

  return (
    <ScrollView>
      <View {...props} className={`container flex-1 flex-row items-center justify-center py-6 ${className}`}>
        {children}
      </View>
    </ScrollView>
  );
}
