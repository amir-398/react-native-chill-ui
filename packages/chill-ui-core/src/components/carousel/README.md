# Carousel Component

A modern, flexible carousel component inspired by shadcn/ui for React Native applications with support for multiple navigation styles, auto-play, and various customization options across three different styling approaches.

## Available Versions

This component comes in three versions to match your project's styling approach. You choose the version during installation, but the import statement remains consistent across all versions:

### 1. **StyleSheet Version**

- Uses React Native's built-in StyleSheet API
- Perfect for projects that don't use CSS-in-JS libraries
- Lightweight and performant
- Install: `npm install react-native-chill-ui@stylesheet`

### 2. **Tailwind Version**

- Uses NativeWind/Tailwind CSS classes
- Ideal for projects already using Tailwind CSS
- Requires NativeWind setup and Tailwind configuration
- Install: `npm install react-native-chill-ui@tailwind`

### 3. **Hybrid Version**

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Carousel } from 'react-native-chill-ui'`

## Features

- **Composable Architecture**: Build your carousel with sub-components (CarouselContent, CarouselDots, CarouselPrevious, CarouselNext, CarouselElement)
- **Auto-play Support**: Configurable auto-play with direction, interval, and loop options
- **Navigation Dots**: Customizable dot indicators with active/inactive colors
- **Navigation Arrows**: Previous/Next buttons with automatic disable states
- **Horizontal & Vertical**: Support for both scroll orientations
- **Custom Content**: Full flexibility with custom slide content
- **Context API**: Access carousel state from child components via `useCarousel` hook
- **TypeScript Support**: Fully typed for a better development experience
- **Performance Optimized**: FlatList-based with efficient rendering
- **Accessible**: Proper viewability tracking and navigation controls

## Quick Start

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselPrevious,
  CarouselNext,
  CarouselElement
} from 'react-native-chill-ui';
import { ImageBackground } from 'react-native';

// Basic horizontal carousel
<Carousel>
  <CarouselContent orientation="horizontal">
    <CarouselItem className="h-full w-screen">
      <ImageBackground source={{ uri: 'image1.jpg' }}>
        <String>Slide 1</String>
      </ImageBackground>
    </CarouselItem>
    <CarouselItem className="h-full w-screen">
      <ImageBackground source={{ uri: 'image2.jpg' }}>
        <String>Slide 2</String>
      </ImageBackground>
    </CarouselItem>
  </CarouselContent>
  <CarouselElement>
    <CarouselDots />
  </CarouselElement>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// With auto-play
<Carousel>
  <CarouselContent
    autoPlay
    autoPlayLoop
    autoPlayInterval={3000}
    orientation="horizontal"
  >
    <CarouselItem><String>Slide 1</String></CarouselItem>
    <CarouselItem><String>Slide 2</String></CarouselItem>
  </CarouselContent>
</Carousel>
```

## Components

### Carousel (Main Container)

The main wrapper component that provides context to all child components.

#### Props

| Prop             | Type                      | Required | Default | Description                          |
| ---------------- | ------------------------- | -------- | ------- | ------------------------------------ |
| `children`       | `React.ReactNode`         | ✅       | -       | Carousel sub-components              |
| `className`      | `string`                  | ❌       | -       | (only NativeWind) Custom CSS classes |
| `initialIndex`   | `number`                  | ❌       | `0`     | Initial slide index to display       |
| `onScrollChange` | `(index: number) => void` | ❌       | -       | Callback when slide changes          |
| `style`          | `StyleProp<ViewStyle>`    | ❌       | -       | Custom style object                  |

### CarouselContent

Manages the scrollable content area with FlatList.

#### Props

| Prop                | Type                         | Required | Default        | Description                          |
| ------------------- | ---------------------------- | -------- | -------------- | ------------------------------------ |
| `children`          | `React.ReactNode`            | ✅       | -              | CarouselItem components              |
| `autoPlay`          | `boolean`                    | ❌       | `false`        | Enable auto-play                     |
| `autoPlayDirection` | `'forward' \| 'backward'`    | ❌       | `'forward'`    | Auto-play direction                  |
| `autoPlayInterval`  | `number`                     | ❌       | `3000`         | Auto-play interval in ms             |
| `autoPlayLoop`      | `boolean`                    | ❌       | `true`         | Loop auto-play                       |
| `className`         | `string`                     | ❌       | -              | (only NativeWind) Custom CSS classes |
| `orientation`       | `'horizontal' \| 'vertical'` | ❌       | `'horizontal'` | Scroll orientation                   |

### CarouselItem

Individual slide component.

#### Props

