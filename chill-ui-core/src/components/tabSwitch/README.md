# TabSwitch

A React Native component that provides a two-tab interface with smooth animations, gesture support, and customizable styling. Features animated tab switching, horizontal swipe navigation, and a synchronized separator indicator.

## Features

- ✅ **Two-Tab Interface**: Simple and intuitive two-tab layout
- ✅ **Smooth Animations**: Animated tab switching with React Native Reanimated
- ✅ **Gesture Support**: Horizontal swipe navigation between tabs
- ✅ **Customizable Styling**: Full control over colors, sizes, and appearance
- ✅ **Synchronized Separator**: Animated indicator that follows tab selection
- ✅ **Performance Optimized**: Memoized components and efficient rendering
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Accessibility**: Screen reader support and accessibility features
- ✅ **Flexible Content**: Support for any React components as tab content

## Quick Start

```tsx
import TabSwitch from '@/components/tabSwitch/TabSwitch';

// Basic tab switch
<TabSwitch
  leftScreenTitle="Tab 1"
  rightScreenTitle="Tab 2"
  leftRender={<Box><String>Content 1</String></Box>}
  rightRender={<Box><String>Content 2</String></Box>}
/>

// Customized tab switch
<TabSwitch
  leftScreenTitle="Profile"
  rightScreenTitle="Settings"
  leftTabColor="#E5E7EB"
  leftTabColorActive="#3B82F6"
  rightTabColor="#E5E7EB"
  rightTabColorActive="#3B82F6"
  leftRender={<ProfileScreen />}
  rightRender={<SettingsScreen />}
/>
```

## Examples

### Basic Usage

```tsx
import TabSwitch from '@/components/tabSwitch/TabSwitch';

// Simple tab switch
<TabSwitch
  leftScreenTitle="Home"
  rightScreenTitle="Profile"
  leftRender={<HomeScreen />}
  rightRender={<ProfileScreen />}
/>

// With custom colors
<TabSwitch
  leftScreenTitle="Chat"
  rightScreenTitle="Contacts"
  leftTabColor="#F3F4F6"
  leftTabColorActive="#3B82F6"
  rightTabColor="#F3F4F6"
  rightTabColorActive="#3B82F6"
  leftRender={<ChatScreen />}
  rightRender={<ContactsScreen />}
/>

// With custom separator
<TabSwitch
  leftScreenTitle="Photos"
  rightScreenTitle="Videos"
  activeSeparatorColor="#10B981"
  separatorColor="#E5E7EB"
  leftRender={<PhotosScreen />}
  rightRender={<VideosScreen />}
/>
```

### Custom Styling

```tsx
// Custom tab styling
<TabSwitch
  leftScreenTitle="Dashboard"
  rightScreenTitle="Analytics"
  tabClassName="rounded-t-lg"
  leftTabClassName="border-r border-gray-200"
  rightTabClassName="border-l border-gray-200"
  leftRender={<DashboardScreen />}
  rightRender={<AnalyticsScreen />}
/>

// Custom title styling
<TabSwitch
  leftScreenTitle="Messages"
  rightScreenTitle="Notifications"
  titleSize="xl"
  titleClassName="uppercase tracking-wide"
  titleColor="#6B7280"
  titleColorActive="#1F2937"
  leftRender={<MessagesScreen />}
  rightRender={<NotificationsScreen />}
/>

// Custom separator styling
<TabSwitch
  leftScreenTitle="Tasks"
  rightScreenTitle="Calendar"
  separatorClassName="h-1 rounded-full"
  activeSeparatorColor="#8B5CF6"
  separatorColor="#F3F4F6"
  leftRender={<TasksScreen />}
  rightRender={<CalendarScreen />}
/>
```

### Complex Content

```tsx
// With complex screen components
<TabSwitch
  leftScreenTitle="Feed"
  rightScreenTitle="Explore"
  leftRender={
    <Box className="flex-1 p-4">
      <String size="xl" weight="bold" className="mb-4">
        Feed
      </String>
      <FlatList data={feedItems} renderItem={({ item }) => <FeedItem item={item} />} keyExtractor={item => item.id} />
    </Box>
  }
  rightRender={
    <Box className="flex-1 p-4">
      <String size="xl" weight="bold" className="mb-4">
        Explore
      </String>
      <ScrollView>
        {exploreItems.map(item => (
          <ExploreItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </Box>
  }
/>
```

