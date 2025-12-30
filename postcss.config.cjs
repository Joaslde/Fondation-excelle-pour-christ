// postcss.config.cjs
module.exports = {
  plugins: {
    // 1. Assurez-vous que postcss-preset-env est le premier
    // Il gère les fonctionnalités CSS futures (comme la syntaxe 'from hsl')
    'postcss-preset-env': {
      stage: 3, // Supporte les spécifications W3C stables
      features: {
        'css-has': false // Optionnel, si vous avez des conflits avec :has()
      }
    },
    // 2. Les plugins classiques de Tailwind et Autoprefixer suivent
    tailwindcss: {},
    autoprefixer: {},
  },
};