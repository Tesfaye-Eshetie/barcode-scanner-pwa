import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  base: "/barcode-scanner-pwa/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/barcode-scanner-pwa/",
        name: "Barcode Reader React PWA",
        short_name: "Barcode Reader",
        description: "React Barcode Reader",
        icons: [
          {
            src: "images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
