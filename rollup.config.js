import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import fs from 'fs'
import resolve from 'rollup-plugin-node-resolve'

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

function chmod () {
  return {
    writeBundle () {
      fs.chmodSync(file, '0755')
    }
  }
}

const plugins = [
  resolve(),
  commonjs(),
  babel({
    plugins: [
      ['@babel/plugin-transform-runtime', {
        helpers: false
      }]
    ],
    presets: [
      ['@babel/preset-env']
    ]
  }),
  chmod()
]

export default [{
  input,
  external,
  output: {
    banner: '#!/usr/bin/env node',
    file,
    format: 'cjs'
  },
  plugins
}]
