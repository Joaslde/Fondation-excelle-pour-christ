// /opt/render/project/src/vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path'; // S'assurer que 'path' est importé

export default defineConfig({
  plugins: [
    // ...
  ],
  css: {
    postcss: {
      // AJOUTER L'OPTION 'plugins' ICI
      plugins: [
        require('postcss-preset-env')({
          stage: 3,
          features: {
            'css-has': false
          }
        }),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
      // ET SURTOUT, DEFINIR LE CHEMIN DE RECHERCHE DU MODULE
      // Ceci force PostCSS à chercher les modules à la racine
      config: {
        path: path.resolve(__dirname, 'postcss.config.cjs'),
        ctx: {
          // Utilise le dossier racine comme point de départ pour la recherche
          // des plugins si besoin, mais surtout, cela force l'initialisation.
        }
      }
    }
  },
  // ...
});