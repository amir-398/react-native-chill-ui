import type { VariantProps } from 'tailwind-variants';
import type { AnimatedProps } from 'react-native-reanimated';

import {
  FlatListProps,
  ImageSourcePropType,
  Modal,
  TextInput,
  type TextInputProps,
  type TextProps,
  type TouchableOpacityProps,
  type ViewProps,
} from 'react-native';

import { inputSizeVariants } from '@/components/inputs/Input';
import { checkboxVariants } from '@/components/checkbox/styleVariants';
import { dotPositionVariants, dotVariant } from '@/components/imageSlider/ImageSlider';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr, paddingVr } from '../components/icon/Icon';
import type {
  textColorVr,
  textFontVr,
  textPositionVr,
  textSizeVr,
  textVariantVr,
} from '../components/string/styleVatiants';

import { badgeVariants } from '../components/badge/Badge';
import { SIZE_OPTIONS } from '../components/toggle/toggle';
import WrapperVariants from '../components/wrapper/styleVariants';
import { avatarVariants, sizeVariant } from '../components/avatar/styleVariants';
import { btnVariant, heightVr, positionVr } from '../components/button/styleVariants';

export interface StringProps extends TextProps {
  color?: string;
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
  numberOfLines?: number;
  children?: string | React.ReactNode;
  size?: VariantProps<typeof textSizeVr>['size'];
  font?: VariantProps<typeof textFontVr>['font'];
  weight?: VariantProps<typeof textFontVr>['weight'];
  variant?: VariantProps<typeof textVariantVr>['variant'];
  colorVariant?: VariantProps<typeof textColorVr>['color'];
  position?: VariantProps<typeof textPositionVr>['position'];
}

export type AnimatedViewProps = AnimatedProps<ViewProps>;

export type IconProps = {
  onPress?: () => void;
  hasPressEffect?: boolean;
  pressEffectClassName?: string;
  pressEffectSize?: VariantProps<typeof paddingVr>['size'];
  color?: string;
  name: keyof TIcons;
  className?: string;
  size?: VariantProps<typeof IconSizeVr>['size'];
  padding?: VariantProps<typeof paddingVr>['size'];
};

export interface ButtonIconProps extends IconProps {
  iconColor: string;
  className?: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  iconName: keyof TIcons;
  iconColorPressed: string;
  accessibilityLabel: string;
  size?: VariantProps<typeof IconSizeVr>['size'];
}

export type ToggleProps = {
  value: boolean;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
  size?: (typeof SIZE_OPTIONS)[number];
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOff?: string;
  trackColorOn?: string;
};

export interface BtnProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  btnClassName?: string;
  textClassName?: string;
  leftIcon?: keyof TIcons;
  textLeftIcon?: React.ReactNode;
  textSize?: StringProps['size'];
  textWeight?: StringProps['weight'];
  size?: VariantProps<typeof heightVr>['size'];
  variant?: VariantProps<typeof btnVariant>['variant'];
  position?: VariantProps<typeof positionVr>['position'];
}

export interface TabSwitchProps {
  titleColor: string;
  leftTabColor: string;
  tabClassName: string;
  rightTabColor: string;
  separatorColor: string;
  titleClassName: string;
  leftScreenTitle: string;
  rightScreenTitle: string;
  leftTabClassName: string;
  titleColorActive: string;
  rightTabClassName: string;
  leftTabColorActive: string;
  separatorClassName: string;
  leftRender: React.ReactNode;
  rightTabColorActive: string;
  rightRender: React.ReactNode;
  activeSeparatorColor: string;
  titleSize: StringProps['size'];
}

