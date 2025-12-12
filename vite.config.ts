import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
  ],
  server: {
    allowedHosts: [
      "1993f743c802.ngrok-free.app"
    ]
  }
})
