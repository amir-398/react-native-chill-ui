import { tv } from 'tailwind-variants';

export const twStyles = {
  dropdown: 'p-2',
  item: 'p-1',
  label: 'px-2 py-1',
  separator: 'my-1 h-px bg-[#E5E7EB]',
  trigger: 'self-start',
};

export const dropdownMenuItemTv = tv({
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
  },
});
