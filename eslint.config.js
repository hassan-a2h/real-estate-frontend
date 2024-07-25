import globals from "globals"; // Assuming you have a module providing browser globals

export default {
  // Move parserOptions to languageOptions
  languageOptions: {
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  // ... other ESLint configuration options (extends, rules, overrides, fix)
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    indent: ['error', 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        indent: ['error', 2],
      },
    },
  ],
  fix: true, // Enable auto-fixing (optional)
};
