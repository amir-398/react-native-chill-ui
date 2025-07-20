import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function for combining and merging CSS class names with intelligent conflict resolution.
 * Combines the functionality of `clsx` for conditional class logic and `tailwind-merge` for conflict resolution.
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
 *
 * // Tailwind CSS conflict resolution
 * const resolvedClass = cn('p-4', 'p-8'); // Result: "p-8" (last wins)
 * ```
 *
 * @param inputs - Variable number of class name inputs
 * @returns Combined and resolved class name string
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;
