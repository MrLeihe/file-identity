import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'iife',
      name: 'FT',
      file: './build/index.iife.js',
    },
    {
      format: 'umd',
      name: 'FT',
      file: './build/index.umd.js',
    },
    {
      format: 'cjs',
      file: './build/index.js',
    },
    {
      format: 'es',
      file: './build/index.es.js',
    },
  ],
  plugins: [typescript()],
}
