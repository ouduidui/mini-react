/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'react/': `${path.resolve(__dirname, 'packages/react/src')}/`,
      'react-dom/': `${path.resolve(__dirname, 'packages/react-dom/src')}/`,
      'shared/': `${path.resolve(__dirname, 'packages/react/src')}/`,
      'react-reconciler/': `${path.resolve(__dirname, 'packages/react-reconciler/src')}/`,
    },
  },
})
