import path from 'path'
import fs from 'fs'
import { build } from 'tsup'
import inquirer from 'inquirer'
import { execa } from 'execa'

async function buildPackages() {
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
}

const EXAMPLES_DIR = './examples'

async function main() {
  const examples = fs.readdirSync(EXAMPLES_DIR).filter((name) => {
    return fs.statSync(path.join(EXAMPLES_DIR, name)).isDirectory()
  })

  const { example } = await inquirer.prompt<{ example: string }>([{
    type: 'list',
    name: 'example',
    message: 'please choose the example:',
    choices: examples.map(k => ({ name: k, value: k })),
  }])

  buildPackages()
  try {
    //
    execa('vite',
      ['serve', `examples/${example}`, '--config', 'examples/vite.config.js', '--force'],
    ).stdout.pipe(process.stdout)
  }
  catch (e) {}
}

main()
