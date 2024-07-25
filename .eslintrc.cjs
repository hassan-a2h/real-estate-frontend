module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX support
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    indent: ['error', 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'], // Include JSX files for specific rules
      rules: {
        indent: ['error', 2],
      },
    },
  ],
  fix: true, // Enable auto-fixing
};

