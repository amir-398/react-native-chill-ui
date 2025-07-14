# Avatar Component

The Avatar component displays user profile images with automatic fallback to initials. It supports different sizes, shapes, and touchable interactions with customizable styling.

## Features

- **Image Fallback**: Automatic fallback to user initials when no image is provided
- **Multiple Sizes**: Various size variants (xs, sm, md, lg, xl)
- **Shape Variants**: Circle, rounded, and square shapes
- **Touchable**: Optional press interactions with different touchable components
- **Customizable**: Custom colors, styling, and text properties
- **TypeScript**: Complete type safety with proper interfaces
- **Accessible**: Screen reader support and proper focus management

## Basic Usage

```tsx
import { Avatar } from 'chill-ui';

function Example() {
  return (
    <Avatar
      data={{
        firstname: 'John',
        lastname: 'Doe',
        image_url: 'https://example.com/avatar.jpg',
      }}
      size="md"
      variant="circle"
    />
  );
}
```

## Props

| Prop              | Type                                                        | Required | Default       | Description                                             |
| ----------------- | ----------------------------------------------------------- | -------- | ------------- | ------------------------------------------------------- |
| `data`            | `UserData`                                                  | ✅       | -             | User data containing firstname, lastname, and image_url |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                      | ❌       | `'sm'`        | Avatar size variant                                     |
| `variant`         | `'circle' \| 'rounded' \| 'square'`                         | ❌       | `'circle'`    | Avatar shape variant                                    |
| `className`       | `string`                                                    | ❌       | -             | Custom CSS classes                                      |
| `backgroundColor` | `string`                                                    | ❌       | -             | Custom background color                                 |
| `textColor`       | `string`                                                    | ❌       | -             | Custom text color                                       |
| `onPress`         | `() => void`                                                | ❌       | -             | Callback when avatar is pressed                         |
| `as`              | `'Pressable' \| 'TouchableOpacity' \| 'TouchableHighlight'` | ❌       | `'Pressable'` | Component to use when avatar is pressable               |
| `stringProps`     | `StringProps`                                               | ❌       | -             | Props for the String component displaying initials      |

### UserData Interface

```tsx
interface UserData {
  firstname?: string; // User's first name
  lastname?: string; // User's last name
  image_url?: string; // User's profile image URL
}
```

## Examples

### Basic Avatar with Initials

```tsx
<Avatar
  data={{
    firstname: 'John',
    lastname: 'Doe',
  }}
  size="md"
  variant="circle"
/>
```

### Avatar with Image

```tsx
<Avatar
  data={{
    firstname: 'John',
    lastname: 'Doe',
    image_url: 'https://example.com/avatar.jpg',
  }}
  size="lg"
  variant="rounded"
/>
```

### Different Sizes

```tsx
<Box className="flex-row items-center gap-2">
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="xs" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="sm" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="md" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="lg" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="xl" />
</Box>
```

### Different Shapes

```tsx
<Box className="flex-row gap-4">
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} variant="circle" size="md" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} variant="rounded" size="md" />
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} variant="square" size="md" />
</Box>
```

### Pressable Avatar with Different Touchable Components

```tsx
// Using TouchableOpacity
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  size="md"
  variant="circle"
  as="TouchableOpacity"
  onPress={() => console.log('Avatar pressed')}
/>

// Using TouchableHighlight
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  size="md"
  variant="circle"
  as="TouchableHighlight"
  onPress={() => console.log('Avatar pressed')}
/>

// Using Pressable (default)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  size="md"
  variant="circle"
  onPress={() => console.log('Avatar pressed')}
/>
```

### Custom Styling

```tsx
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  size="lg"
  variant="circle"
  backgroundColor="#3B82F6"
  className="border-2 border-blue-500"
  stringProps={{
    className: 'text-white font-bold',
  }}
/>
```

### Avatar Groups

