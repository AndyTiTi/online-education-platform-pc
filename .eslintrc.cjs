module.exports = {
  root: true,
  extends: [
    require.resolve('eslint-config-airbnb'),
    require.resolve('eslint-config-airbnb/hooks'),
    require.resolve('eslint-config-airbnb-typescript'),
  ],
  rules: {
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'react-hooks/exhaustive-deps': 1,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'linebreak-style': [0, 'error', 'windows'], // Expected linebreaks to be 'LF' but found 'CRLF'.
  },
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
