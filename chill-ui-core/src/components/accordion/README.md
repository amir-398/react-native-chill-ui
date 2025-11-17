# Accordion Component

A flexible and performant accordion component for React Native that provides collapsible content areas with a compositional API inspired by Radix UI across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'react-native-chill-ui'`

## Features

- **Accessible**: Full keyboard navigation and screen reader support
- **Animated**: Smooth expand/collapse animations
- **Flexible**: Support for both single and multiple item selection
- **Customizable**: Custom icons, styling, and animation settings
- **TypeScript**: Complete type safety
- **Modular**: Separated into individual files for better maintainability
- **asChild Pattern**: Use your own components as triggers with automatic prop merging

## Quick Start

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'react-native-chill-ui';

// Basic accordion
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple items open
<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Content for first item</AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>Content for second item</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Styling

The Accordion component supports styling through:

- **NativeWind classes** (Tailwind/Hybrid versions): Use `className` prop
- **StyleSheet styles** (all versions): Use `style` prop with standard React Native properties

## Examples

### Basic Usage

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'react-native-chill-ui';

const BasicAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const MultipleAccordion = () => {
  return (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Content for first item</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>Content for second item</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
```

### Custom Trigger Content

```tsx
const CustomTriggerAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="custom">
        <AccordionTrigger>
          <Box className="flex-row items-center">
            <Box className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
            <String weight="bold" className="text-blue-600">
              Custom Trigger
            </String>
          </Box>
        </AccordionTrigger>
        <AccordionContent>Custom content here</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
```

### Different Trigger Types

```tsx
const DifferentTriggerTypes = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger as="RipplePressable">Ripple Effect</AccordionTrigger>
        <AccordionContent>Content with ripple effect trigger</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger as="TouchableHighlight">Highlight Effect</AccordionTrigger>
        <AccordionContent>Content with highlight effect trigger</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
```

### Using asChild for Custom Components

```tsx
const AsChildAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger asChild>
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 16 }}>
            <String color="white">Custom Blue Button</String>
          </TouchableOpacity>
        </AccordionTrigger>
        <AccordionContent>Content with custom styled trigger</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger asChild>
          <Button variant="primary" onPress={() => console.log('Additional action')}>
            <String>Custom Button Component</String>
          </Button>
        </AccordionTrigger>
        <AccordionContent>Content with custom button component</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
```

## API Reference

### AccordionProps

| Prop              | Type                                  | Default      | Description                                          |
| ----------------- | ------------------------------------- | ------------ | ---------------------------------------------------- |
| `type`            | `'single' \| 'multiple'`              | `'single'`   | Whether single or multiple items can be open at once |
| `children`        | `ReactNode`                           | **Required** | Child AccordionItem components                       |
| `collapsible`     | `boolean`                             | `false`      | Whether items can be collapsed (single mode only)    |
| `defaultValue`    | `string \| string[]`                  | -            | Default open items                                   |
| `disabled`        | `boolean`                             | `false`      | Disable the entire accordion                         |
| `hasCollapseIcon` | `boolean`                             | `true`       | Whether to show collapse/expand icons                |
| `iconPosition`    | `'left' \| 'right'`                   | `'right'`    | Position of the expand/collapse icon                 |
| `expandIcon`      | `keyof TIcons`                        | -            | Icon to show when item is collapsed                  |
| `collapseIcon`    | `keyof TIcons`                        | -            | Icon to show when item is expanded                   |
| `onValueChange`   | `(value: string \| string[]) => void` | -            | Callback fired when accordion state changes          |
| `className`       | `string`                              | -            | Custom CSS classes (used with NativeWind)            |
| `style`           | `StyleProp<ViewStyle>`                | -            | Additional inline styles                             |

### AccordionItemProps

| Prop        | Type                   | Default      | Description                               |
| ----------- | ---------------------- | ------------ | ----------------------------------------- |
| `value`     | `string`               | **Required** | Unique identifier for this item           |
| `children`  | `ReactNode`            | **Required** | AccordionTrigger and AccordionContent     |
| `disabled`  | `boolean`              | `false`      | Whether this specific item is disabled    |
| `className` | `string`               | -            | Custom CSS classes (used with NativeWind) |
| `style`     | `StyleProp<ViewStyle>` | -            | Additional inline styles                  |

