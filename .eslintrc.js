module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'no-undef': 0,
    'react/self-closing-comp': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'max-classes-per-file': ['error', { ignoreExpressions: true, max: 2 }],
  },
};