### Interactive Content

```tsx
// With interactive content and state
const [leftData, setLeftData] = useState([]);
const [rightData, setRightData] = useState([]);

<TabSwitch
  leftScreenTitle="Active"
  rightScreenTitle="Completed"
  leftRender={
    <Box className="flex-1 p-4">
      <String size="lg" weight="bold" className="mb-4">
        Active Tasks ({leftData.length})
      </String>
      {leftData.map(task => (
        <TaskItem key={task.id} task={task} onComplete={() => handleComplete(task.id)} />
      ))}
    </Box>
  }
  rightRender={
    <Box className="flex-1 p-4">
      <String size="lg" weight="bold" className="mb-4">
        Completed Tasks ({rightData.length})
      </String>
      {rightData.map(task => (
        <TaskItem key={task.id} task={task} completed={true} />
      ))}
    </Box>
  }
/>;
```

## Props Reference

### TabSwitchProps

| Prop                   | Type                                                     | Default     | Description                             |
| ---------------------- | -------------------------------------------------------- | ----------- | --------------------------------------- |
| `activeSeparatorColor` | `string`                                                 | `'#FCA5A5'` | Color of the active separator indicator |
| `leftRender`           | `ReactNode`                                              | -           | Content to render in the left tab       |
| `leftScreenTitle`      | `string`                                                 | -           | Title for the left tab                  |
| `leftTabClassName`     | `string`                                                 | -           | Custom CSS classes for left tab         |
| `leftTabColor`         | `string`                                                 | `'#CBD2D9'` | Background color of inactive left tab   |
| `leftTabColorActive`   | `string`                                                 | `'#7DD3FC'` | Background color of active left tab     |
| `rightRender`          | `ReactNode`                                              | -           | Content to render in the right tab      |
| `rightScreenTitle`     | `string`                                                 | -           | Title for the right tab                 |
| `rightTabClassName`    | `string`                                                 | -           | Custom CSS classes for right tab        |
| `rightTabColor`        | `string`                                                 | `'#CBD2D9'` | Background color of inactive right tab  |
| `rightTabColorActive`  | `string`                                                 | `'#7DD3FC'` | Background color of active right tab    |
| `separatorClassName`   | `string`                                                 | -           | Custom CSS classes for separator        |
| `separatorColor`       | `string`                                                 | `'black'`   | Color of the separator background       |
| `tabClassName`         | `string`                                                 | -           | Custom CSS classes for all tabs         |
| `titleClassName`       | `string`                                                 | -           | Custom CSS classes for tab titles       |
| `titleColor`           | `string`                                                 | -           | Color of inactive tab titles            |
| `titleColorActive`     | `string`                                                 | -           | Color of active tab titles              |
| `titleSize`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'lg'`      | Size of tab titles                      |

## Best Practices

### 1. Choose Meaningful Tab Titles

```tsx
// ✅ Good - Clear and descriptive titles
<TabSwitch
  leftScreenTitle="Profile"
  rightScreenTitle="Settings"
  leftRender={<ProfileScreen />}
  rightRender={<SettingsScreen />}
/>

// ✅ Good - Action-oriented titles
<TabSwitch
  leftScreenTitle="View"
  rightScreenTitle="Edit"
  leftRender={<ViewMode />}
  rightRender={<EditMode />}
/>

// ❌ Avoid - Unclear or generic titles
<TabSwitch
  leftScreenTitle="Tab 1"
  rightScreenTitle="Tab 2"
  leftRender={<SomeContent />}
  rightRender={<OtherContent />}
/>
```

### 2. Use Consistent Color Schemes

```tsx
// ✅ Good - Consistent color scheme
<TabSwitch
  leftScreenTitle="Home"
  rightScreenTitle="Profile"
  leftTabColor="#F3F4F6"
  leftTabColorActive="#3B82F6"
  rightTabColor="#F3F4F6"
  rightTabColorActive="#3B82F6"
  titleColor="#6B7280"
  titleColorActive="#1F2937"
/>

