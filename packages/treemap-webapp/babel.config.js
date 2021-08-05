module.exports = {
  presets: ["@expo/next-adapter/babel"],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-syntax-async-generators"
  ],
};
