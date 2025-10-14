import { View } from 'react-native';
import { useToast } from '@components';
import { Button } from '@components/button';

export default function Test() {
  const { toast } = useToast();
  return (
    <View className="flex-1 items-center justify-center">
      <Button
        title="Show toast"
        onPress={() => {
          toast({
            allowMultiple: true,
            maxToasts: 3,
            message: 'Hello, world!',
            position: 'bottom',
            swipeable: true,
            title: 'Hello, world!',
            variant: 'info',
          });
        }}
      />
    </View>
  );
}
