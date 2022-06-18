/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'react/': `${path.resolve(__dirname, 'packages/react')}/`,
      'react-dom/': `${path.resolve(__dirname, 'packages/react-dom')}/`,
      'shared/': `${path.resolve(__dirname, 'packages/react')}/`,
      'react-reconciler/': `${path.resolve(__dirname, 'packages/react-reconciler')}/`,
    },
  },
})
