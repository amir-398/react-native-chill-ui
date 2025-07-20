# Badge Component

A flexible and customizable badge component for React Native applications that displays small labels, tags, or status indicators with support for both text and icon content.

## Features

- **Text & Icon Support**: Display text content or icons
- **Custom Colors**: Full control over background and text colors
- **Size Variants**: Multiple size options from 2xs to 3xl
- **Border Radius**: Customizable border radius variants
- **TypeScript**: Complete type safety with proper interfaces
- **Flexible Styling**: Custom CSS classes and props for String/Icon components

## Basic Usage

```tsx
import { Badge } from 'chill-ui';

function Example() {
  return (
    <Box className="gap-4 p-4">
      <Badge>Default Badge</Badge>

      <Badge size="lg" rounded="full">
        Large Rounded Badge
      </Badge>

      <Badge badgeColor="#3B82F6" textColor="#FFFFFF" size="md" rounded="md">
        Custom Colors
      </Badge>
    </Box>
  );
}
```

## Props

| Prop          | Type                                                              | Required | Default | Description                     |
| ------------- | ----------------------------------------------------------------- | -------- | ------- | ------------------------------- |
| `children`    | `React.ReactNode`                                                 | ❌       | -       | Content to display in the badge |
| `size`        | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | ❌       | `'md'`  | Size variant for the badge      |
| `rounded`     | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`        | ❌       | `'md'`  | Border radius variant           |
| `badgeColor`  | `string`                                                          | ❌       | -       | Custom background color         |
| `textColor`   | `string`                                                          | ❌       | -       | Custom text color               |
| `className`   | `string`                                                          | ❌       | -       | Custom CSS classes              |
| `iconProps`   | `IconProps`                                                       | ❌       | -       | Props for icon component        |
| `stringProps` | `StringProps`                                                     | ❌       | -       | Props for string/text component |

## Examples

### Basic Badge

```tsx
<Badge>Default Badge</Badge>
```

### Different Sizes

```tsx
<Box className="gap-2">
  <Badge size="2xs">2xs</Badge>
  <Badge size="xs">xs</Badge>
  <Badge size="sm">sm</Badge>
  <Badge size="md">md</Badge>
  <Badge size="lg">lg</Badge>
  <Badge size="xl">xl</Badge>
  <Badge size="2xl">2xl</Badge>
  <Badge size="3xl">3xl</Badge>
</Box>
```

### Border Radius Variants

```tsx
<Box className="gap-2">
  <Badge rounded="sm">Small Radius</Badge>
  <Badge rounded="md">Medium Radius</Badge>
  <Badge rounded="lg">Large Radius</Badge>
  <Badge rounded="xl">Extra Large Radius</Badge>
  <Badge rounded="2xl">2XL Radius</Badge>
  <Badge rounded="3xl">3XL Radius</Badge>
  <Badge rounded="full">Full Radius</Badge>
</Box>
```

### Custom Colors

```tsx
<Box className="gap-2">
  <Badge badgeColor="#3B82F6" textColor="#FFFFFF">
    Blue Badge
  </Badge>

  <Badge badgeColor="#10B981" textColor="#FFFFFF">
    Green Badge
  </Badge>

  <Badge badgeColor="#EF4444" textColor="#FFFFFF">
    Red Badge
  </Badge>

  <Badge badgeColor="#F59E0B" textColor="#FFFFFF">
    Yellow Badge
  </Badge>
</Box>
```

### Icon Badges

```tsx
<Box className="gap-2">
  <Badge iconProps={{ name: 'star-solid', color: '#FFD700' }} size="lg" rounded="full" />

  <Badge iconProps={{ name: 'check-solid', color: '#10B981' }} size="md" rounded="full" />

  <Badge iconProps={{ name: 'bell-solid', color: '#3B82F6' }} size="lg" rounded="md" />
</Box>
```

### Custom Styling

```tsx
<Badge className="border-2 border-blue-500 shadow-lg" badgeColor="#EFF6FF" textColor="#1E40AF" size="lg" rounded="lg">
  Custom Styled
</Badge>
```

### Status Indicators

```tsx
<Box className="gap-2">
  <Badge badgeColor="#10B981" textColor="#FFFFFF" size="sm">
    Active
  </Badge>

  <Badge badgeColor="#6B7280" textColor="#FFFFFF" size="sm">
    Pending
  </Badge>

  <Badge badgeColor="#EF4444" textColor="#FFFFFF" size="sm">
    Error
  </Badge>

  <Badge badgeColor="#F59E0B" textColor="#FFFFFF" size="sm">
    Warning
  </Badge>
</Box>
```

### Notification Badges

```tsx
<Box className="gap-2">
  <Badge iconProps={{ name: 'bell-solid' }} badgeColor="#EF4444" textColor="#FFFFFF" size="sm" rounded="full" />

  <Badge iconProps={{ name: 'envelope-solid' }} badgeColor="#3B82F6" textColor="#FFFFFF" size="sm" rounded="full" />
</Box>
```

## Best Practices

### 1. Color Contrast

```tsx
// ✅ Good: High contrast colors
<Badge badgeColor="#1F2937" textColor="#FFFFFF">
  Dark Background
</Badge>

// ✅ Good: Light background with dark text
<Badge badgeColor="#F3F4F6" textColor="#374151">
  Light Background
</Badge>

// ❌ Avoid: Low contrast
<Badge badgeColor="#E5E7EB" textColor="#F3F4F6">
  Low Contrast
</Badge>
```

### 2. Size Consistency

```tsx
// ✅ Good: Consistent sizing within a component
<Box className="gap-2">
  <Badge size="sm">Small</Badge>
  <Badge size="sm">Medium</Badge>
  <Badge size="sm">Large</Badge>
</Box>

// ❌ Avoid: Inconsistent sizing
<Box className="gap-2">
  <Badge size="sm">Small</Badge>
  <Badge size="lg">Medium</Badge>
  <Badge size="xl">Large</Badge>
</Box>
```

### 3. Icon Usage

```tsx
// ✅ Good: Use icons for status or actions
<Badge
  iconProps={{ name: 'check-solid', color: '#10B981' }}
  size="sm"
  rounded="full"
/>

// ✅ Good: Use text for labels or categories
<Badge size="sm" rounded="md">
  New Feature
</Badge>
```

### 4. Accessibility

```tsx
// ✅ Good: Provide meaningful content
<Badge size="sm" rounded="md">
  New Message
</Badge>

// ✅ Good: Use appropriate colors for status
<Badge badgeColor="#10B981" textColor="#FFFFFF" size="sm">
  Success
</Badge>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface BadgeProps {
  className?: string;
  textColor?: string;
  badgeColor?: string;
  iconProps?: IconProps;
  stringProps?: StringProps;
  children?: React.ReactNode;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}
```

## Performance Considerations

- **Rendering**: Lightweight component with minimal re-renders
- **Styling**: Uses Tailwind CSS for efficient styling
- **Icons**: Icon rendering is optimized for performance

## Dependencies

- **Box**: For layout container
- **String**: For text content
- **Icon**: For icon content
- **cn**: For class name utilities

## Accessibility

The component supports standard accessibility features:

- **Color Contrast**: Ensure sufficient contrast between background and text
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
