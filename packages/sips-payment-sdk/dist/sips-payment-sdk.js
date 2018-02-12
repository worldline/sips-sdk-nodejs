'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hmacSHA256 = _interopDefault(require('crypto-js/hmac-sha256'));
var sipsPaymentDom = require('sips-payment-dom');
var axios = _interopDefault(require('axios'));
var sha256 = _interopDefault(require('crypto-js/sha256'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var sortAndFilterFunctionsFromEntries = function sortAndFilterFunctionsFromEntries(entries) {
  return entries.filter(function (entry) {
    return typeof entry[1] !== 'function' && typeof entry[1] !== 'undefined' && entry[1] !== null;
  }).sort();
};

var concatenate = function concatenate(currentString, field) {
  var concatenatedString = currentString;
  var concatenateString = function concatenateString(value) {
    concatenatedString += value;
  };
  var concatenateArray = function concatenateArray(value) {
    concatenateString(value.toString().replace(/,/g, ''));
  };

  if (field instanceof Array) {
    concatenateArray(field);
  } else if (field instanceof Object) {
    sortAndFilterFunctionsFromEntries(Object.entries(field)).forEach(function (innerField) {
      concatenatedString = concatenate(concatenatedString, innerField[1]);
    });
  } else {
    concatenateString(field);
  }
  return concatenatedString;
};

var getSealStringForPaymentRequest = function getSealStringForPaymentRequest(paymentRequest) {
  var sealString = '';
  sortAndFilterFunctionsFromEntries(Object.entries(paymentRequest)).filter(function (entry) {
    return entry[0] !== 'keyVersion';
  }).forEach(function (field) {
    sealString = concatenate(sealString, field[1]);
  });
  return sealString;
};

var getSealStringForInitializationResponse = function getSealStringForInitializationResponse(initializationResponse) {
  var sealString = '';
  sortAndFilterFunctionsFromEntries(Object.entries(initializationResponse)).filter(function (entry) {
    return entry[0] !== 'seal';
  }).forEach(function (field) {
    sealString = concatenate(sealString, field[1]);
  });
  return sealString;
};

var SealCalculator = function SealCalculator() {
  classCallCheck(this, SealCalculator);
};

SealCalculator.getSealString = function (object) {
  return object instanceof sipsPaymentDom.PaymentRequest ? getSealStringForPaymentRequest(object) : getSealStringForInitializationResponse(object);
};

SealCalculator.calculateSeal = function (sealString, secretKey) {
  return hmacSHA256(sealString, secretKey).toString();
};

var numberFields = ['amount', 'captureDay'];
var dateFields = ['captureLimitData', 'transactionDateTime'];

var mapToResponseData = function mapToResponseData(values) {
  return Object.assign.apply(Object, [new sipsPaymentDom.ResponseData()].concat(values.map(function (_ref) {
    var _ref4;

    var k = _ref[0],
        v = _ref[1];

    if (numberFields.includes(k)) {
      var _ref2;

      return _ref2 = {}, _ref2[k] = Number.parseInt(v, 10), _ref2;
    } else if (dateFields.includes(k)) {
      var _ref3;

      return _ref3 = {}, _ref3[k] = Date.parse(v), _ref3;
    }
    return _ref4 = {}, _ref4[k] = v, _ref4;
  })));
};

var verifyInitializationResponse = function verifyInitializationResponse(initializationResponse, secretKey) {
  if (initializationResponse.seal !== undefined) {
    var correctSeal = SealCalculator.calculateSeal(SealCalculator.getSealString(initializationResponse), secretKey);
    if (correctSeal !== initializationResponse.seal) {
      throw new Error('Initialization response has been tampered with!');
    }
  }
};

var verifyPaypageResponse = function verifyPaypageResponse(data, seal, secretKey) {
  var correctSeal = sha256(data + secretKey).toString();
  if (correctSeal !== seal) {
    throw new Error('Paypage response has been tampered with!');
  }
};

var PaypageClient = function PaypageClient(environment, merchantId, keyVersion, secretKey) {
  var _this = this;

  classCallCheck(this, PaypageClient);

  this.initializePayment = function (paymentRequest) {
    if (!(paymentRequest instanceof sipsPaymentDom.PaymentRequest)) {
      throw new Error('Invalid parameter specified');
    }

    var requestToMake = paymentRequest;
    requestToMake.merchantId = _this.merchantId;
    requestToMake.keyVersion = _this.keyVersion;
    requestToMake.seal = SealCalculator.calculateSeal(SealCalculator.getSealString(paymentRequest), _this.secretKey);

    return axios.post(_this.environment, JSON.stringify(requestToMake), {
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      var initializationResponse = Object.assign(new sipsPaymentDom.InitializationResponse(), response.data);
      verifyInitializationResponse(initializationResponse, _this.secretKey);
      return initializationResponse;
    });
  };

  this.decodeResponse = function (data) {
    var Data = data.Data,
        Encode = data.Encode,
        InterfaceVersion = data.InterfaceVersion,
        Seal = data.Seal;

    verifyPaypageResponse(Data, Seal, _this.secretKey);
    var paypageResponse = new sipsPaymentDom.PaypageResponse();
    paypageResponse.encode = Encode;
    paypageResponse.interfaceVersion = InterfaceVersion;
    paypageResponse.seal = Seal;
    var values = Data.split('|');
    values = values.map(function (value) {
      return value.split('=', 2);
    });
    paypageResponse.data = mapToResponseData(values);
    return paypageResponse;
  };

  if (!Object.values(sipsPaymentDom.Environment).includes(environment)) {
    throw new Error('Invalid environment specified!');
  }

  if (typeof merchantId !== 'string' || merchantId.length === 0) {
    throw new Error('Invalid merchant ID specified');
  }

  if (typeof secretKey !== 'string' || secretKey.length === 0) {
    throw new Error('Invalid key specified');
  }

  this.environment = environment;
  this.merchantId = merchantId;
  this.keyVersion = keyVersion;
  this.secretKey = secretKey;
};

exports.PaypageClient = PaypageClient;
exports.SealCalculator = SealCalculator;
