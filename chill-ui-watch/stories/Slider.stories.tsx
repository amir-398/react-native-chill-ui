import React from 'react';
import { View } from 'react-native';

import Slider from '../src/components/slider/Slider';

export default {
  component: Slider,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  title: 'Components/Slider',
};

function Template(props: React.ComponentProps<typeof Slider>) {
  return <Slider {...props} />;
}

export function Basic() {
  return <Template minimumValue={0} maximumValue={100} value={50} />;
}

export function WithSteps() {
  return <Template minimumValue={0} maximumValue={100} value={50} step={10} />;
}

export function CustomThumb() {
  return <Template minimumValue={0} maximumValue={100} value={50} thumbTintColor="#00FF00" />;
}

export function RangeSlider() {
  return <Template minimumValue={0} maximumValue={100} value={[25, 75]} />;
}

export function Disabled() {
  return <Template minimumValue={0} maximumValue={100} value={50} disabled />;
}

export function WithTrackMarks() {
  return <Template minimumValue={0} maximumValue={100} value={50} trackMarks={[0, 25, 50, 75, 100]} />;
}

export function CustomThumbComponent() {
  return (
    <Template
      minimumValue={0}
      maximumValue={100}
      value={50}
      renderThumbComponent={() => (
        <View
          style={{
            backgroundColor: '#FF0000',
            borderRadius: 10,
            height: 20,
            width: 20,
          }}
        />
      )}
    />
  );
}
