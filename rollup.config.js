import commonjs from '@rollup/plugin-commonjs';

const config = [{
  input: 'src/index.js',
  output: {
    file: 'dist/sips-payment-sdk.js',
    format: 'cjs',
  },
  external: ['axios', 'crypto'],
  plugins: [
   commonjs(),
  ],
}];

export default config;
