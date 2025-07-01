import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

// Types génériques
export type AnimatedViewProps = AnimatedProps<ViewProps>;

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

// Types pour les adresses (utilisés par PlacesInput)
export type addressComponentsTypes = 'postal_code' | 'locality' | 'country' | 'street_number' | 'route';

export type PlaceInputSelectedValue = 'longAddress' | 'shortAddress' | addressComponentsTypes;
