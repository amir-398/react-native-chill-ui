// Jest setup file for React Native testing

// Mock react-native-svg de manière simple
jest.mock('react-native-svg', () => 'SvgMock');

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        eas: {
          projectId: 'test-project-id',
        },
      },
    },
  },
}));
