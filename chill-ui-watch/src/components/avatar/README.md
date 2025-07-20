# Avatar Component

A flexible and customizable avatar component for React Native applications that displays user profile images with intelligent fallback to initials. Supports different sizes, shapes, and touchable interactions.

## Features

- **Image Support**: Display user profile images with automatic fallback
- **Initials Fallback**: Intelligent initials generation from first and last names
- **Multiple Sizes**: Various size variants from 2xs to 3xl
- **Shape Variants**: Circle and square avatar shapes
- **Touchable Interactions**: Support for different touchable components
- **Custom Styling**: Full control over colors and styling
- **TypeScript**: Complete type safety with proper interfaces

## Basic Usage

```tsx
import { Avatar } from 'chill-ui';

function Example() {
  const userData = {
    firstname: 'John',
    lastname: 'Doe',
    image_url: 'https://example.com/avatar.jpg',
  };

  return (
    <Box className="gap-4 p-4">
      <Avatar data={userData} size="md" variant="circle" />

      <Avatar data={{ firstname: 'Jane', lastname: 'Smith' }} size="lg" variant="square" />

      <Avatar data={userData} onPress={() => console.log('Avatar pressed')} size="xl" />
    </Box>
  );
}
```

## Props

| Prop              | Type                                                              | Required | Default       | Description                     |
| ----------------- | ----------------------------------------------------------------- | -------- | ------------- | ------------------------------- |
| `data`            | `{ firstname?: string; lastname?: string; image_url?: string }`   | ✅       | -             | User data for avatar display    |
| `size`            | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | ❌       | `'sm'`        | Avatar size variant             |
| `variant`         | `'circle' \| 'square'`                                            | ❌       | `'circle'`    | Avatar shape variant            |
| `onPress`         | `() => void`                                                      | ❌       | -             | Callback when avatar is pressed |
| `as`              | `'Pressable' \| 'TouchableOpacity' \| 'TouchableHighlight'`       | ❌       | `'Pressable'` | Component to use when pressable |
| `backgroundColor` | `string`                                                          | ❌       | -             | Custom background color         |
| `className`       | `string`                                                          | ❌       | -             | Custom CSS classes              |
| `stringProps`     | `StringProps`                                                     | ❌       | -             | Props for the String component  |

## Examples

### Basic Avatar

```tsx
const userData = {
  firstname: 'John',
  lastname: 'Doe',
};

<Avatar data={userData} />;
```

### With Profile Image

```tsx
const userData = {
  firstname: 'Jane',
  lastname: 'Smith',
  image_url: 'https://example.com/avatar.jpg',
};

<Avatar data={userData} size="lg" />;
```

### Different Sizes

```tsx
<Box className="gap-2">
  <Avatar data={userData} size="2xs" />
  <Avatar data={userData} size="xs" />
  <Avatar data={userData} size="sm" />
  <Avatar data={userData} size="md" />
  <Avatar data={userData} size="lg" />
  <Avatar data={userData} size="xl" />
  <Avatar data={userData} size="2xl" />
  <Avatar data={userData} size="3xl" />
</Box>
```

### Shape Variants

```tsx
<Box className="gap-4">
  <Avatar data={userData} variant="circle" size="lg" />
  <Avatar data={userData} variant="square" size="lg" />
</Box>
```

### Clickable Avatar

```tsx
<Avatar data={userData} onPress={() => console.log('Avatar clicked')} size="lg" />
```

### Different Touchable Types

```tsx
<Box className="gap-4">
  <Avatar data={userData} onPress={() => console.log('Pressed')} as="Pressable" />

  <Avatar data={userData} onPress={() => console.log('Pressed')} as="TouchableOpacity" />

  <Avatar data={userData} onPress={() => console.log('Pressed')} as="TouchableHighlight" />
</Box>
```

### Custom Styling

```tsx
<Avatar data={userData} backgroundColor="#3B82F6" className="border-2 border-blue-500 shadow-lg" size="lg" />
```

