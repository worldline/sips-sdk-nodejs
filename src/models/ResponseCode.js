module.exports = class ResponseCode {
  static ACCEPTED = '00';

  static CARD_CEILING_EXCEEDED = '02';

  static INVALID_MERCHANT_CONTRACT = '03';

  static AUTHORIZATION_REFUSED = '05';

  static PAN_BLOCKED = '11';

  static INVALID_TRANSACTION = '12';

  static INVALID_DATA = '14';

  static CUSTOMER_CANCELLATION = '17';

  static INCORRECT_FORMAT = '30';

  static FRAUD_SUSPECTED = '34';

  static PAYMENT_MEAN_EXPIRED = '54';

  static MAX_ATTEMPTS_REACHED = '75';

  static SERVICE_UNAVAILABLE = '90';

  static DUPLICATED_TRANSACTION = '94';

  static TIMEFRAME_EXCEEDED = '97';

  static INTERNAL_ERROR = '99';
};
