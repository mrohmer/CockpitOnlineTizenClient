import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import define from 'rollup-plugin-define';


export default {
  input: './src/index.ts',
  output: {
    dir: './tizen/build',
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    getBabelOutputPlugin({
      presets: ['@babel/preset-react', '@babel/preset-env']
    }),

    define({
      replacements: {
        'process.env': '{}',
      }
    }),
    terser(),
  ]
}
