import { useTimePicker } from '../hooks/useTimePicker';

interface TimePickerNotifierProps {
  onTimeChange: (time: any) => void;
}

export default function TimePickerNotifier({ onTimeChange }: TimePickerNotifierProps) {
  useTimePicker({ onTimeChange });
  return null;
}
