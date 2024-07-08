import { resolve } from 'path'
import { defineConfig } from 'vite'

const opts = {
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        a0: resolve(__dirname, 'pages/articles/index.html'),
        a1: resolve(__dirname, 'pages/articles/explaining_this_site.html'),
        a2: resolve(__dirname, 'pages/articles/how_to_make_modals.html'),
        a3: resolve(__dirname, 'pages/articles/postgres_cheat_sheet.html'),
        a4: resolve(__dirname, 'pages/articles/reverse_linked_list.html'),
        a5: resolve(__dirname, 'pages/articles/stop_controlling_react_forms.html'),
        a6: resolve(__dirname, 'pages/articles/understanding_data_layers.html'),
        a7: resolve(__dirname, 'pages/articles/getting_started_numpy.html'),
      },
    },
  },
};

export default defineConfig(opts)