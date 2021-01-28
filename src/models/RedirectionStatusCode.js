module.exports = class RedirectionStatusCode {
  static TRANSACTION_INITIALIZED = '00';

  static INVALID_MERCHANT_CONTRACT = '03';

  static INVALID_TRANSACTION = '12';

  static INCORRECT_FORMAT = '30';

  static FRAUD_SUSPECTED = '34';

  static DUPLICATED_TRANSACTION = '94';

  static INTERNAL_ERROR = '99';
}
