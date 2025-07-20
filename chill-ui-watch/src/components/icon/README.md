# Icon Component

A flexible and customizable icon component for React Native applications that displays SVG icons with support for different sizes, colors, and interactive press effects.

## Features

- **SVG Icons**: High-quality vector icons with crisp rendering
- **Multiple Sizes**: Various size variants from 2xs to 3xl
- **Custom Colors**: Full control over icon colors
- **Press Interactions**: Optional clickable icons with press effects
- **Press Effects**: Customizable press effect styling and sizing
- **TypeScript**: Complete type safety with proper interfaces
- **Performance**: Optimized rendering with React Native Pressable

## Basic Usage

```tsx
import { Icon } from 'chill-ui';

function Example() {
  return (
    <Box className="space-y-4 p-4">
      <Icon name="bell-solid" size="md" color="#000" />

      <Icon name="star-solid" size="lg" color="#FFD700" onPress={() => console.log('Star pressed')} />

      <Icon name="heart-solid" size="sm" color="#FF6B6B" onPress={handleLike} hasPressEffect={true} />
    </Box>
  );
}
```

## Props

| Prop                   | Type                                                              | Required | Default        | Description                           |
| ---------------------- | ----------------------------------------------------------------- | -------- | -------------- | ------------------------------------- |
| `name`                 | `keyof TIcons`                                                    | ✅       | -              | Icon name from the available icon set |
| `size`                 | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | ❌       | `'md'`         | Icon size variant                     |
| `color`                | `string`                                                          | ❌       | `'#000'`       | Icon color                            |
| `onPress`              | `() => void`                                                      | ❌       | -              | Callback when icon is pressed         |
| `hasPressEffect`       | `boolean`                                                         | ❌       | `true`         | Whether to show press effect          |
| `pressEffectClassName` | `string`                                                          | ❌       | `'bg-dark/10'` | Custom CSS classes for press effect   |
| `pressEffectSize`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`          | ❌       | -              | Size of press effect padding          |
| `className`            | `string`                                                          | ❌       | -              | Custom CSS classes for the icon       |

## Examples

### Basic Icons

```tsx
<Box className="space-y-2">
  <Icon name="bell-solid" size="md" />
  <Icon name="star-solid" size="lg" color="#FFD700" />
  <Icon name="heart-solid" size="sm" color="#FF6B6B" />
</Box>
```

### Different Sizes

```tsx
<Box className="space-y-2">
  <Icon name="bell-solid" size="2xs" />
  <Icon name="bell-solid" size="xs" />
  <Icon name="bell-solid" size="sm" />
  <Icon name="bell-solid" size="md" />
  <Icon name="bell-solid" size="lg" />
  <Icon name="bell-solid" size="xl" />
  <Icon name="bell-solid" size="2xl" />
  <Icon name="bell-solid" size="3xl" />
</Box>
```

### Clickable Icons

```tsx
<Box className="space-y-4">
  <Icon name="bell-solid" size="md" onPress={() => console.log('Bell pressed')} />

  <Icon name="star-solid" size="lg" color="#FFD700" onPress={handleFavorite} />

  <Icon name="heart-solid" size="md" color="#FF6B6B" onPress={handleLike} />
</Box>
```

### Custom Press Effects

```tsx
<Box className="space-y-4">
  <Icon name="star-solid" size="md" onPress={handleStar} pressEffectClassName="bg-yellow-100" />

  <Icon
    name="heart-solid"
    size="md"
    color="#FF6B6B"
    onPress={handleLike}
    pressEffectClassName="bg-red-100"
    pressEffectSize="lg"
  />

  <Icon name="share-solid" size="md" onPress={handleShare} pressEffectClassName="bg-blue-100 rounded-lg" />
</Box>
```

### Navigation Icons

```tsx
<Box className="flex-row items-center justify-between">
  <Icon name="angle-left-solid" size="lg" onPress={goBack} />

  <String className="text-lg font-bold">Profile</String>

  <Icon name="ellipsis-solid" size="lg" onPress={showMenu} />
