/* eslint-env jest */
// Jest setup file for React Native testing

// Mock react-native-svg de manière simple
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

// Mock React Native Switch component
jest.mock('react-native/Libraries/Components/Switch/Switch', () => ({
  __esModule: true,
  default: 'Switch',
}));
