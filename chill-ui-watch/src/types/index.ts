import type { VariantProps } from 'tailwind-variants';
import type { AnimatedProps } from 'react-native-reanimated';

import {
  FlatListProps,
  ImageSourcePropType,
  ListRenderItem,
  Modal,
  TextInput,
  type TextInputProps,
  type TextProps,
  type TouchableOpacityProps,
  type ViewProps,
} from 'react-native';

import { inputSizeVariants } from '@/components/inputs/Input';
import { checkboxVariants } from '@/components/checkbox/styleVariants';
import { CountryCodesProps } from '@/components/inputs/phoneNumberInput/countryCodes';
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

// --------------------------------------------------------------------------------

// LoadingIndicators ------------------------------------------------------------

// --------------------------------------------------------------------------------

export interface LoadingIndicatorsProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}
export type LoadingIndicatorType =
  | 'bounce'
  | 'chase'
  | 'circleFade'
  | 'flow'
  | 'fold'
  | 'grid'
  | 'pulse'
  | 'spinner'
  | 'swing'
  | 'wander';

export type LoadingIndicatorProps = LoadingIndicatorsProps & {
  name: LoadingIndicatorType;
};
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

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

export type AutocompleteDropdownItem = CountryCodesProps & { id: string };

export type InputDropdownProps = {
  searchRef?: React.RefObject<TextInput | null>;
  dataSet: AutocompleteDropdownItem[];
  hasItemSeparator?: boolean;
  renderItem: ListRenderItem<AutocompleteDropdownItem>;
  suggestionsListMaxHeight?: number;
  withAnimation?: boolean;
  footer?: React.ReactNode;
  onSearch?: (text: string) => void;
  hasSearch?: boolean;
  searchInputProps?: Partial<InputProps>;
} & Partial<FlatListProps<AutocompleteDropdownItem>>;

// PhoneNumberTextInput ------------------------------------------------------------
// --------------------------------------------------------------------------------
export type PhoneNumberTextInputOnPhoneNumberChange = {
  countryCode: CountryCodesProps['code'];
  countrySuffix: string;
  phoneNumber: string;
  phoneNumberWithSuffix: string;
  phoneNumberWithSuffixMasked: string;
  phoneWithMask: string;
  isValid: boolean;
};

export type PhoneNumberTextInputOnError = {
  errorMessage: string | null;
  isValid: boolean;
};

export type PhoneNumberTextInputProps = {
  allowedCountries?: CountryCodesProps['code'][];
  defaultCountry?: CountryCodesProps['code'];
  onCountryChange?: (country: CountryCodesProps) => void;
  onPhoneNumberChange?: (phoneNumber: PhoneNumberTextInputOnPhoneNumberChange) => void;
  language?: 'fr' | 'en';
  onError?: (error: PhoneNumberTextInputOnError) => void;
  hasErrorOnChange?: boolean;
  dropdownProps?: Partial<InputDropdownProps>;
} & Omit<MaskedInputProps, 'onChangeText' | 'mask'>;

// --------------------------------------------------------------------------------

// Slider ------------------------------------------------------------
// --------------------------------------------------------------------------------
export interface SliderProps {
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  thumbColor?: string;
  minimumValue: number;
  maximumValue: number;
  trackMarks?: number[];
  animationConfig?: any;
  startFromZero?: boolean;
  trackClassName?: string;
  thumbClassName?: string;
  value: number | number[];
  trackClickable?: boolean;
  debugTouchArea?: boolean;
  trackRightPadding?: number;
  maximumTrackColor?: string;
  minimumTrackColor?: string;
  containerClassName?: string;
  animateTransitions?: boolean;
  maximumTrackClassName?: string;
  minimumTrackClassName?: string;
  thumbImage?: string | string[];
  animationType?: 'timing' | 'spring';
  thumbTouchSize?: { width: number; height: number };
  renderMaximumTrackComponent?: () => React.ReactNode;
  renderMinimumTrackComponent?: () => React.ReactNode;
  renderTrackMarkComponent?: (index: number) => React.ReactNode;
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
  renderAboveThumbComponent?: (index: number, value: number) => React.ReactNode;
  renderBelowThumbComponent?: (index: number, value: number) => React.ReactNode;
  renderThumbComponent?: React.ReactNode | ((index: number) => React.ReactNode);
}

// --------------------------------------------------------------------------------

// AutocompleteDropdown ------------------------------------------------------------
// --------------------------------------------------------------------------------

// InputDropdown ----------
export interface InputDropdownBaseProps {
  visible: boolean;
  maxHeight: number;
  minHeight?: number;
  className?: string;
  hasShadow?: boolean;
  hasSearch?: boolean;
  withAnimation?: boolean;
  children: React.ReactNode;
  searchInputProps?: InputProps;
}

export interface InputDropdownListProps {
  data: any[];
  currentValue?: any;
  emptyText?: string;
  valueField?: string;
  dropdownProps?: any;
  isLoading?: boolean;
  onSelectItem?: (item: any) => void;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  customDropdownItem?: (item: any, selected: boolean) => React.ReactNode;
  dropdownItemProps?: {
    activeBackgroundColor?: string;
    className?: string;
    textItemProps?: any;
  };
}

export type InputDropdownPropsBis = Omit<InputDropdownBaseProps, 'children'> & InputDropdownListProps;

export type AutocompleteDropdownRefProps = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type DropdownProps = {
  className?: string;
  hasShadow?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  emptyText?: string;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  position?: 'auto' | 'top' | 'bottom';
  withAnimation?: boolean;
} & Omit<FlatListProps<any>, 'renderItem' | 'data'>;

export type InputsProps = {
  containerClassName?: string;
} & InputProps;

export interface AutocompleteDropdownBackdropProps {
  color: string;
  opacity: number;
  visible: boolean;
  onPress: () => void;
}

export interface AutocompleteDropdownProps<T> {
  dataSet: T[];
  disable?: boolean;
  maxHeight?: number;
  minHeight?: number;
  excludeItems?: T[];
  valueField: keyof T;
  hasSearch?: boolean;
  onBlur?: () => void;
  isLoading?: boolean;
  autoScroll?: boolean;
  onFocus?: () => void;
  searchField?: keyof T;
  inputProps?: InputsProps;
  excludeSearchItems?: T[];
  keyboardAvoiding?: boolean;
  hasPerformSearch?: boolean;
  confirmSelectItem?: boolean;
  dropdownProps?: DropdownProps;
  searchInputProps?: InputsProps;
  onSelectItem: (item: T) => void;
  mode?: 'default' | 'modal' | 'auto';
  closeModalWhenSelectedItem?: boolean;
  onConfirmSelectItem?: (item: T) => void;
  backdrop?: AutocompleteDropdownBackdropProps;
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  customInputSearch?: (onSearch: (text: string) => void) => React.ReactElement | null;
  dropdownItemProps?: {
    className?: string;
    activeBackgroundColor?: string;
    textItemProps?: StringProps;
  };
  ref?:
    | React.RefObject<AutocompleteDropdownRefProps>
    | React.RefObject<AutocompleteDropdownRefProps>
    | null
    | undefined;
}

// --------------------------------------------------------------------------------