```tsx
<Box className="flex-row">
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="md" className="border-2 border-white" />
  <Avatar data={{ firstname: 'Jane', lastname: 'Smith' }} size="md" className="-ml-2 border-2 border-white" />
  <Avatar data={{ firstname: 'Bob', lastname: 'Johnson' }} size="md" className="-ml-2 border-2 border-white" />
</Box>
```

### With Status Indicator

```tsx
<Box className="relative">
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="lg" variant="circle" />
  <Box className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
</Box>
```

## Utility Functions

### getUserInitials

```tsx
import { getUserInitials } from 'chill-ui';

// Get initials from user data
const initials = getUserInitials({ firstname: 'John', lastname: 'Doe' }); // 'JD'
const singleInitial = getUserInitials({ firstname: 'John' }); // 'J'
const empty = getUserInitials({}); // ''
```

## File Structure

```
avatar/
├── README.md          # This documentation
├── Avatar.tsx         # Main component
├── index.ts          # Exports
└── styleVariants.ts  # Tailwind variants for sizes and shapes
```

## Styling

The Avatar component uses Tailwind CSS classes with predefined variants:

### Size Variants

- `xs`: Extra small avatar
- `sm`: Small avatar (default)
- `md`: Medium avatar
- `lg`: Large avatar
- `xl`: Extra large avatar

### Shape Variants

- `circle`: Circular avatar (default)
- `rounded`: Rounded corners
- `square`: Square avatar

### Custom Colors

```tsx
// Custom background color
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#FF6B6B"
/>

// Custom text color via stringProps
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  stringProps={{
    className: 'text-blue-600',
    weight: 'bold'
  }}
/>
```

## Advanced Usage

### Avatar with Loading State

```tsx
function AvatarWithLoading({ user, isLoading }) {
  if (isLoading) {
    return (
      <Box className="animate-pulse">
        <Avatar data={{ firstname: 'Loading' }} size="md" backgroundColor="#E5E7EB" />
      </Box>
    );
  }

  return <Avatar data={user} size="md" variant="circle" />;
}
```

### Avatar with Fallback Logic

```tsx
function SmartAvatar({ user }) {
  const avatarData = {
    firstname: user.firstname || user.name || 'User',
    lastname: user.lastname || user.surname,
    image_url: user.avatar || user.profileImage || user.image_url,
  };

  return <Avatar data={avatarData} size="md" variant="circle" onPress={() => navigateToProfile(user.id)} />;
}
```

### Avatar List

```tsx
function AvatarList({ users }) {
  return (
    <Box className="flex-row flex-wrap gap-2">
      {users.map(user => (
        <Avatar key={user.id} data={user} size="sm" variant="circle" onPress={() => selectUser(user)} />
      ))}
    </Box>
  );
}
```

## Accessibility

The Avatar component includes:

- **Screen Reader Support**: Proper accessibility labels
- **Focus Management**: Keyboard navigation when pressable
- **High Contrast**: Readable text colors
- **Touch Targets**: Adequate touch area sizes

## Performance Tips

- **Image Optimization**: Use optimized images for better performance
- **Lazy Loading**: Consider lazy loading for avatar lists
- **Memoization**: Use React.memo for avatar lists
- **Caching**: Implement image caching for better UX

## Troubleshooting

### Common Issues

**Initials not showing**

- Ensure `firstname` is provided in the data object
- Check that the String component is properly imported

**Image not loading**

- Verify the `image_url` is accessible
- Check network permissions in React Native
- Ensure the image URL is properly formatted

**Touch not working**

- Verify `onPress` callback is provided
- Check that the touchable component is properly configured
- Ensure the avatar is not inside another touchable component

**Styling issues**

- Check Tailwind CSS classes are properly configured
- Verify custom colors are valid CSS color values
- Ensure className props are properly merged

### Best Practices

- Always provide at least a `firstname` for meaningful initials
- Use consistent sizing across your application
- Implement proper error handling for image loading
- Consider placeholder images for better UX
- Use semantic colors for status indicators

## Storybook

See the Storybook documentation for interactive examples:

- `components/Avatar` - Complete avatar examples with all features
