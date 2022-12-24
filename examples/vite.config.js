import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      __LOG__: true,
      preventAssignment: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'react',
        replacement: path.resolve(__dirname, '../packages/react/dist'),
      },
      {
        find: 'react-dom',
        replacement: path.resolve(__dirname, '../packages/react-dom/dist'),
      },
    ],
  },
  optimizeDeps: {
    // force: true
    exclude: ['react', 'react-dom'],
  },
})
