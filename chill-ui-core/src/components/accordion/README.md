# Accordion Component

The Accordion component provides a collapsible content area with a compositional API inspired by Radix UI.

### Basic Usage

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'chill-ui';

function Example() {
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
}
```

### Multiple Items Open

```tsx
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

### Components

## Props

### Accordion Props

| Prop              | Type                                  | Required | Default   | Description                                          |
| ----------------- | ------------------------------------- | -------- | --------- | ---------------------------------------------------- |
| `type`            | `'single' \| 'multiple'`              | ✅       | -         | Whether single or multiple items can be open at once |
| `children`        | `ReactNode`                           | ✅       | -         | Child AccordionItem components                       |
| `collapsible`     | `boolean`                             | ❌       | `false`   | Whether items can be collapsed (single mode only)    |
| `defaultValue`    | `string \| string[]`                  | ❌       | -         | Default open items                                   |
| `disabled`        | `boolean`                             | ❌       | `false`   | Disable the entire accordion                         |
| `hasCollapseIcon` | `boolean`                             | ❌       | `true`    | Whether to show collapse/expand icons                |
| `iconPosition`    | `'left' \| 'right'`                   | ❌       | `'right'` | Position of the expand/collapse icon                 |
| `expandIcon`      | `keyof TIcons`                        | ❌       | -         | Icon to show when item is collapsed                  |
| `collapseIcon`    | `keyof TIcons`                        | ❌       | -         | Icon to show when item is expanded                   |
| `onValueChange`   | `(value: string \| string[]) => void` | ❌       | -         | Callback fired when accordion state changes          |
| `className`       | `string`                              | ❌       | -         | Custom CSS classes                                   |

### AccordionItem Props

| Prop        | Type        | Required | Default | Description                            |
| ----------- | ----------- | -------- | ------- | -------------------------------------- |
| `value`     | `string`    | ✅       | -       | Unique identifier for this item        |
| `children`  | `ReactNode` | ✅       | -       | AccordionTrigger and AccordionContent  |
| `disabled`  | `boolean`   | ❌       | `false` | Whether this specific item is disabled |
| `className` | `string`    | ❌       | -       | Custom CSS classes                     |

### AccordionTrigger Props

| Prop          | Type                                                                             | Required | Default              | Description                                                           |
| ------------- | -------------------------------------------------------------------------------- | -------- | -------------------- | --------------------------------------------------------------------- |
| `children`    | `ReactNode`                                                                      | ✅       | -                    | Content to display in the trigger                                     |
| `className`   | `string`                                                                         | ❌       | -                    | Custom CSS classes                                                    |
| `stringProps` | `StringProps`                                                                    | ❌       | -                    | Props to pass to String component when children is a string           |
| `as`          | `'TouchableOpacity' \| 'TouchableHighlight' \| 'Pressable' \| 'RipplePressable'` | ❌       | `'TouchableOpacity'` | Component type to use for the trigger                                 |
| `asChild`     | `boolean`                                                                        | ❌       | `false`              | Use the child component as the trigger element instead of wrapping it |

### AccordionContent Props

| Prop        | Type        | Required | Default | Description                                        |
| ----------- | ----------- | -------- | ------- | -------------------------------------------------- |
| `children`  | `ReactNode` | ✅       | -       | Content to display when accordion item is expanded |
| `className` | `string`    | ❌       | -       | Custom CSS classes                                 |

### Features

- **Accessible**: Full keyboard navigation and screen reader support
- **Animated**: Smooth expand/collapse animations
- **Flexible**: Support for both single and multiple item selection
- **Customizable**: Custom icons, styling, and animation settings
- **TypeScript**: Complete type safety
- **Modular**: Separated into individual files for better maintainability
- **asChild Pattern**: Use your own components as triggers with automatic prop merging

### File Structure

```
accordion/
├── README.md                # This documentation
├── Accordion.tsx           # Main accordion component
├── AccordionItem.tsx       # Individual item wrapper
├── AccordionTrigger.tsx    # Clickable trigger component
├── AccordionContent.tsx    # Collapsible content area
├── AccordionContext.tsx    # Shared context for accordion state
├── AccordionItemContext.tsx # Context for individual items
└── index.ts               # Exports
```

### Examples

#### Custom Trigger Content

```tsx
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
```

#### No Animation

```tsx
<Accordion type="single" collapsible hasAnimation={false}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Instant Toggle</AccordionTrigger>
    <AccordionContent>Content appears instantly without animation</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Left-aligned Icons

```tsx
<Accordion type="single" collapsible iconPosition="left">
  <AccordionItem value="item-1">
    <AccordionTrigger>Left Icon</AccordionTrigger>
    <AccordionContent>Icon appears on the left side</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Different Trigger Types

```tsx
<AccordionItem value="item-1">
  <AccordionTrigger as="RipplePressable">Ripple Effect</AccordionTrigger>
  <AccordionContent>Content with ripple effect trigger</AccordionContent>
</AccordionItem>

<AccordionItem value="item-2">
  <AccordionTrigger as="TouchableHighlight">Highlight Effect</AccordionTrigger>
  <AccordionContent>Content with highlight effect trigger</AccordionContent>
</AccordionItem>
```

#### Using asChild for Custom Components

```tsx
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
```

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
