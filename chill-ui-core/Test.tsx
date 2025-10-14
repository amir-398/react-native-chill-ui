import { View } from 'react-native';
import { useToastSs } from '@components';
import { Button } from '@components/button';

export default function Test() {
  const { toast } = useToastSs();
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

            title: 'Hello, world!',
            variant: 'info',
          });
        }}
      />
    </View>
  );
}
