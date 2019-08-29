import {
  name,
  version
} from './package.json'

const {
  banner,
  plugins
} = require('@scola/worker/rollup')

const external = [
  '@scola/doc',
  '@scola/dom',
  '@scola/worker',
  'child_process',
  'commander',
  'find-up',
  'fs',
  'fs-extra',
  'handlebars',
  'handlebars-helpers',
  'js-beautify',
  'qs',
  'recursive-readdir',
  'source-map-support/register',
  'standard'
]

const file = 'dist/cli.cjs.js'
const input = './src/cli.js'

export default [{
  input,
  external,
  output: {
    banner: '#!/usr/bin/env node\n' +
      banner(name, version),
    file,
    format: 'cjs'
  },
  plugins
}]
