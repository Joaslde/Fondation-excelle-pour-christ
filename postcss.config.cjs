// /postcss.config.cjs

// Importation du module 'path' pour la gestion des chemins, 
// ET require.resolve pour s'assurer que PostCSS trouve le plugin.
const path = require('path');

module.exports = {
  plugins: {
    // 1. On utilise require.resolve() pour obtenir le chemin absolu du module.
    // L'objet [chemin résolu] est utilisé comme clé du plugin.
    [require.resolve('postcss-preset-env', { paths: [__dirname] })]: {
      stage: 3,
      features: {
        'css-has': false
      }
    },
    // 2. Les autres plugins restent
    tailwindcss: {},
    autoprefixer: {},
  },
};