/**
 * Custom utility function for combining CSS class names without external dependencies.
 * Supports strings, arrays, objects, and conditional logic.
 *
 * @example
 * ```tsx
 * // Simple class combination
 * const className = cn('bg-blue-500', 'text-white', 'p-4');
 * // Result: "bg-blue-500 text-white p-4"
 *
 * // Conditional classes
 * const buttonClass = cn(
 *   'px-4 py-2 rounded',
 *   isActive && 'bg-blue-500 text-white',
 *   isDisabled && 'bg-gray-300 text-gray-500'
 * );
 *
 * // With objects
 * const cardClass = cn(
 *   'card',
 *   {
 *     'card--active': isActive,
 *     'card--disabled': isDisabled,
 *   }
 * );
 *
 * // With arrays
 * const containerClass = cn([
 *   'container',
 *   'mx-auto',
 *   ['px-4', 'py-2'],
 *   isLarge && 'max-w-4xl'
 * ]);
 * ```
 *
 * @param inputs - Variable number of class name inputs
 * @returns Combined class name string
 */
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[];

// Common Tailwind CSS class prefixes that can conflict
const CONFLICT_GROUPS = {
  // Spacing
  m: /^m-/,
  mb: /^mb-/,
  ml: /^ml-/,
  mr: /^mr-/,
  mt: /^mt-/,
  mx: /^mx-/,
  my: /^my-/,
  p: /^p-/,
  pb: /^pb-/,
  pl: /^pl-/,
  pr: /^pr-/,
  pt: /^pt-/,
  px: /^px-/,
  py: /^py-/,

  // Sizing
  h: /^h-/,
  'max-h': /^max-h-/,
  'max-w': /^max-w-/,
  'min-h': /^min-h-/,
  'min-w': /^min-w-/,
  size: /^size-/,
  w: /^w-/,

  // Colors
  bg: /^bg-/,
  border: /^border-(?![\d])/,
  'text-align': /^text-(left|center|right|justify|start|end)$/,
  'text-color':
    /^text-(white|black|gray-|red-|blue-|green-|yellow-|purple-|pink-|indigo-|teal-|orange-|cyan-|lime-|emerald-|sky-|violet-|fuchsia-|rose-|amber-|slate-|zinc-|neutral-|stone-)/,
  'text-size': /^text-(\[.*\]|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,

  // Layout
  display: /^(block|inline|flex|grid|hidden)$/,
  position: /^(static|fixed|absolute|relative|sticky)$/,

  // Flexbox
  'align-items': /^items-/,
  'align-self': /^self-/,
  flex: /^flex-/,
  'justify-content': /^justify-/,

  // Border
  'border-w': /^border-[\d]/,
  rounded: /^rounded/,

  // Typography
  'font-weight': /^font-/,
  'line-height': /^leading-/,

  // Effects
  opacity: /^opacity-/,
  shadow: /^shadow/,

  // Transforms
  rotate: /^rotate-/,
  scale: /^scale-/,
  translate: /^translate-/,

  // Z-index
  z: /^z-/,
};

const resolveConflicts = (classes: string[]): string[] => {
  const resolved = new Map<string, string>();

  classes.forEach(cls => {
    let conflictKey: string | null = null;

    conflictKey =
      Object.keys(CONFLICT_GROUPS).find(group => CONFLICT_GROUPS[group as keyof typeof CONFLICT_GROUPS].test(cls)) ||
      null;

    if (conflictKey) {
      resolved.set(conflictKey, cls);
    } else {
      resolved.set(cls, cls);
    }
  });

  return Array.from(resolved.values());
};

const cn = (...inputs: ClassValue[]): string => {
  const classes: string[] = [];

  const processInput = (input: ClassValue): void => {
    if (!input) return;

    if (typeof input === 'string') {
      input.split(/\s+/).forEach(cls => {
        if (cls) classes.push(cls);
      });
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      input.forEach(processInput);
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) {
          key.split(/\s+/).forEach(cls => {
            if (cls) classes.push(cls);
          });
        }
      });
    }
  };

  inputs.forEach(processInput);

  return resolveConflicts(classes.filter(Boolean)).join(' ').trim();
};

export { cn };
