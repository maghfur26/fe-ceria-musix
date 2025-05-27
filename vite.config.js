import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/serverceriamusic-production\.up\.railway\.app\/.*$/,
            handler: 'NetworkFirst', 
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50, 
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Ceria Music',
        short_name: 'Ceria',
        description: 'A Progressive Web App for Ceria Music',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/logo192.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});