### AccordionTriggerProps

| Prop          | Type                                                                             | Default              | Description                                                           |
| ------------- | -------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| `children`    | `ReactNode`                                                                      | **Required**         | Content to display in the trigger                                     |
| `className`   | `string`                                                                         | -                    | Custom CSS classes (used with NativeWind)                             |
| `stringProps` | `StringProps`                                                                    | -                    | Props to pass to String component when children is a string           |
| `as`          | `'TouchableOpacity' \| 'TouchableHighlight' \| 'Pressable' \| 'RipplePressable'` | `'TouchableOpacity'` | Component type to use for the trigger                                 |
| `asChild`     | `boolean`                                                                        | `false`              | Use the child component as the trigger element instead of wrapping it |
| `style`       | `StyleProp<ViewStyle>`                                                           | -                    | Additional inline styles                                              |

### AccordionContentProps

| Prop        | Type                   | Default      | Description                                        |
| ----------- | ---------------------- | ------------ | -------------------------------------------------- |
| `children`  | `ReactNode`            | **Required** | Content to display when accordion item is expanded |
| `className` | `string`               | -            | Custom CSS classes (used with NativeWind)          |
| `style`     | `StyleProp<ViewStyle>` | -            | Additional inline styles                           |

## Advanced Usage

### The asChild Pattern

The `asChild` prop allows you to use your own components as triggers while maintaining all accordion functionality. This is useful when you want complete control over the trigger styling or need to use custom components.

**How it works:**

- When `asChild={true}`, the AccordionTrigger uses your child component directly
- Props are automatically merged (onPress, className, disabled)
- Your component's existing props are preserved
- The accordion functionality (toggle, disabled state) is automatically added

**Example with custom styling:**

```tsx
<AccordionTrigger asChild>
  <TouchableOpacity
    style={{
      backgroundColor: 'blue',
      padding: 16,
      borderRadius: 8,
    }}
  >
    <String color="white">Custom Styled Button</String>
  </TouchableOpacity>
</AccordionTrigger>
```

**Example with custom component:**

```tsx
<AccordionTrigger asChild>
  <Button variant="primary" onPress={() => console.log('Custom action before toggle')}>
    My Custom Button
  </Button>
</AccordionTrigger>
```

**Props merging:**

- `onPress`: Your handler runs first, then the accordion toggle
- `className`: Your classes are merged with accordion classes
- `disabled`: Respects both component and accordion disabled states

## File Structure

```
accordion/
├── README.md                    # This documentation
├── index.ts                     # Exports
├── components/
│   ├── Accordion.tsx           # Main accordion component
│   ├── Accordion.ss.tsx        # StyleSheet version
│   ├── Accordion.tw.tsx        # Tailwind version
│   ├── AccordionItem.tsx       # Individual item wrapper
│   ├── AccordionItem.ss.tsx    # StyleSheet version
│   ├── AccordionItem.tw.tsx    # Tailwind version
│   ├── AccordionTrigger.tsx    # Clickable trigger component
│   ├── AccordionTrigger.ss.tsx # StyleSheet version
│   ├── AccordionTrigger.tw.tsx # Tailwind version
│   ├── AccordionContent.tsx    # Collapsible content area
│   ├── AccordionContent.ss.tsx # StyleSheet version
│   ├── AccordionContent.tw.tsx # Tailwind version
│   ├── AccordionContext.tsx    # Shared context for accordion state
│   └── AccordionItemContext.tsx # Context for individual items
└── styles/
    ├── Accordion.styles.ts     # StyleSheet styles
    └── Accordion.variants.tsx  # Style variants
```

## Storybook

See the Storybook documentation for interactive examples:

- `components/Accordion` - Complete accordion examples with all features

## Troubleshooting

### Common Issues

**`hasCollapseIcon` is undefined**

- Ensure you're passing the prop correctly to the Accordion component
- Check that default values are properly set in the component

**Animation not working**

- Verify `hasAnimation` prop is set to `true`
- Check `animationDuration` is a positive number

**Icons not showing**

- Ensure `hasCollapseIcon` is set to `true`
- Verify icon names are valid in your icon system
- Check `iconPosition` prop is set correctly
