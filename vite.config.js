import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),         // Plugin para Vue 3
    tailwindcss(), // Plugin para Tailwind CSS con Vite
  ],
})
