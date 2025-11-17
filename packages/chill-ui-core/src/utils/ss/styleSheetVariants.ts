import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type Style = ViewStyle | TextStyle | ImageStyle;

type VariantProps<Component extends (...args: any) => any> = Parameters<Component>[0];

type VariantShape = Record<string, Record<string, Style>>;

type CompoundVariant<V extends VariantShape> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
} & {
  style: Style;
};

type VariantSchema<V extends VariantShape> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
};

type Config<K extends Style, V extends VariantShape = VariantShape> = {
  base?: K;
  variants?: V;
  defaultVariants?: VariantSchema<V>;
  compoundVariants?: CompoundVariant<V>[];
};

type Props<V> = V extends VariantShape
  ? VariantSchema<V> & {
      style?: Style;
    }
  : never;

const sv =
  <K extends Style, V extends VariantShape = VariantShape>({
    base,
    compoundVariants = [],
    defaultVariants,
    variants,
  }: Config<K, V>) =>
  (_options?: Props<V>) => {
    const styles = {} as K;

    const options = _options || ({} as Props<V>);

    if (base) {
      Object.assign(styles, base);
    }

    if (defaultVariants) {
      Object.keys(defaultVariants).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(options, key) || options[key] === undefined) {
          Object.assign(options, {
            [key]: defaultVariants[key],
          });
        }
      });
    }

    // Traiter les variants dans l'ordre de leur définition dans l'objet variants
    // au lieu de l'ordre des props passées
    if (variants) {
      Object.keys(variants).forEach(category => {
        if (options && Object.prototype.hasOwnProperty.call(options, category)) {
          const variantSelected = options[category];
          const categoryVariants = variants[category];

          if (Object.prototype.hasOwnProperty.call(categoryVariants, String(variantSelected))) {
            Object.assign(styles, categoryVariants[String(variantSelected)]);
          }
        }
      });
    }

    compoundVariants.forEach(compound => {
      const { style, ...compoundVariantOptions } = compound;
      if (Object.entries(compoundVariantOptions).every(([key, value]) => options[key] === value)) {
        Object.assign(styles, style);
      }
    });

    if (Object.prototype.hasOwnProperty.call(options, 'style')) {
      Object.assign(styles, options.style);
    }

    return styles;
  };

export { sv, type VariantProps };
