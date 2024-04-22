import react from '@vitejs/plugin-react'
import removeTestIdAttribute from 'rollup-plugin-jsx-remove-attributes'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true // Source map generation must be turned on
  },
  plugins: [
    react(),
    removeTestIdAttribute({
      include: [/\.[tj]sx$/], //default
      exclude: ['**/node_modules/**'], // default
      attributes: ['data-testid', 'data-test-id'], // remove test attributes from jsx
      usage: 'vite' // Must specify 'vite'
    }),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    watch: false,
    coverage: {
      all: false,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    setupFiles: './tests/setup.js'
  },
  publicDir: 'public',
  resolve: {
    alias: {
      src: '/src'
    }
  }
})
