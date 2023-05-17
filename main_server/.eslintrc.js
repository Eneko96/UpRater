module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  paths: {
    "@app/*": [
      "src/modules/app/*"
    ],
    "@comment/*": [
      "src/modules/comment/*"
    ],
    "@profile/*": [
      "src/modules/profile/*"
    ],
    "@rate/*": [
      "src/modules/rate/*"
    ],
    "@users/*": [
      "src/modules/users/*"
    ],
    "@lib/*": [
      "src/lib/*"
    ],
    "@__tests__/*": [
      "src/__tests__/*"
    ],
  }
};
