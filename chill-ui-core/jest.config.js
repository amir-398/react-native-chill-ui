module.exports = {
  preset: 'react-native',

  // Configuration des fichiers de test
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.expo/'],

  // Configuration des modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@components$': '<rootDir>/src/components',
    '^@constants$': '<rootDir>/src/constants',
    '^@types$': '<rootDir>/src/types',
    '^@utils$': '<rootDir>/src/utils',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/.expo/'],

  // Configuration des transformations
  transform: {
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      {
        plugins: [
          '@babel/plugin-transform-class-static-block',
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
      },
    ],
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        plugins: [
          '@babel/plugin-transform-class-static-block',
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation|react-native-reanimated|react-native-svg|react-native-css-interop|nativewind)/)',
  ],

  // Configuration de la couverture
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/index.ts',
    '!src/index.*.ts',
    '!src/**/*.types.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Configuration de l'environnement
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.js'],
  testEnvironment: 'node',

  // Variables globales
  globals: {
    __DEV__: true,
  },
};
