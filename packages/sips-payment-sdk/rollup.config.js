import babel from 'rollup-plugin-babel';

const config = [{
  input: 'src/index.js',
  output: {
    file: 'dist/sips-payment-sdk.js',
    format: 'cjs',
  },
  external: ['axios', '@worldline/sips-payment-dom'],
  plugins: [
   babel(),
  ],
}];

export default config;
