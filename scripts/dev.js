import { build } from 'tsup'

(async() => {
  ['react-reconciler', 'react-noop-renderer', 'react-dom', 'react'].forEach(async(pkg) => {
    await build({
      entry: [`packages/${pkg}/index.ts`],
      external: ['packages/shared/index.ts'],
      outDir: `./packages/${pkg}/dist`,
      sourcemap: true,
      watch: [`packages/${pkg}/index.ts`, `packages/${pkg}/src/**`],
      minify: true,
      dts: true,
      format: ['esm'],
      clean: true,
    })
  })
})()
