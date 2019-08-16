import commonjs from 'rollup-plugin-commonjs';
import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';

const external = [
  '@scola/doc',
  '@scola/worker',
  'child_process',
  'commander',
  'find-up',
  'fs',
  'fs-extra',
  'handlebars',
  'qs',
  'recursive-readdir',
  'source-map-support/register'
];

const file = 'dist/cli.cjs.js';
const input = './src/cli.js';

function chmod() {
  return {
    writeBundle() {
      fs.chmodSync(file, '0755');
    }
  };
}

const plugins = [
  resolve(),
  commonjs(),
  chmod()
];

export default [{
  input,
  external,
  output: {
    banner: '#!/usr/bin/env node',
    file,
    format: 'cjs'
  },
  plugins
}];
