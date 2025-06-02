import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://smartchat-ai-assistant-server.onrender.com', // your backend server
        changeOrigin: true
      }
    }
  }
});