</Box>
```

### Action Icons

```tsx
<Box className="flex-row space-x-4">
  <Icon name="edit-solid" size="md" color="#3B82F6" onPress={handleEdit} />

  <Icon name="trash-solid" size="md" color="#EF4444" onPress={handleDelete} />

  <Icon name="share-solid" size="md" color="#10B981" onPress={handleShare} />
</Box>
```

### Status Icons

```tsx
<Box className="space-y-2">
  <Box className="flex-row items-center space-x-2">
    <Icon name="check-solid" size="sm" color="#10B981" />
    <String>Task completed</String>
  </Box>

  <Box className="flex-row items-center space-x-2">
    <Icon name="exclamation-solid" size="sm" color="#F59E0B" />
    <String>Warning message</String>
  </Box>

  <Box className="flex-row items-center space-x-2">
    <Icon name="xmark-solid" size="sm" color="#EF4444" />
    <String>Error occurred</String>
  </Box>
</Box>
```

### Without Press Effect

```tsx
<Icon name="info-solid" size="md" color="#6B7280" onPress={showInfo} hasPressEffect={false} />
```

## Available Icons

The component supports a wide range of icons. Here are some commonly used ones:

- **Navigation**: `angle-left-solid`, `angle-right-solid`, `angle-up-solid`, `angle-down-solid`
- **Actions**: `edit-solid`, `trash-solid`, `share-solid`, `download-solid`
- **Status**: `check-solid`, `xmark-solid`, `exclamation-solid`, `info-solid`
- **UI**: `bell-solid`, `star-solid`, `heart-solid`, `ellipsis-solid`
- **Communication**: `envelope-solid`, `phone-solid`, `message-solid`

## Best Practices

### 1. Icon Sizing

```tsx
// ✅ Good: Use appropriate sizes for context
<Icon name="bell-solid" size="sm" /> // Small for lists
<Icon name="star-solid" size="md" /> // Medium for buttons
<Icon name="heart-solid" size="lg" /> // Large for emphasis
```

### 2. Color Consistency

```tsx
// ✅ Good: Use semantic colors
const iconColors = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

<Icon name="check-solid" color={iconColors.success} />
<Icon name="exclamation-solid" color={iconColors.warning} />
```

### 3. Press Effects

```tsx
// ✅ Good: Use appropriate press effects
<Icon
  name="star-solid"
  onPress={handleFavorite}
  pressEffectClassName="bg-yellow-100" // Matches icon color
/>

// ✅ Good: Disable press effect for non-interactive icons
<Icon
  name="info-solid"
  hasPressEffect={false}
/>
```

### 4. Accessibility

```tsx
// ✅ Good: Provide meaningful press handlers
<Icon
  name="edit-solid"
  onPress={() => navigateToEdit(item.id)}
  size="lg" // Adequate touch target
/>

// ✅ Good: Use consistent iconography
<Icon name="angle-left-solid" onPress={goBack} /> // Standard back icon
```

### 5. Performance

```tsx
// ✅ Good: Memoize press handlers for lists
const handleIconPress = useCallback(
  (id: string) => {
    handleAction(id);
  },
  [handleAction],
);

{
  items.map(item => <Icon key={item.id} name={item.icon} onPress={() => handleIconPress(item.id)} />);
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface IconProps {
  onPress?: () => void;
  hasPressEffect?: boolean;
  pressEffectClassName?: string;
  pressEffectSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  name: keyof TIcons;
  className?: string;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}
```

## Performance Considerations

- **SVG Rendering**: Optimized SVG rendering for React Native
- **Pressable**: Uses React Native's Pressable for efficient touch handling
- **State Management**: Minimal state for press effects
- **Memoization**: Consider memoizing press handlers for lists

## Dependencies

- **React Native**: Core Pressable component
- **CustomIcon**: Internal SVG icon renderer
- **cn**: For class name utilities

## Accessibility

The component supports standard accessibility features:

- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Visual Feedback**: Clear visual feedback for press interactions
- **Screen Reader**: Compatible with screen readers
- **Color Contrast**: Ensure sufficient contrast for custom colors
