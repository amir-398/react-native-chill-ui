import { tv } from 'tailwind-variants';

export const twStyles = {
  container: 'flex-row items-center self-start',
  contentCheckBox: 'items-center justify-center border p-1',
  isDisabled: 'opacity-50',
  label: 'ml-2 text-[#000000]',
  pressable: 'flex-row items-center justify-center',
};

export const checkboxStyles = tv({
  base: 'flex-row items-center',
});

export const checkboxTv = tv({
  variants: {
    isChecked: {
      false: 'border-[#D1D5DB] bg-[#FFF]',
      true: 'bg-[#7DD3FC] border-[#7DD3FC]',
    },
    isDisabled: {
      true: 'opacity-50',
    },
    size: {
      lg: 'size-[24px]',
      md: 'size-[20px]',
      sm: 'size-[16px]',
      xl: 'size-[28px]',
      xs: 'size-[12px]',
    },
    variant: {
      circle: 'rounded-full',
      square: 'rounded',
    },
  },
});
