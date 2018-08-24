const chalk = require('chalk');
const { rollup } = require('rollup');
const rimraf = require('rimraf');
const path = require('path');


rollup main.js --o bundle.js --f cjs
