import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '../box';
import Avatar from './Avatar';
import String from '../string';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';

/**
 * Example component demonstrating Avatar usage with and without NativeWind
 * This component shows how the Avatar automatically adapts based on NativeWind availability
 */
export default function AvatarExample() {
  const userData = {
    firstname: 'John',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastname: 'Doe',
  };

  const userData2 = {
    firstname: 'Jane',
    lastname: 'Smith',
  };

  const userData3 = {
    firstname: 'Bob',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastname: 'Johnson',
  };

  return (
    <Box style={styles.container}>
      <String size="xl" weight="bold" style={styles.title}>
        Avatar Component Example
      </String>

      <String size="md" style={styles.subtitle}>
        NativeWind Available: {isNativeWindInstalled() ? 'Yes' : 'No'}
      </String>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Basic Avatars
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} size="sm" />
          <Avatar data={userData2} size="md" />
          <Avatar data={userData3} size="lg" />
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Size Variants
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} size="2xs" />
          <Avatar data={userData} size="xs" />
          <Avatar data={userData} size="sm" />
          <Avatar data={userData} size="md" />
          <Avatar data={userData} size="lg" />
          <Avatar data={userData} size="xl" />
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Shape Variants
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} variant="circle" size="lg" />
          <Avatar data={userData} variant="square" size="lg" />
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Custom Styling
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} backgroundColor="#FF6B6B" size="lg" />
          <Avatar data={userData} backgroundColor="#4ECDC4" size="lg" />
          <Avatar data={userData} backgroundColor="#45B7D1" size="lg" />
          {isNativeWindInstalled() && (
            <Avatar data={userData} className="border-4 border-blue-500 shadow-lg" size="lg" />
          )}
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Touchable Avatars
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} onPress={() => console.log('Avatar pressed!')} size="lg" />
          <Avatar
            data={userData}
            onPress={() => console.log('TouchableOpacity pressed!')}
            as="TouchableOpacity"
            size="lg"
          />
          <Avatar
            data={userData}
            onPress={() => console.log('TouchableHighlight pressed!')}
            as="TouchableHighlight"
            size="lg"
          />
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Custom String Props
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={userData} stringProps={{ color: '#FFFFFF', weight: 'bold' }} size="lg" />
          <Avatar data={userData} stringProps={{ color: '#000000', weight: 'semibold' }} size="lg" />
        </Box>
      </Box>

      <Box style={styles.section}>
        <String size="lg" weight="semibold" style={styles.sectionTitle}>
          Different User Data
        </String>
        <Box style={styles.avatarRow}>
          <Avatar data={{ firstname: 'A' }} size="lg" />
          <Avatar data={{ firstname: 'AB', lastname: 'CD' }} size="lg" />
          <Avatar data={{ firstname: 'John', lastname: 'Doe' }} size="lg" />
          <Avatar data={{ firstname: 'Jane', lastname: 'Smith', lastname: 'Johnson' }} size="lg" />
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  avatarRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-around',
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#333',
    marginBottom: 15,
  },
  subtitle: {
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});
