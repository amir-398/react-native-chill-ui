// Jest setup file for React Native testing

// Mock react-native-svg de manière simple
// eslint-disable-next-line
jest.mock('react-native-svg', () => 'SvgMock');

// Mock expo-constants
// eslint-disable-next-line
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
