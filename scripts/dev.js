import fs from 'fs'
import { build } from 'tsup'

const packages = fs.readdirSync('packages')
packages.forEach((pkg) => {
  build({
    entry: [`packages/${pkg}/index.ts`],
    outDir: `./packages/${pkg}/dist`,
    sourcemap: true,
    watch: [`packages/${pkg}/index.ts`, `packages/${pkg}/src/**`],
    dts: true,
    format: ['esm'],
    clean: true,
  })
})