export interface BadgeProps {
  className?: string;
  textColor?: string;
  iconColor?: string;
  badgeColor?: string;
  textClassName?: string;
  iconName?: keyof TIcons;
  children?: React.ReactNode;
  rounded?: VariantProps<typeof badgeVariants>['rounded'];
  size?: '2xl' | '2xs' | '3xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}

export interface ToastVariantType {
  info?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  error?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  success?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  warning?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
}

export type ToastProps = {
  variant?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  position?: 'top' | 'bottom';
  duration?: number;
};

export type ToastContextType = {
  toast: (options: {
    variant?: 'info' | 'success' | 'error' | 'warning';
    message: string;
    position?: 'top' | 'bottom';
    duration?: number;
  }) => void;
};

// TimePicker--------------------------------
export type TimePickerOptionsProps = {
  backgroundColor: string;
  textHeaderColor: string;
  textDefaultColor: string;
  selectedTextColor: string;
  mainColor: string;
  textSecondaryColor: string;
  borderColor: string;
  defaultFont: string;
  headerFont: string;
  textFontSize: number;
  textHeaderFontSize: number;
  headerAnimationDistance: number;
  daysAnimationDistance: number;
  height: number;
};
export type TimePickerProps<T> = {
  onTimeChange: (date: string) => void;
  current?: string;
  selected?: string;
  configs?: object;
  options?: Partial<TimePickerOptionsProps>;
  minuteInterval?: T;
  style?: object;
};

export type TimeScrollerProps = {
  title: string;
  data: string[];
  onChange: (value: number) => void;
  options: TimePickerOptionsProps;
};
//--------------------------------

export interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'rectangle' | 'circle' | 'square' | 'text';
}

export interface LoadingIndicatorsProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}

export type addressComponentsTypes = 'postal_code' | 'locality' | 'country' | 'street_number' | 'route';

export type PlaceInputSelectedValue = 'longAddress' | 'shortAddress' | addressComponentsTypes;
export interface Place {
  formattedAddress: string;
  shortFormattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  addressComponents: {
    languageCode: string;
    longText: string;
    shortText: string;
    types: addressComponentsTypes[];
  }[];
}
export interface Places {
  placePrediction: {
    placeId: string;
    place: string;
    text: {
      text: string;
    };
  };
}
export interface PlacesResponse {
  suggestions: Places[];
}

export type PlacesInputProps = {
  query?: string;
  className?: string;
  clearable?: boolean;
  googleApiKey: string;
  placeHolder?: string;
  spinnerSize?: number;
  spinnerColor?: string;
  listClassName?: string;
  maxListHeight?: number;
  queryCountries?: string[];
  listItemClassName?: string;
  itemTextClassName?: string;
  containerClassName?: string;
  clearQueryOnSelect?: boolean;
  textInputProps?: TextInputProps;
  onSelect?: (place: any) => void;
  requiredTimeBeforeSearch?: number;
  onChangeText?: (text: string) => void;
  listHeaderComponent?: React.ReactNode;
  requiredCharactersBeforeSearch?: number;
  selectedValue?: PlaceInputSelectedValue;
  itemTextVariant?: StringProps['variant'];
  listFooterComponent?: React.ReactNode;
  emptyListText?: string;
  showListHeaderComponentWhenResults?: boolean;
  showListFooterComponentWhenResults?: boolean;
  renderItem?: ({ item }: { item: Places }) => React.ReactElement;
  flatListProps?: FlatListProps<Places>;
  placeholderTextColor?: string;
};

export interface SeparatorProps {
  className?: string;
}

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

export type AvatarProps = {
  className?: string;
  textClassName?: string;
  onPress?: () => void;
  data: {
    firstname?: string;
    lastname?: string;
    image_url?: string;
  };
  backgroundColor?: string;
  textColor?: string;
  size?: VariantProps<typeof sizeVariant>['size'];
  variant?: VariantProps<typeof avatarVariants>['variant'];
};

export type Orientation = 'portrait' | 'landscape' | 'portrait-upside-down' | 'landscape-left' | 'landscape-right';

export type Size = {
  width: number;
  height: number;
};

export interface DisplayInsets {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type Side = 'top' | 'left' | 'bottom' | 'right' | 'center';

export interface TooltipRootProps {
  side?: Side;
  arrowSize?: Size;
  className?: string;
  arrowColor?: string;
  isVisible?: boolean;
  sideOffset?: number;
  onClose?: () => void;
  accessible?: boolean;
  disableShadow?: boolean;
  backgroundColor?: string;
  content?: React.ReactNode;
  classNameWrapper?: string;
  children?: React.ReactNode;
  showChildInTooltip?: boolean;
  horizontalAdjustment?: number;
  useReactNativeModal?: boolean;
  modalComponent?: typeof Modal;
  allowChildInteraction?: boolean;
  useInteractionManager?: boolean;
  closeOnChildInteraction?: boolean;
  closeOnContentInteraction?: boolean;
  supportedOrientations?: Orientation[];
  closeOnBackgroundInteraction?: boolean;
  displayInsets?: Partial<DisplayInsets>;
  overlayColor?: TextProps['selectionColor'];
}

export interface TooltipProps
  extends Omit<
    TooltipRootProps,
    'isVisible' | 'onClose' | 'closeOnChildInteraction' | 'closeOnContentInteraction' | 'closeOnBackgroundInteraction'
  > {
  title: string;
  textColor?: string;
  textSize?: StringProps['size'];
}

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  iconColor?: string;
  className?: string;
  checkedColor?: string;
  checkboxSize?: number;
  uncheckedColor?: string;
  iconName?: keyof TIcons;
  labelClassName?: string;
  checkedClassName?: string;
  customIcon?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  size?: VariantProps<typeof IconSizeVr>['size'];
  variant?: VariantProps<typeof checkboxVariants>['variant'];
}

