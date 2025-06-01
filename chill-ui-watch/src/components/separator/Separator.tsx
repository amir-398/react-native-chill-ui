import cn from '../cn';
import { Box } from '../box';
import { SeparatorProps } from '../../types';

export default function Separator({ className }: SeparatorProps) {
  return <Box className={cn('h-px bg-black', className)} />;
}
