if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/sips-payment-dom.min');
} else {
  module.exports = require('./dist/sips-payment-dom');
}
