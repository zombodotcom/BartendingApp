// vite.config.js
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  test: {
    globals: true, // Use global test APIs like describe, it, expect
    environment: 'jsdom', // Simulate a browser-like environment
    setupFiles: './src/setupTests.js', // Optional: Setup file for initializing tests
    coverage: {
      provider: 'istanbul', // Coverage provider
      reporter: ['text', 'json', 'html'], // Coverage reports
      exclude: ['node_modules/', 'src/main.jsx'], // Files to exclude from coverage
    },
  },
});
