import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const config = [{
  input: 'src/index.js',
  output: {
    file: 'dist/sips-payment-sdk.js',
    format: 'cjs',
  },
  external: ['axios', 'crypto-js/sha256', 'crypto-js/hmac-sha256', 'sips-payment-dom'],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: ['../../node_modules', '../'],
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      babelrc: false,
      presets: [
        ['env', {
          modules: false,
          loose: true,
        }],
      ],
      plugins: ['external-helpers', 'transform-class-properties'],
    }),
  ],
}, {
  input: 'dist/sips-payment-sdk.js',
  output: {
    file: 'dist/sips-payment-sdk.min.js',
    format: 'cjs',
  },
  plugins: [
    uglify(),
  ],
}];

export default config;
