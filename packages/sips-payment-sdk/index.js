if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/sips-payment-sdk.min');
} else {
  module.exports = require('./dist/sips-payment-sdk');
}
