module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', 'import', '@typescript-eslint', 'react-hooks'],
  parserOptions: {
    parser: ['@babel/eslint-parser', '@typescript-eslint/parser'],
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      'off',
      { namedComponents: ['arrow-function', 'function-expression'] },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-no-useless-fragment': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-empty-function': 'off',
    'no-alert': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
