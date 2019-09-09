module.exports = {
  extends: ["eslint:recommended","plugin:node/recommended"],
  parser: "babel-eslint",
  rules: {
    "node/no-unsupported-features/es-syntax": "off",
  },
  env: {
    node: true,
  }
};
