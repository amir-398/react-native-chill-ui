import type { FlatListProps, TextInputProps } from 'react-native';

import type { StringProps } from './string.types';
import type { addressComponentsTypes, PlaceInputSelectedValue } from './common.types';

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
