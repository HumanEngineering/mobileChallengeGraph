module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"],
    /**
     * Fix: VSCode error adding new files on watch mode,
     * https://github.com/typescript-eslint/typescript-eslint/issues/864#issuecomment-523190869
     * */
    createDefaultProgram: true,
  },
  plugins: ["@veri.co/eslint-plugin-veri", "prettier"],
  extends: [
    "plugin:@veri.co/eslint-plugin-veri/node",
    "plugin:@veri.co/eslint-plugin-veri/react",
    "plugin:@veri.co/eslint-plugin-veri/react_native",
  ],
  env: {
    node: true,
  },
  rules: {
    "@veri.co/veri/ban-font-weight-literals": "off",
  },
};
