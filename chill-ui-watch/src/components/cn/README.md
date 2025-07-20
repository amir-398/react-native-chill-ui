# CN Utility Function

A utility function for combining and merging CSS class names with intelligent conflict resolution using `clsx` and `tailwind-merge`.

## Features

- **Class Combination**: Intelligently combines multiple class names
- **Conflict Resolution**: Automatically resolves Tailwind CSS conflicts
- **Type Safety**: Full TypeScript support with proper type inference
- **Performance**: Optimized for runtime performance
- **Flexibility**: Accepts various input types (strings, objects, arrays, etc.)

## Basic Usage

```tsx
import cn from 'chill-ui/cn';

// Simple class combination
const className = cn('bg-blue-500', 'text-white', 'p-4');

// Conditional classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'bg-gray-300 text-gray-500',
);

// With objects
const cardClass = cn('card', {
  'card--active': isActive,
  'card--disabled': isDisabled,
});

// With arrays
const containerClass = cn(['container', 'mx-auto', ['px-4', 'py-2'], isLarge && 'max-w-4xl']);
```

## API

### `cn(...inputs: ClassValue[])`

Combines multiple class name inputs into a single string, resolving conflicts intelligently.

#### Parameters

- `...inputs` - Variable number of class name inputs
  - `string` - Direct class names
  - `object` - Object with boolean values for conditional classes
  - `array` - Arrays of class names
  - `null` / `undefined` - Ignored values
  - `false` - Ignored values

#### Returns

- `string` - Combined and resolved class name string

## Examples

### Basic Class Combination

```tsx
import cn from 'chill-ui/cn';

const className = cn('bg-blue-500', 'text-white', 'p-4');
// Result: "bg-blue-500 text-white p-4"
```

### Conditional Classes

```tsx
const buttonClass = cn(
  'px-4 py-2 rounded font-medium',
  isPrimary && 'bg-blue-500 text-white hover:bg-blue-600',
  isSecondary && 'bg-gray-500 text-white hover:bg-gray-600',
  isDisabled && 'opacity-50 cursor-not-allowed',
);
```

### Object Syntax

```tsx
const cardClass = cn('card p-4 rounded-lg shadow', {
  'bg-white': !isDark,
  'bg-gray-800 text-white': isDark,
  'border-2 border-blue-500': isSelected,
  'opacity-75': isDisabled,
});
```

### Array Syntax

```tsx
const containerClass = cn([
  'container',
  'mx-auto',
  ['px-4', 'py-2'],
  isLarge && 'max-w-4xl',
  isCentered && 'text-center',
]);
```

### Complex Combinations

```tsx
const complexClass = cn(
  'base-class',
  {
    'active-class': isActive,
    'disabled-class': isDisabled,
  },
  ['array-class-1', 'array-class-2', isVisible && 'visible-class'],
  variant === 'primary' && 'primary-variant',
  size && `size-${size}`,
  customClass,
);
```

### Tailwind CSS Conflict Resolution

```tsx
// Without cn - conflicts remain
const badClass = 'p-4 p-8'; // Both padding classes remain

// With cn - conflicts are resolved
const goodClass = cn('p-4', 'p-8'); // Result: "p-8" (last wins)

// More complex conflict resolution
const resolvedClass = cn(
  'bg-red-500 text-white',
  'bg-blue-500 text-black', // Overrides previous background and text
  'p-4 px-8', // px-8 overrides p-4 horizontal padding
);
// Result: "bg-blue-500 text-black p-4 px-8"
```

### Component Usage

```tsx
import cn from 'chill-ui/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  className?: string;
}

function Button({ variant = 'primary', size = 'md', isDisabled, className }: ButtonProps) {
  const buttonClass = cn(
    // Base classes
    'font-medium rounded transition-colors',

    // Size variants
    {
      'px-3 py-1 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },

    // Variant styles
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
    },

    // Disabled state
    isDisabled && 'opacity-50 cursor-not-allowed',

    // Custom classes (can override defaults)
    className,
  );

  return (
    <button className={buttonClass} disabled={isDisabled}>
      Button
    </button>
  );
}
```

### Dynamic Classes

```tsx
const getStatusClass = (status: 'success' | 'warning' | 'error') => {
  return cn('status-indicator', {
    'bg-green-500 text-white': status === 'success',
    'bg-yellow-500 text-black': status === 'warning',
    'bg-red-500 text-white': status === 'error',
  });
};

// Usage
const statusClass = getStatusClass('success');
```

## Best Practices

### 1. Order of Classes

```tsx
// ✅ Good: Base classes first, then conditionals, then custom classes
const className = cn(
  'base-class', // Base styles
  {
    'active-class': isActive, // Conditional styles
    'disabled-class': isDisabled,
  },
  customClass, // Custom classes last (can override)
);
```

### 2. Conflict Resolution

```tsx
// ✅ Good: Let cn handle conflicts
const className = cn(
  'p-4', // Base padding
  isLarge && 'p-8', // Override for large variant
);

// ❌ Avoid: Manual conflict handling
const badClassName = isLarge ? 'p-8' : 'p-4';
```

### 3. Conditional Logic

```tsx
// ✅ Good: Use object syntax for multiple conditions
const className = cn('button', {
  'button--primary': variant === 'primary',
  'button--secondary': variant === 'secondary',
  'button--disabled': isDisabled,
});

// ✅ Good: Use logical operators for simple conditions
const simpleClass = cn('card', isActive && 'card--active', isSelected && 'card--selected');
```

### 4. Performance

```tsx
// ✅ Good: Memoize complex class combinations
const memoizedClass = useMemo(
  () => cn('complex-class', { active: isActive }, [customClasses]),
  [isActive, customClasses],
);

// ❌ Avoid: Recalculating on every render
const recalculatedClass = cn('complex-class', { active: isActive }, [customClasses]);
```

## Dependencies

- **clsx**: For conditional class name logic
- **tailwind-merge**: For intelligent Tailwind CSS conflict resolution

## TypeScript

The function is fully typed with TypeScript:

```tsx
import { type ClassValue } from 'clsx';

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
```

## Performance Considerations

- **Caching**: Consider memoizing complex class combinations in React components
- **Bundle Size**: Both `clsx` and `tailwind-merge` are lightweight dependencies
- **Runtime**: The function is optimized for fast execution

## Migration from Other Utilities

### From `classnames`

```tsx
// Before (classnames)
import classNames from 'classnames';
const className = classNames('base', { active: isActive });

// After (cn)
import cn from 'chill-ui/cn';
const className = cn('base', { active: isActive });
```

### From Manual String Concatenation

```tsx
// Before (manual)
const className = `base ${isActive ? 'active' : ''} ${customClass}`;

// After (cn)
const className = cn('base', isActive && 'active', customClass);
```

### From Template Literals

```tsx
// Before (template literals)
const className = `button button--${variant} ${isDisabled ? 'disabled' : ''}`;

// After (cn)
const className = cn('button', `button--${variant}`, isDisabled && 'disabled');
```
