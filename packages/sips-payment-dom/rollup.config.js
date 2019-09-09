import babel from 'rollup-plugin-babel';

const config = [{
  input: 'src/index.js',
  output: {
    file: 'dist/sips-payment-dom.js',
    format: 'cjs',
  },
  plugins: [
    babel(),
  ],
}];

export default config;
