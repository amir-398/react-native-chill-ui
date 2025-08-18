import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Avatar from '../Avatar';
import { getUserInitials } from '../Avatar';
import { isNativeWindInstalled, resetNativeWindDetection } from '../../../utils/nativewindDetector';

// Mock the nativewind-detector module
jest.mock('../../../utils/nativewind-detector', () => ({
  isNativeWindInstalled: jest.fn(),
  resetNativeWindDetection: jest.fn(),
}));

describe('Avatar Component', () => {
  const mockUserData = {
    firstname: 'John',
    lastname: 'Doe',
    image_url: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resetNativeWindDetection();
  });

  describe('getUserInitials function', () => {
    it('should return initials from firstname and lastname', () => {
      expect(getUserInitials({ firstname: 'John', lastname: 'Doe' })).toBe('JD');
    });

    it('should return single initial when only firstname is provided', () => {
      expect(getUserInitials({ firstname: 'John' })).toBe('J');
    });

    it('should return empty string when no name is provided', () => {
      expect(getUserInitials({})).toBe('');
    });

    it('should handle empty strings', () => {
      expect(getUserInitials({ firstname: '', lastname: '' })).toBe('');
    });
  });

  describe('Avatar with NativeWind available', () => {
    beforeEach(() => {
      (isNativeWindInstalled as jest.Mock).mockReturnValue(true);
    });

    it('should render with NativeWind classes', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} testID="avatar" />);

      const avatar = getByTestId('avatar');
      expect(avatar).toBeTruthy();
    });

    it('should apply custom className when provided', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} className="custom-class" testID="avatar" />);

      const avatar = getByTestId('avatar');
      expect(avatar).toBeTruthy();
    });

    it('should render with image when image_url is provided', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} testID="avatar" />);

      const avatar = getByTestId('avatar');
      expect(avatar).toBeTruthy();
    });
  });

  describe('Avatar without NativeWind', () => {
    beforeEach(() => {
      (isNativeWindInstalled as jest.Mock).mockReturnValue(false);
    });

    it('should render with StyleSheet styles', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} testID="avatar" />);

      const avatar = getByTestId('avatar');
      expect(avatar).toBeTruthy();
    });

    it('should apply custom backgroundColor when provided', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} backgroundColor="#FF0000" testID="avatar" />);

      const avatar = getByTestId('avatar');
      expect(avatar).toBeTruthy();
    });

    it('should render initials when no image is provided', () => {
      const userDataWithoutImage = {
        firstname: 'John',
        lastname: 'Doe',
      };

      const { getByText } = render(<Avatar data={userDataWithoutImage} />);

      expect(getByText('JD')).toBeTruthy();
    });
  });

  describe('Avatar interactions', () => {
    it('should call onPress when pressed', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(<Avatar data={mockUserData} onPress={onPressMock} testID="avatar" />);

      const avatar = getByTestId('avatar');
      fireEvent.press(avatar);

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when not provided', () => {
      const { getByTestId } = render(<Avatar data={mockUserData} testID="avatar" />);

      const avatar = getByTestId('avatar');
      fireEvent.press(avatar);

      // Should not throw error
      expect(avatar).toBeTruthy();
    });
  });

  describe('Avatar variants', () => {
    it('should render with different sizes', () => {
      const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

      sizes.forEach(size => {
        const { getByTestId } = render(<Avatar data={mockUserData} size={size} testID={`avatar-${size}`} />);

        const avatar = getByTestId(`avatar-${size}`);
        expect(avatar).toBeTruthy();
      });
    });

    it('should render with different variants', () => {
      const { getByTestId: getCircleAvatar } = render(
        <Avatar data={mockUserData} variant="circle" testID="circle-avatar" />,
      );

      const { getByTestId: getSquareAvatar } = render(
        <Avatar data={mockUserData} variant="square" testID="square-avatar" />,
      );

      expect(getCircleAvatar('circle-avatar')).toBeTruthy();
      expect(getSquareAvatar('square-avatar')).toBeTruthy();
    });
  });

  describe('Avatar touchable types', () => {
    it('should render with different touchable types', () => {
      const onPressMock = jest.fn();

      const { getByTestId: getPressableAvatar } = render(
        <Avatar data={mockUserData} onPress={onPressMock} as="Pressable" testID="pressable-avatar" />,
      );

      const { getByTestId: getTouchableOpacityAvatar } = render(
        <Avatar data={mockUserData} onPress={onPressMock} as="TouchableOpacity" testID="touchable-opacity-avatar" />,
      );

      const { getByTestId: getTouchableHighlightAvatar } = render(
        <Avatar
          data={mockUserData}
          onPress={onPressMock}
          as="TouchableHighlight"
          testID="touchable-highlight-avatar"
        />,
      );

      expect(getPressableAvatar('pressable-avatar')).toBeTruthy();
      expect(getTouchableOpacityAvatar('touchable-opacity-avatar')).toBeTruthy();
      expect(getTouchableHighlightAvatar('touchable-highlight-avatar')).toBeTruthy();
    });
  });
});
