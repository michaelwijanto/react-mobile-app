module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 0,
      features: {
        "nesting-rules": true,
      },
    },
  },
};
