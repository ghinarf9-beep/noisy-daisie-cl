import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        matches: resolve(__dirname, 'matches.html'),
        teams: resolve(__dirname, 'teams.html'),
        schedule: resolve(__dirname, 'schedule.html'),
      },
    },
  },
})