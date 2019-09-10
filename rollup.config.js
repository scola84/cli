const { exec } = require('child_process')
const plugins = require('@scola/worker/rollup.plugins')

const finish = {
  writeBundle: () => exec([
    'sed -i \'1i #!/usr/bin/env node\\n\' -i dist/cli.cjs.js',
    'chmod 0755 dist/cli.cjs.js'
  ].join(' && '))
}

const external = [
  '@scola/doc',
  '@scola/dom',
  '@scola/worker',
  'child_process',
  'commander',
  'find-up',
  'fs',
  'fs-extra',
  'glob',
  'handlebars',
  'handlebars-helpers',
  'js-beautify',
  'path',
  'qs',
  'recursive-readdir',
  'source-map-support/register',
  'standard'
]

const file = 'dist/cli.cjs.js'
const input = './index.js'

export default [{
  input,
  external,
  output: {
    file,
    format: 'cjs'
  },
  plugins: [
    ...plugins,
    finish
  ]
}]
