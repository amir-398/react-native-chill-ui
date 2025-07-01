export interface SegmentedControlProps {
  options: string[];
  className?: string;
  defaultOption?: string;
  itemClassName?: string;
  internalPadding?: number;
  externalPadding?: number;
  itemTextClassName?: string;
  activeItemTextColor?: string;
  inactiveItemTextColor?: string;
  activeItemTextClassName?: string;
  onChange?: (option: string) => void;
}
