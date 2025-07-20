# Carousel Component

A flexible and customizable carousel/slider component for React Native applications with support for image slides, text overlays, and customizable navigation dots.

## Features

- **Image Slides**: Support for both local images and remote URLs
- **Text Overlays**: Customizable text display on each slide
- **Navigation Dots**: Configurable dot indicators with custom styling
- **Touch Gestures**: Smooth horizontal scrolling with paging
- **Customizable Styling**: Full control over colors, sizes, and positioning
- **Children Support**: Ability to add custom content below the carousel
- **TypeScript**: Complete type safety with proper interfaces

## Basic Usage

```tsx
import { Carousel } from 'chill-ui';

function Example() {
  const items = [
    {
      id: '1',
      title: 'Première image',
      uri: 'https://picsum.photos/800/600?random=1',
    },
    {
      id: '2',
      title: 'Deuxième image',
      uri: 'https://picsum.photos/800/600?random=2',
    },
  ];

  return (
    <Box className="h-52">
      <Carousel items={items} />
    </Box>
  );
}
```

## Props

| Prop               | Type                           | Required | Default    | Description                           |
| ------------------ | ------------------------------ | -------- | ---------- | ------------------------------------- |
| `items`            | `CarouselItem[]`               | ✅       | -          | Array of carousel items               |
| `hasDot`           | `boolean`                      | ❌       | `true`     | Whether to show navigation dots       |
| `dotColor`         | `string`                       | ❌       | `'gray'`   | Color of inactive dots                |
| `dotActiveColor`   | `string`                       | ❌       | `'white'`  | Color of active dot                   |
| `dotSize`          | `IconProps['size']`            | ❌       | `'xs'`     | Size of the dots                      |
| `dotGap`           | `'sm' \| 'md' \| 'lg' \| 'xl'` | ❌       | `'md'`     | Gap between dots                      |
| `dotSpacing`       | `number`                       | ❌       | -          | Custom spacing between dots           |
| `dotPosition`      | `'top' \| 'bottom'`            | ❌       | `'bottom'` | Position of dots relative to carousel |
| `dotOffset`        | `number`                       | ❌       | `26`       | Offset distance for dot container     |
| `textColor`        | `string`                       | ❌       | `'#fff'`   | Color of the text overlay             |
| `textSize`         | `StringProps['size']`          | ❌       | `'4xl'`    | Size of the text                      |
| `textWeight`       | `StringProps['weight']`        | ❌       | `'bold'`   | Weight of the text                    |
| `textVariant`      | `StringProps['variant']`       | ❌       | -          | Text variant style                    |
| `textClassName`    | `string`                       | ❌       | -          | Custom CSS classes for text           |
| `wrapperClassName` | `string`                       | ❌       | -          | Custom CSS classes for wrapper        |
| `children`         | `React.ReactNode`              | ❌       | -          | Custom content below the carousel     |

### CarouselItem

```tsx
interface CarouselItem {
  id?: string;
  image?: ImageSourcePropType;
  uri?: string;
  url?: string;
  order?: number;
  title?: string;
}
```

## Examples

### Basic Carousel

```tsx
const items = [
  {
    id: '1',
    title: 'Première image',
    uri: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    title: 'Deuxième image',
    uri: 'https://picsum.photos/800/600?random=2',
  },
];

<Box className="h-52">
  <Carousel items={items} />
</Box>;
```

### Custom Dot Styling

```tsx
<Carousel items={items} dotActiveColor="blue" dotColor="#a1a1a1" dotSize="md" dotGap="lg" />
```

### Custom Text Styling

```tsx
<Carousel items={items} textColor="#FF6B6B" textSize="2xl" textWeight="medium" textVariant="title-2" />
```

### Dots at Top

```tsx
<Carousel items={items} dotPosition="top" dotOffset={20} />
```

### Without Dots

```tsx
<Carousel items={items} hasDot={false} />
```

### With Custom Children

```tsx
<Carousel items={items} dotOffset={30}>
  <Box className="w-full px-1">
    <Button variant="primary" size="sm" title="Next" />
  </Box>
</Carousel>
```

### Local Images

```tsx
const localItems = [
  {
    id: '1',
    title: 'Local Image 1',
    image: require('../assets/image1.jpg'),
  },
  {
    id: '2',
    title: 'Local Image 2',
    image: require('../assets/image2.jpg'),
  },
];

<Carousel items={localItems} />;
```

## Best Practices

### 1. Image Optimization

```tsx
// ✅ Good: Use appropriate image sizes
const optimizedItems = [
  {
    id: '1',
    title: 'Optimized Image',
    uri: 'https://example.com/image-800x600.jpg', // Appropriate size
  },
];

// ❌ Avoid: Using very large images
const largeItems = [
  {
    id: '1',
    title: 'Large Image',
    uri: 'https://example.com/image-4000x3000.jpg', // Too large
  },
];
```

### 2. Consistent Item Structure

```tsx
// ✅ Good: Consistent item structure
const items = [
  {
    id: '1',
    title: 'Slide 1',
    uri: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    title: 'Slide 2',
    uri: 'https://example.com/image2.jpg',
  },
];

// ❌ Avoid: Inconsistent structure
const inconsistentItems = [
  {
    id: '1',
    title: 'Slide 1',
    uri: 'https://example.com/image1.jpg',
  },
  {
    title: 'Slide 2', // Missing id
    url: 'https://example.com/image2.jpg', // Different property name
  },
];
```

### 3. Appropriate Container Height

```tsx
// ✅ Good: Set appropriate height for container
<Box className="h-52"> {/* Fixed height */}
  <Carousel items={items} />
</Box>

// ❌ Avoid: No height constraint
<Carousel items={items} /> {/* May cause layout issues */}
```

### 4. Custom Dot Positioning

```tsx
// ✅ Good: Use dotOffset for proper spacing
<Carousel
  items={items}
  dotPosition="bottom"
  dotOffset={30} // Adequate spacing from content
/>

// ✅ Good: Top positioning for different layouts
<Carousel
  items={items}
  dotPosition="top"
  dotOffset={20}
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface CarouselProps {
  hasDot?: boolean;
  dotColor?: string;
  dotOffset?: number;
  textColor?: string;
  dotSpacing?: number;
  textClassName?: string;
  dotActiveColor?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  dotSize?: IconProps['size'];
  textSize?: StringProps['size'];
  textWeight?: StringProps['weight'];
  textVariant?: StringProps['variant'];
  dotGap?: 'sm' | 'md' | 'lg' | 'xl';
  dotPosition?: 'top' | 'bottom';
  items: CarouselItem[];
}
```

## Performance Considerations

- **Image Loading**: Consider using image optimization and lazy loading for remote images
- **Memory Management**: Large image arrays should be paginated or virtualized
- **Smooth Scrolling**: The component uses `pagingEnabled` for smooth scrolling behavior

## Dependencies

- **React Native**: Core components (FlatList, ImageBackground)
- **Icon**: For dot indicators
- **String**: For text overlays
- **Box**: For layout containers

## Accessibility

The component supports standard accessibility features:

- **Touch Targets**: Adequate touch target sizes for navigation
- **Screen Reader**: Compatible with screen readers
- **Visual Indicators**: Clear visual feedback for active states
