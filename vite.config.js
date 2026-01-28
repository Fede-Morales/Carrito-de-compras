import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Usaremos el plugin nativo de Vite

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Esto reemplaza la necesidad de configurar PostCSS manualmente
  ],
})