// ❌ Avoid - Inconsistent colors
<TabSwitch
  leftScreenTitle="Home"
  rightScreenTitle="Profile"
  leftTabColor="#F3F4F6"
  leftTabColorActive="#3B82F6"
  rightTabColor="#E5E7EB"
  rightTabColorActive="#10B981"
/>
```

### 3. Optimize Content Rendering

```tsx
// ✅ Good - Memoized content components
const MemoizedLeftContent = React.memo(() => <LeftScreen />);
const MemoizedRightContent = React.memo(() => <RightScreen />);

<TabSwitch
  leftScreenTitle="Left"
  rightScreenTitle="Right"
  leftRender={<MemoizedLeftContent />}
  rightRender={<MemoizedRightContent />}
/>

// ❌ Avoid - Inline complex components
<TabSwitch
  leftScreenTitle="Left"
  rightScreenTitle="Right"
  leftRender={
    <Box>
      <ComplexComponent />
      <AnotherComponent />
    </Box>
  }
  rightRender={<AnotherComplexComponent />}
/>
```

### 4. Handle Content State Appropriately

```tsx
// ✅ Good - Proper state management
const [activeTab, setActiveTab] = useState('left');

<TabSwitch
  leftScreenTitle="Active"
  rightScreenTitle="Archived"
  leftRender={<ActiveItems activeTab={activeTab} />}
  rightRender={<ArchivedItems activeTab={activeTab} />}
/>

// ❌ Avoid - Unnecessary re-renders
<TabSwitch
  leftScreenTitle="Active"
  rightScreenTitle="Archived"
  leftRender={<ActiveItems />}
  rightRender={<ArchivedItems />}
/>
```

### 5. Consider Accessibility

```tsx
// ✅ Good - Accessible tab switch
<TabSwitch
  leftScreenTitle="Profile Information"
  rightScreenTitle="Account Settings"
  leftRender={<ProfileScreen />}
  rightRender={<SettingsScreen />}
  // Add accessibility props to container
  accessible={true}
  accessibilityLabel="Profile and settings tabs"
  accessibilityHint="Swipe left or right to switch between tabs"
/>

// ❌ Avoid - No accessibility context
<TabSwitch
  leftScreenTitle="Tab 1"
  rightScreenTitle="Tab 2"
  leftRender={<Content1 />}
  rightRender={<Content2 />}
/>
```

## Advanced Usage

### Custom Tab Components

```tsx
// Create custom tab components
const CustomTab = ({ title, isActive, onPress, children }) => (
  <Pressable className={`flex-1 p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`} onPress={onPress}>
    <String size="lg" weight="bold" color={isActive ? 'white' : 'black'}>
      {title}
    </String>
    {children}
  </Pressable>
);

// Usage with custom tabs
<TabSwitch
  leftScreenTitle="Custom Left"
  rightScreenTitle="Custom Right"
  leftTabClassName="custom-left-tab"
  rightTabClassName="custom-right-tab"
  leftRender={<LeftContent />}
  rightRender={<RightContent />}
/>;
```

### Dynamic Content Loading

```tsx
const [leftData, setLeftData] = useState(null);
const [rightData, setRightData] = useState(null);
const [loading, setLoading] = useState(false);

