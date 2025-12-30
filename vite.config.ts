import { defineConfig } from 'vite';
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    // ...
  ],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 3,
          features: {
            'css-has': false
          }
        }),
        tailwindcss,
        autoprefixer,
      ],
    }
  },
  // ...
});