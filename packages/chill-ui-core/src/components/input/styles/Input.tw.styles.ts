import { tv } from 'tailwind-variants';

export const inputContainerTv = tv({
  base: 'flex flex-row items-center rounded-lg border border-[#D1D5DB] bg-[#FFF] px-3',
  variants: {
    hasError: {
      true: 'border-red-500',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
});

export const inputFieldTv = tv({
  base: 'flex-1',
  defaultVariants: {
    size: 'md',
  },
  variants: {
    font: {
      primaryBold: 'font-primary_bold_font',
      primaryExtraBold: 'font-primary_extra_bold_font',
      primaryExtraLight: 'font-primary_extra_light_font',
      primaryItalic: 'font-primary_italic_font',
      primaryLight: 'font-primary_light_font',
      primaryMedium: 'font-primary_medium_font',
      primaryRegular: 'font-primary_regular_font',
      primarySemiBold: 'font-primary_semi_bold_font',
      primaryThin: 'font-primary_thin_font',
      secondaryBold: 'font-secondary_bold_font',
      secondaryExtraBold: 'font-secondary_extra_bold_font',
      secondaryExtraLight: 'font-secondary_extra_light_font',
      secondaryItalic: 'font-secondary_italic_font',
      secondaryLight: 'font-secondary_light_font',
      secondaryMedium: 'font-secondary_medium_font',
      secondaryRegular: 'font-secondary_regular_font',
      secondarySemiBold: 'font-secondary_semi_bold_font',
      secondaryThin: 'font-secondary_thin_font',
      tertiaryBold: 'font-tertiary_bold_font',
      tertiaryExtraBold: 'font-tertiary_extra_bold_font',
      tertiaryExtraLight: 'font-tertiary_extra_light_font',
      tertiaryItalic: 'font-tertiary_italic_font',
      tertiaryLight: 'font-tertiary_light_font',
      tertiaryMedium: 'font-tertiary_medium_font',
      tertiaryRegular: 'font-tertiary_regular_font',
      tertiarySemiBold: 'font-tertiary_semi_bold_font',
      tertiaryThin: 'font-tertiary_thin_font',
    },
    isStretchable: {
      true: 'w-full',
    },
    multiline: {
      true: 'min-h-[40px] text-top',
    },
    size: {
      lg: 'text-[18px] py-[14px]',
      md: 'text-[16px] py-[12px]',
      sm: 'text-[14px] py-[8px]',
      xl: 'text-[20px] py-[16px]',
      xs: 'text-[12px] py-[6px]',
    },
  },
});

export const twStyles = {
  bottomInputContainer: 'flex-row items-center justify-between gap-[4px]',
  bottomInputContainerShowLength: 'justify-end',
  errorContainer: 'flex-row items-center gap-[4px] pl-[4px]',
  iconContainer: 'flex-row items-center gap-[4px]',
  label: 'ml-[4px]',
  leftIcon: 'mr-[6px]',
  lengthText: 'mr-[2px]',
  rightIcon: 'ml-[6px]',
};
