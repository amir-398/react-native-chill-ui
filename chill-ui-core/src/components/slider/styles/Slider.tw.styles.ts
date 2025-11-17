import { tv } from 'tailwind-variants';

export const twStyles = {
  label: 'absolute px-[8px] py-[4px] rounded-[6px] bg-[#3f3f3f] items-center justify-center',
  range: 'absolute h-[6px] rounded-[9999px] bg-[#3f3f3f]',
  root: 'h-[40px] justify-center',
  rootVertical: 'rotate-[-90deg]',
  thumb: 'absolute size-[16px] rounded-[9999px] bg-[#3f3f3f]',
  thumbOpacity: 'opacity-30',
  touchOverlay: 'absolute bottom-0 left-0 right-0 top-0 bg-transparent',
  track: 'h-[4px] rounded-[9999px] bg-[#b3b3b3]',
};

export const sliderLabelTv = tv({
  variants: {
    position: {
      bottom: 'top-[30px]',
      top: 'bottom-[30px]',
    },
  },
});
