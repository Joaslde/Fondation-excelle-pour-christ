// /client/postcss.config.cjs

module.exports = {
  plugins: {
    'postcss-preset-env': { // Simplement le nom du module
      stage: 3,
      features: {
        'css-has': false
      }
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};