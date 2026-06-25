import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        matches: resolve(__dirname, 'matches.html'),
        teams: resolve(__dirname, 'teams.html'),
        schedule: resolve(__dirname, 'schedule.html'),
      },
    },
  },
});