### Single Initial

```tsx
<Avatar data={{ firstname: 'John' }} size="lg" />
```

### Custom String Props

```tsx
<Avatar
  data={userData}
  stringProps={{
    weight: 'bold',
    color: '#FFFFFF',
    className: 'uppercase',
  }}
  size="lg"
/>
```

### Avatar Grid

```tsx
<Box className="grid grid-cols-4 gap-4">
  {users.map((user, index) => (
    <Avatar key={index} data={user} size="md" onPress={() => handleUserSelect(user)} />
  ))}
</Box>
```

## Initials Generation

The component automatically generates initials from the user data:

```tsx
// Full name
getUserInitials({ firstname: 'John', lastname: 'Doe' }); // Returns 'JD'

// First name only
getUserInitials({ firstname: 'John' }); // Returns 'J'

// No name
getUserInitials({}); // Returns ''
```

## Best Practices

### 1. Image Loading

```tsx
// ✅ Good: Provide fallback data
const userData = {
  firstname: 'John',
  lastname: 'Doe',
  image_url: 'https://example.com/avatar.jpg', // Will fallback to 'JD' if image fails
};

// ✅ Good: Handle image loading errors
<Avatar data={userData} onPress={() => handleImageError()} />;
```

### 2. Consistent Sizing

```tsx
// ✅ Good: Use consistent sizes within a component
<Box className="gap-2">
  <Avatar data={user1} size="md" />
  <Avatar data={user2} size="md" />
  <Avatar data={user3} size="md" />
</Box>

// ❌ Avoid: Inconsistent sizing
<Box className="gap-2">
  <Avatar data={user1} size="sm" />
  <Avatar data={user2} size="lg" />
  <Avatar data={user3} size="xl" />
</Box>
```

### 3. Touchable Interactions

```tsx
// ✅ Good: Use appropriate touchable type
<Avatar
  data={userData}
  onPress={handlePress}
  as="TouchableOpacity" // Good for simple interactions
/>

<Avatar
  data={userData}
  onPress={handlePress}
  as="TouchableHighlight" // Good for visual feedback
/>
```

### 4. Accessibility

```tsx
// ✅ Good: Provide meaningful press handlers
<Avatar
  data={userData}
  onPress={() => navigateToUserProfile(userData)}
  size="lg"
/>

// ✅ Good: Use appropriate sizes for touch targets
<Avatar
  data={userData}
  onPress={handlePress}
  size="md" // Adequate size for mobile
/>
```

### 5. Custom Styling

```tsx
// ✅ Good: Use custom colors for brand consistency
<Avatar
  data={userData}
  backgroundColor="#007AFF"
  className="border-2 border-blue-500"
  size="lg"
/>

// ✅ Good: Use custom string props for typography
<Avatar
  data={userData}
  stringProps={{
    weight: 'bold',
    color: '#FFFFFF'
  }}
  size="lg"
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface AvatarProps {
  className?: string;
  onPress?: () => void;
  data: {
    firstname?: string;
    lastname?: string;
    image_url?: string;
  };
  backgroundColor?: string;
  textColor?: string;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  stringProps?: StringProps;
  variant?: 'circle' | 'square';
  as?: 'Pressable' | 'TouchableOpacity' | 'TouchableHighlight';
}
```

## Performance Considerations

- **Image Loading**: Images are loaded efficiently with React Native's Image component
- **Initials Calculation**: Initials are calculated once and memoized
- **Touchable Components**: Appropriate touchable component is rendered based on props

## Dependencies

- **React Native**: Core components (Image, Pressable, TouchableOpacity, TouchableHighlight)
- **Box**: For layout container
- **String**: For initials display
- **cn**: For class name utilities

## Accessibility

The component supports standard accessibility features:

- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Screen Reader**: Compatible with screen readers
- **Visual Feedback**: Proper visual feedback for touchable interactions
- **Image Alt Text**: Consider providing alt text for profile images
