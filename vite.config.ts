import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true // Source map generation must be turned on
  },
  plugins: [
    react({
      babel: {
        env: {
          production: {
            plugins: [
              [
                'babel-plugin-jsx-remove-data-test-id',
                { attributes: ['data-testid', 'data-test-id'] }
              ]
            ]
          }
        },
        babelrc: false,
        configFile: false
      }
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