| Prop        | Type                   | Required | Default | Description                          |
| ----------- | ---------------------- | -------- | ------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ✅       | -       | Slide content                        |
| `className` | `string`               | ❌       | -       | (only NativeWind) Custom CSS classes |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -       | Custom style object                  |

### CarouselElement

Positions custom elements over the carousel (typically for dots or controls).

#### Props

| Prop        | Type                   | Required | Default    | Description                          |
| ----------- | ---------------------- | -------- | ---------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ✅       | -          | Content to position                  |
| `className` | `string`               | ❌       | -          | (only NativeWind) Custom CSS classes |
| `offset`    | `number`               | ❌       | `16`       | Distance from edge in pixels         |
| `position`  | `'top' \| 'bottom'`    | ❌       | `'bottom'` | Position relative to carousel        |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -          | Custom style object                  |

### CarouselDots

Navigation dots indicator.

#### Props

| Prop            | Type                   | Required | Default   | Description                          |
| --------------- | ---------------------- | -------- | --------- | ------------------------------------ |
| `activeColor`   | `string`               | ❌       | `'white'` | Color of active dot                  |
| `inactiveColor` | `string`               | ❌       | `'gray'`  | Color of inactive dots               |
| `size`          | `IconProps['size']`    | ❌       | `'xs'`    | Dot size                             |
| `className`     | `string`               | ❌       | -         | (only NativeWind) Custom CSS classes |
| `style`         | `StyleProp<ViewStyle>` | ❌       | -         | Custom style object                  |

### CarouselPrevious

Previous slide button.

#### Props

| Prop        | Type                   | Required | Default                | Description                          |
| ----------- | ---------------------- | -------- | ---------------------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ❌       | -                      | Custom content (replaces icon)       |
| `className` | `string`               | ❌       | -                      | (only NativeWind) Custom CSS classes |
| `iconName`  | `IconProps['name']`    | ❌       | `'chevron-left-solid'` | Icon to display                      |
| `iconProps` | `Partial<IconProps>`   | ❌       | -                      | Additional icon props                |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -                      | Custom style object                  |

### CarouselNext

Next slide button.

#### Props

| Prop        | Type                   | Required | Default                 | Description                          |
| ----------- | ---------------------- | -------- | ----------------------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ❌       | -                       | Custom content (replaces icon)       |
| `className` | `string`               | ❌       | -                       | (only NativeWind) Custom CSS classes |
| `iconName`  | `IconProps['name']`    | ❌       | `'chevron-right-solid'` | Icon to display                      |
| `iconProps` | `Partial<IconProps>`   | ❌       | -                       | Additional icon props                |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -                       | Custom style object                  |

## Examples

### Basic Image Carousel

```tsx
<Box className="h-80">
  <Carousel>
    <CarouselContent orientation="horizontal">
      {images.map((image, index) => (
        <CarouselItem key={index} className="h-full w-screen">
          <ImageBackground source={{ uri: image.url }} className="h-full w-full items-center justify-center">
            <String size="4xl" color="white">
              {image.title}
            </String>
          </ImageBackground>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselElement position="bottom" offset={20}>
      <CarouselDots activeColor="blue" inactiveColor="white" />
    </CarouselElement>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</Box>
```

### Auto-play Product Showcase

```tsx
<Carousel>
  <CarouselContent autoPlay autoPlayLoop autoPlayInterval={5000} autoPlayDirection="forward" orientation="horizontal">
    {products.map(product => (
      <CarouselItem key={product.id} className="h-96 w-screen">
        <Box className="items-center justify-center p-4">
          <Image source={{ uri: product.image }} className="h-64 w-64" />
          <String size="2xl" weight="bold">
            {product.name}
          </String>
          <String size="lg" color="gray">
            ${product.price}
          </String>
          <Button title="Buy Now" onPress={() => handleBuy(product)} />
        </Box>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselElement>
    <CarouselDots />
  </CarouselElement>
</Carousel>
```

### Vertical Carousel

```tsx
<Box className="h-screen">
  <Carousel>
    <CarouselContent orientation="vertical">
      <CarouselItem className="h-full">
        <String>Section 1</String>
      </CarouselItem>
      <CarouselItem className="h-full">
        <String>Section 2</String>
      </CarouselItem>
      <CarouselItem className="h-full">
        <String>Section 3</String>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</Box>
```

### Custom Navigation Controls