const loadData = async tab => {
  setLoading(true);
  try {
    const data = await fetchData(tab);
    if (tab === 'left') {
      setLeftData(data);
    } else {
      setRightData(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    setLoading(false);
  }
};

<TabSwitch
  leftScreenTitle="Data 1"
  rightScreenTitle="Data 2"
  leftRender={<Box className="flex-1 p-4">{loading ? <LoadingSpinner /> : <DataList data={leftData} />}</Box>}
  rightRender={<Box className="flex-1 p-4">{loading ? <LoadingSpinner /> : <DataList data={rightData} />}</Box>}
/>;
```

### Conditional Rendering

```tsx
const [userRole, setUserRole] = useState('user');

<TabSwitch
  leftScreenTitle="Public"
  rightScreenTitle={userRole === 'admin' ? 'Admin' : 'Private'}
  leftRender={<PublicContent />}
  rightRender={userRole === 'admin' ? <AdminContent /> : <PrivateContent />}
  rightTabColor={userRole === 'admin' ? '#FEF3C7' : '#E5E7EB'}
  rightTabColorActive={userRole === 'admin' ? '#F59E0B' : '#3B82F6'}
/>;
```

### Performance Optimization

```tsx
import React from 'react';
import TabSwitch from '@/components/tabSwitch/TabSwitch';

// Memoized tab switch for performance
const MemoizedTabSwitch = React.memo(({ leftScreenTitle, rightScreenTitle, leftRender, rightRender, ...props }) => (
  <TabSwitch
    leftScreenTitle={leftScreenTitle}
    rightScreenTitle={rightScreenTitle}
    leftRender={leftRender}
    rightRender={rightRender}
    {...props}
  />
));

// Usage
<MemoizedTabSwitch
  leftScreenTitle="Tab 1"
  rightScreenTitle="Tab 2"
  leftRender={<LeftContent />}
  rightRender={<RightContent />}
/>;
```

## Performance Considerations

- **Memoized Components**: TabSwitchRender is memoized for better performance
- **Shared Values**: Uses React Native Reanimated shared values for smooth animations
- **Efficient Rendering**: Only re-renders when necessary
- **Gesture Handling**: Optimized scroll event handling with throttling

## Accessibility

The TabSwitch component includes accessibility features:

- **Screen reader support**: Proper accessibility labels and hints
- **Gesture navigation**: Support for swipe gestures
- **Keyboard navigation**: Tab-based navigation support
- **Focus management**: Clear focus indicators

### Accessibility Best Practices

```tsx
// Always provide accessibility context
<TabSwitch
  leftScreenTitle="Profile"
  rightScreenTitle="Settings"
  leftRender={<ProfileScreen />}
  rightRender={<SettingsScreen />}
  accessible={true}
  accessibilityLabel="Profile and settings tabs"
  accessibilityHint="Swipe left or right to switch between profile and settings"
/>

// Use descriptive titles
<TabSwitch
  leftScreenTitle="User Profile"
  rightScreenTitle="Account Settings"
  leftRender={<UserProfile />}
  rightRender={<AccountSettings />}
/>
```

## Troubleshooting

### Common Issues

1. **Tabs not switching**: Check if leftRender and rightRender are provided
2. **Animations not working**: Verify React Native Reanimated is properly configured
3. **Content not rendering**: Ensure content components are valid React components
4. **Styling issues**: Check className syntax and Tailwind configuration
5. **Performance issues**: Memoize content components for better performance

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<TabSwitch
  leftScreenTitle="Debug Left"
  rightScreenTitle="Debug Right"
  leftRender={
    <Box
      className="flex-1 p-4"
      onLayout={event => {
        setDebugInfo(prev => ({
          ...prev,
          leftWidth: event.nativeEvent.layout.width,
          leftHeight: event.nativeEvent.layout.height,
        }));
      }}
    >
      <String>Left Content</String>
    </Box>
  }
  rightRender={
    <Box
      className="flex-1 p-4"
      onLayout={event => {
        setDebugInfo(prev => ({
          ...prev,
          rightWidth: event.nativeEvent.layout.width,
          rightHeight: event.nativeEvent.layout.height,
        }));
      }}
    >
      <String>Right Content</String>
    </Box>
  }
/>;

{
  debugInfo.leftWidth && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-tab-view

```tsx
// Old (react-native-tab-view)
<TabView
  navigationState={{ index, routes }}
  renderScene={SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })}
  onIndexChange={setIndex}
  renderTabBar={props => <TabBar {...props} />}
/>

// New (TabSwitch)
<TabSwitch
  leftScreenTitle="First"
  rightScreenTitle="Second"
  leftRender={<FirstRoute />}
  rightRender={<SecondRoute />}
/>
```

### From custom tab implementation

```tsx
// Old (custom implementation)
<View style={styles.container}>
  <View style={styles.tabs}>
    <TouchableOpacity onPress={() => setActiveTab(0)}>
      <Text>Tab 1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveTab(1)}>
      <Text>Tab 2</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.content}>
    {activeTab === 0 ? <Content1 /> : <Content2 />}
  </View>
</View>

// New (TabSwitch)
<TabSwitch
  leftScreenTitle="Tab 1"
  rightScreenTitle="Tab 2"
  leftRender={<Content1 />}
  rightRender={<Content2 />}
/>
```
