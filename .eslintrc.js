// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['airbnb', 'expo', 'prettier', 'plugin:storybook/recommended'],
  ignorePatterns: [
    '/dist/*',
    '/node_modules/*',
    '/android/*',
    '/ios/*',
    '/coverage/*',
    '**/__tests__/**',
    '**/*.test.*',
    '**/*.spec.*',
  ],
  plugins: ['prettier', 'perfectionist', 'unused-imports'],
  root: true,

  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    camelcase: 'off',
    'global-require': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        json: 'always',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'perfectionist/sort-imports': ['error'],
    'perfectionist/sort-interfaces': ['error'],
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'alphabetical',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': [
      'error',
      {
        functions: 'ignore',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    perfectionist: {
      partitionByComment: true,
      type: 'line-length',
    },
  },
};