```tsx
<Carousel onScrollChange={index => console.log('Slide:', index)}>
  <CarouselContent orientation="horizontal">
    <CarouselItem>
      <String>Slide 1</String>
    </CarouselItem>
    <CarouselItem>
      <String>Slide 2</String>
    </CarouselItem>
    <CarouselItem>
      <String>Slide 3</String>
    </CarouselItem>
  </CarouselContent>

  {/* Custom styled navigation */}
  <CarouselElement position="bottom" offset={30}>
    <Box className="flex-row items-center gap-4">
      <CarouselDots activeColor="#3b82f6" inactiveColor="#d1d5db" size="lg" />
    </Box>
  </CarouselElement>

  {/* Custom arrow buttons */}
  <CarouselPrevious className="bg-blue-500">
    <String color="white">←</String>
  </CarouselPrevious>

  <CarouselNext className="bg-blue-500">
    <String color="white">→</String>
  </CarouselNext>
</Carousel>
```

### Using the Carousel Context

```tsx
import { useCarousel } from 'react-native-chill-ui';

function CustomCarouselControls() {
  const { currentIndex, totalSlides, goToSlide, nextSlide, prevSlide, canScrollNext, canScrollPrev } = useCarousel();

  return (
    <Box className="flex-row items-center gap-2">
      <Button title="Previous" onPress={prevSlide} isDisabled={!canScrollPrev} />
      <String>
        {currentIndex + 1} / {totalSlides}
      </String>
      <Button title="Next" onPress={nextSlide} isDisabled={!canScrollNext} />
    </Box>
  );
}

// Usage
<Carousel>
  <CarouselContent orientation="horizontal">{/* items */}</CarouselContent>
  <CarouselElement>
    <CustomCarouselControls />
  </CarouselElement>
</Carousel>;
```

## Best Practices

### 1. Performance

- Use `keyExtractor` for unique keys in large lists
- Optimize image sizes for mobile devices
- Consider lazy loading for images
- Use `removeClippedSubviews` for long lists

### 2. Accessibility

- Provide meaningful descriptions for images
- Ensure navigation buttons have proper labels
- Test with screen readers
- Consider auto-play timing for accessibility

### 3. User Experience

- Don't auto-play without user consent
- Provide visible navigation controls
- Keep auto-play intervals reasonable (3-5 seconds)
- Show progress indicators (dots)
- Respect user's reduced motion preferences

### 4. Content

- Keep slide content focused and simple
- Ensure text is readable on all backgrounds
- Optimize images for fast loading
- Consider adding loading states

## TypeScript

All components are fully typed. Import types as needed:

```tsx
import type {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselDotsProps,
  CarouselButtonProps,
  CarouselElementProps,
} from 'react-native-chill-ui';
```

## File Structure

```
carousel/
├── components/
│   ├── Carousel.tsx          # Hybrid version
│   ├── Carousel.tw.tsx       # Tailwind version
│   ├── Carousel.ss.tsx       # StyleSheet version
│   └── CarouselContext.tsx   # Context provider
├── hooks/
│   └── useAutoPlay.ts        # Auto-play logic hook
├── styles/
│   ├── Carousel.tw.styles.ts # Tailwind styles
│   └── Carousel.ss.styles.ts # StyleSheet styles
├── utils/
│   └── defaultProps.ts       # Default props
└── index.ts                  # Exports
```

## Related Components

- **Button**: For custom action buttons in slides
- **String**: For text content in slides
- **Icon**: For custom navigation icons
- **Box**: For layout and positioning
- **Image**: For optimized image rendering

## Migration Guide

If you're upgrading from an older carousel implementation:

### Old API

```tsx
<Carousel items={items} dotOffset={30} hasDot={true} renderItem={({ item }) => <MySlide item={item} />} />
```

### New API

```tsx
<Carousel>
  <CarouselContent orientation="horizontal">
    {items.map(item => (
      <CarouselItem key={item.id}>
        <MySlide item={item} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselElement offset={30}>
    <CarouselDots />
  </CarouselElement>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Troubleshooting

### Carousel not scrolling

- Ensure `CarouselContent` has valid children
- Check if `pagingEnabled` is set correctly
- Verify container has proper height/width

### Auto-play not working

- Confirm `autoPlay` is set to `true`
- Check `autoPlayInterval` value
- Verify no JavaScript errors in console

### Dots not showing

- Ensure `CarouselDots` is wrapped in `CarouselElement`
- Check if `totalSlides` is greater than 1
- Verify proper z-index positioning

### Images not loading

- Check image URIs are valid
- Verify network connectivity
- Consider adding error boundaries
- Use proper image optimization

## Performance Considerations

- The carousel uses `FlatList` for efficient rendering
- Images should be optimized before loading
- Consider using `react-native-fast-image` for better performance
- Auto-play intervals should be reasonable (>2 seconds)
- Use `removeClippedSubviews` for large datasets

## License

MIT
