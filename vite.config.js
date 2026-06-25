import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind is restored!
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.png'], 
      devOptions: {
        enabled: true 
      },
      manifest: {
        name: 'Creative Cut Co. Studio',
        short_name: 'CCC',
        description: 'Cinematic Motion & Design Portfolio',
        theme_color: '#0E0D0B',
        background_color: '#0E0D0B',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})