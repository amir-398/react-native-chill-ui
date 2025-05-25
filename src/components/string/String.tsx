import { Text } from 'react-native';

export type StringProps = {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
};

export default function String({ className, color = '#000000', size = 'md', text }: StringProps) {
  const fontSize = {
    lg: 18,
    md: 16,
    sm: 14,
  }[size];

  return (
    <Text style={{ color, fontSize }} className={className}>
      {text}
    </Text>
  );
}