export interface WrapperProps {
  className?: string;
  scrollView?: boolean;
  itemsCenter?: boolean;
  safeAreaView?: boolean;
  justifyBetween?: boolean;
  children: React.ReactNode;
  nestedScrollEnabled?: boolean;
  keyboardAvoidingView?: boolean;
  keyboardAwareScrollView?: boolean;
  px?: VariantProps<typeof WrapperVariants>['px'];
  py?: VariantProps<typeof WrapperVariants>['py'];
  my?: VariantProps<typeof WrapperVariants>['my'];
  pt?: VariantProps<typeof WrapperVariants>['pt'];
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export interface DialogProps {
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactElement<{ onPress?: () => void }>;
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
}

export type DialogCloseProps = {
  asChild?: boolean;
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  children: React.ReactElement<{ onPress?: () => void }>;
};

export type DialogBackdropProps = {
  closeOnBackdropPress: boolean;
  backdropClassName?: string;
  backdropColor?: string;
};

export interface DialogContentProps {
  className?: string;
  onShow?: () => void;
  hasOverlay?: boolean;
  defaultOpen?: boolean;
  hasCloseMark?: boolean;
  backdropColor?: string;
  closeOnGoBack?: boolean;
  closeMarkColor?: string;
  children: React.ReactNode;
  backdropClassName?: string;
  onRequestClose?: () => void;
  closeMarkClassName?: string;
  useDefaultContainer?: boolean;
  closeOnBackdropPress?: boolean;
  closeMarkPosition?: 'right' | 'left';
  animation?: 'fade' | 'slide' | 'none';
  onOpenChange?: (open: boolean) => void;
  closeMarkSize?: VariantProps<typeof IconSizeVr>['size'];
}

export interface ImageSliderProps {
  hasDot?: boolean;
  dotColor?: string;
  dotOffset?: number;
  textColor?: string;
  dotSpacing?: number;
  textClassName?: string;
  dotActiveColor?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  dotSize?: IconProps['size'];
  textSize?: StringProps['size'];
  textWeight?: StringProps['weight'];
  textVariant?: StringProps['variant'];
  dotGap?: VariantProps<typeof dotVariant>['gap'];
  dotPosition?: VariantProps<typeof dotPositionVariants>['position'];
  items: {
    id?: string;
    image?: ImageSourcePropType;
    uri?: string;
    order?: number;
    url?: string;
    title?: string;
  }[];
}

export interface InputProps extends TextInputProps {
  // Basic props
  label?: string;
  className?: string;
  labelClassName?: string;

  // Error handling
  hasError?: boolean;
  errorMessage?: string;
  errorClassName?: string;
  errorIconName?: keyof TIcons;

  // Icons
  hasClearIcon?: boolean;

  // Icon actions
  inputClassName?: string;
  leftIconAction?: {
    iconName?: keyof TIcons;
    iconColor?: string;
    iconSize?: IconProps['size'];
    customIcon?: React.ReactNode;
    iconPress?: () => void;
  };
  rightIconAction?: {
    iconName?: keyof TIcons;
    iconColor?: string;
    iconSize?: IconProps['size'];
    customIcon?: React.ReactNode;
    iconPress?: () => void;
  };

  // Security
  hasSecureTextEntry?: boolean;

  // Interaction
  clickableAs?: 'pressable' | 'scale';

  // Features
  showLength?: boolean;
  customRegex?: RegExp;
  allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';

  // Styling
  isStretchable?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  size?: VariantProps<typeof inputSizeVariants>['size'];
}

export type MaskedInputProps = {
  mask: string;
  onChangeText: ({ maskedText, unmaskedText }: { maskedText: string; unmaskedText: string }) => void;
} & Omit<InputProps, 'onChangeText'>;
