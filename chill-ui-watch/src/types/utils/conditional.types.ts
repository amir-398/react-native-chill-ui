/**
 * Conditional types utility for NativeWind detection
 * Allows components to use different prop types based on NativeWind availability
 */

/**
 * Type to detect if NativeWind is available at compile time
 * This is a compile-time check based on module resolution
 *
 * Note: This may not work in all environments, so we also provide runtime detection
 */

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var NATIVEWIND_INSTALLED: boolean | undefined;
}

export type IsNativeWindInstalled = 'nativewind' extends keyof NodeJS.Require['cache'] ? true : false;

/**
 * Runtime-based conditional type detection
 * Uses the runtime detector function for more reliable detection
 */

/**
 * Conditional type that selects between TailwindProps and StyleSheetProps
 * based on NativeWind availability
 */
export type ConditionalProps<
  TailwindProps,
  StyleSheetProps,
  HasNativeWind = IsNativeWindInstalled,
> = HasNativeWind extends true ? TailwindProps : StyleSheetProps;

/**
 * Runtime detection fallback type
 * For cases where compile-time detection isn't sufficient
 */
export interface RuntimeConditionalProps<TailwindProps, StyleSheetProps> {
  tw: TailwindProps;
  ss: StyleSheetProps;
}

/**
 * Helper type to create hybrid props that work with both systems
 */
export type HybridProps<TailwindProps, StyleSheetProps> =
  | TailwindProps
  | StyleSheetProps
  | (TailwindProps & StyleSheetProps);
