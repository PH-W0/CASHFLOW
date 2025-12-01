/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // auto update service worker
      includeAssets: ['favicon.svg', 'logo192.png', 'logo512.png'], // static assets to cache
      manifest: {
        name: 'Ionic App',          // full name of your app
        short_name: 'My Ionic App',            // short name for home screen
        start_url: '/',                     // start page when app is launched
        display: 'standalone',              // makes it look like a native app
        background_color: '#ffffff',        // splash screen background
        theme_color: '#3880ff',             // toolbar color
        icons: [
          { src: 'logo192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        // prevent caching Firebase API calls (dynamic data)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/,
            handler: 'NetworkOnly'
          },
          {
            urlPattern: /^https:\/\/www.googleapis.com\/.*/,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
});
