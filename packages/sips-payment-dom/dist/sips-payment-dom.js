'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AcquirerResponseCode = function AcquirerResponseCode() {
  classCallCheck(this, AcquirerResponseCode);
};

AcquirerResponseCode.TRANSACTION_SUCCESS = '00';
AcquirerResponseCode.CONTACT_ISSUER = '02';
AcquirerResponseCode.INVALID_ACCEPTOR = '03';
AcquirerResponseCode.KEEP_PAYMENT_MEAN = '04';
AcquirerResponseCode.DO_NOT_HONOUR = '05';
AcquirerResponseCode.KEEP_PAYMENT_MEAN_UNDER_CONDITION = '07';
AcquirerResponseCode.APPROVE_AFTER_IDENTIFICATION = '08';
AcquirerResponseCode.INVALID_TRANSACTION = '12';
AcquirerResponseCode.INVALID_AMOUNT = '13';
AcquirerResponseCode.INVALID_PAN = '14';
AcquirerResponseCode.UNKNOWN_ISSUER = '15';
AcquirerResponseCode.CUSTOMER_CANCELLATION = '17';
AcquirerResponseCode.NOT_AUTHORIZED = '24';
AcquirerResponseCode.TRANSACTION_NOT_FOUND = '25';
AcquirerResponseCode.INVALID_FORMAT = '30';
AcquirerResponseCode.UNKNOWN_ACQUIRER_ID = '31';
AcquirerResponseCode.PAYMENT_MEAN_EXPIRED = '33';
AcquirerResponseCode.FRAUD_SUSPECTED = '34';
AcquirerResponseCode.NOT_SUPPORTED = '40';
AcquirerResponseCode.PAYMENT_MEAN_LOST = '41';
AcquirerResponseCode.PAYMENT_MEAN_STOLEN = '43';
AcquirerResponseCode.CREDIT_UNAVAILABLE = '51';
AcquirerResponseCode.PAYMENT_MEAN_MISSING = '56';
AcquirerResponseCode.TRANSACTION_UNAUTHORIZED = '57';
AcquirerResponseCode.TRANSACTION_FORBIDDEN = '58';
AcquirerResponseCode.CONTACT_ACQUIRER = '60';
AcquirerResponseCode.EXCEEDED_AMOUNT_LIMIT = '61';
AcquirerResponseCode.AWAITING_PAYMENT_CONFIRMATION = '62';
AcquirerResponseCode.NOT_SECURITY_COMPLIANT = '63';
AcquirerResponseCode.DAILY_TRANSACTION_LIMIT_EXCEEDED = '65';
AcquirerResponseCode.MISSING_RESPONSE = '68';
AcquirerResponseCode.MAX_ATTEMPTS_REACHED = '75';
AcquirerResponseCode.TERMINAL_UNKNOWN = '87';
AcquirerResponseCode.SYSTEM_STOPPED = '90';
AcquirerResponseCode.ISSUER_INACCESSIBLE = '91';
AcquirerResponseCode.INCOMPLETE_TRANSACTION_INFO = '92';
AcquirerResponseCode.DUPLICATE_TRANSACTION = '94';
AcquirerResponseCode.SYSTEM_MALFUNCTION = '96';
AcquirerResponseCode.TIMEFRAME_EXCEEDED = '97';
AcquirerResponseCode.SERVER_UNAVAILABLE = '98';
AcquirerResponseCode.INITIATOR_DOMAIN_INCIDENT = '99';

var Address = function Address() {
  classCallCheck(this, Address);
};

var CaptureMode = function CaptureMode() {
  classCallCheck(this, CaptureMode);
};

CaptureMode.AUTHOR_CAPTURE = 'AUTHOR_CAPTURE';
CaptureMode.IMMEDIATE = 'IMMEDIATE';
CaptureMode.VALIDATION = 'VALIDATION';

var CardCSCResultCode = function CardCSCResultCode() {
  classCallCheck(this, CardCSCResultCode);
};

CardCSCResultCode.INCORRECT_CRYPTOGRAM = '4E';
CardCSCResultCode.CORRECT_CRYPTOGRAM = '4D';
CardCSCResultCode.CRYPTOGRAM_NOT_PROCESSED = '50';
CardCSCResultCode.CRYPTOGRAM_MISSING = '53';
CardCSCResultCode.COULD_NOT_PREFORM = '55';

var Contact = function Contact() {
  classCallCheck(this, Contact);
};

var Currency = function Currency() {
  classCallCheck(this, Currency);
};

Currency.ARS = '032';
Currency.AUD = '036';
Currency.BHD = '048';
Currency.KHR = '116';
Currency.CAD = '124';
Currency.LKR = '144';
Currency.CNY = '156';
Currency.HRK = '191';
Currency.CZK = '203';
Currency.DKK = '208';
Currency.HKD = '344';
Currency.HUF = '348';
Currency.ISK = '352';
Currency.INR = '356';
Currency.ILS = '376';
Currency.JPY = '392';
Currency.KRW = '410';
Currency.KWD = '414';
Currency.MYR = '458';
Currency.MUR = '480';
Currency.MXN = '484';
Currency.NPR = '524';
Currency.NZD = '554';
Currency.NOK = '578';
Currency.QAR = '634';
Currency.RUB = '643';
Currency.SAR = '682';
Currency.SGD = '702';
Currency.ZAR = '710';
Currency.SEK = '752';
Currency.CHF = '756';
Currency.THB = '764';
Currency.AED = '784';
Currency.TND = '788';
Currency.GBP = '826';
Currency.USD = '840';
Currency.TWD = '901';
Currency.RON = '946';
Currency.TRY = '949';
Currency.XOF = '952';
Currency.XPF = '953';
Currency.BGN = '975';
Currency.EUR = '978';
Currency.UAH = '980';
Currency.PLN = '985';
Currency.BRL = '986';

var CustomerAddress = function (_Address) {
  inherits(CustomerAddress, _Address);

  function CustomerAddress() {
    classCallCheck(this, CustomerAddress);
    return possibleConstructorReturn(this, _Address.apply(this, arguments));
  }

  return CustomerAddress;
}(Address);

var CustomerContact = function (_Contact) {
  inherits(CustomerContact, _Contact);

  function CustomerContact() {
    classCallCheck(this, CustomerContact);
    return possibleConstructorReturn(this, _Contact.apply(this, arguments));
  }

  return CustomerContact;
}(Contact);

var Environment = function Environment() {
  classCallCheck(this, Environment);
};

Environment.SIMU = 'https://payment-webinit.simu.sips-atos.com/rs-services/v2/paymentInit';
Environment.TEST = 'https://payment-webinit.test.sips-atos.com/rs-services/v2/paymentInit';
Environment.PROD = 'https://payment-webinit.sips-atos.com/rs-services/v2/paymentInit';

var GuaranteeIndicator = function GuaranteeIndicator() {
  classCallCheck(this, GuaranteeIndicator);
};

GuaranteeIndicator.Y = 'Y';
GuaranteeIndicator.N = 'N';
GuaranteeIndicator.U = 'U';

var HolderAuthentMethod = function HolderAuthentMethod() {
  classCallCheck(this, HolderAuthentMethod);
};

HolderAuthentMethod.NO_AUTHENT = 'NO_AUTHENT';
HolderAuthentMethod.NO_AUTHENT_METHOD = 'NO_AUTHENT_METHOD';
HolderAuthentMethod.OTP_HARDWARE = 'OTP_HARDWARE';
HolderAuthentMethod.OTP_SOFTWARE = 'OTP_SOFTWARE';
HolderAuthentMethod.OTP_TELE = 'OTP_TELE';
HolderAuthentMethod.PASSWORD = 'PASSWORD';

var HolderAuthentProgram = function HolderAuthentProgram() {
  classCallCheck(this, HolderAuthentProgram);
};

HolderAuthentProgram.ONE_EUROCOM = '1EUROCOM';
HolderAuthentProgram.THREE_DS = '3DS';
HolderAuthentProgram.ARP = 'ARP';
HolderAuthentProgram.BCMCMOBILE = 'BCMCMOBILE';
HolderAuthentProgram.MASTERPASS = 'MASTERPASS';

var HolderAuthentStatus = function HolderAuthentStatus() {
  classCallCheck(this, HolderAuthentStatus);
};

HolderAuthentStatus.ATTEMPT = 'ATTEMPT';
HolderAuthentStatus.THREE_D_ATTEMPT = '3D_ATTEMPT';
HolderAuthentStatus.BYPASS = 'BYPASS';
HolderAuthentStatus.THREE_D_BYPASS = '3D_BYPASS';
HolderAuthentStatus.CANCEL = 'CANCEL';
HolderAuthentStatus.THREE_D_ABORT = '3D_ABORT';
HolderAuthentStatus.ERROR = 'ERROR';
HolderAuthentStatus.THREE_D_ERROR = '3D_ERROR';
HolderAuthentStatus.FAILURE = 'FAILURE';
HolderAuthentStatus.THREE_D_FAILURE = '3D_FAILURE';
HolderAuthentStatus.NO_AUTHENT = 'NO_AUTHENT';
HolderAuthentStatus.SSL = 'SSL';
HolderAuthentStatus.NOT_ENROLLED = 'NOT_ENROLLED';
HolderAuthentStatus.THREE_D_NOTENROLLED = '3D_NOTENROLLED';
HolderAuthentStatus.NOT_PARTICIPATING = 'NOT_PARTICIPATING';
HolderAuthentStatus.SUCCESS = 'SUCCESS';
HolderAuthentStatus.THREE_D_SUCCESS = '3D_SUCCESS';

var InitializationResponse = function InitializationResponse() {
  classCallCheck(this, InitializationResponse);
};

var OrderChannel = function OrderChannel() {
  classCallCheck(this, OrderChannel);
};

OrderChannel.INAPP = 'INAPP';
OrderChannel.INTERNET = 'INTERNET';
OrderChannel.MOTO = 'MOTO';

var PanEntryMode = function PanEntryMode() {
  classCallCheck(this, PanEntryMode);
};

PanEntryMode.MANUAL = 'MANUAL';
PanEntryMode.VIRTUAL = 'VIRTUAL';
PanEntryMode.WALLET = 'WALLET';

var PaymentMeanBrand = function PaymentMeanBrand() {
  classCallCheck(this, PaymentMeanBrand);
};

PaymentMeanBrand.AMEX = 'AMEX';
PaymentMeanBrand.BCMC = 'BCMC';
PaymentMeanBrand.CBCONLINE = 'CBCONLINE';
PaymentMeanBrand.ELV = 'ELV';
PaymentMeanBrand.IDEAL = 'IDEAL';
PaymentMeanBrand.IGNHOMEPAY = 'IGNHOMEPAY';
PaymentMeanBrand.KBCONLINE = 'KBCONLINE';
PaymentMeanBrand.MAESTRO = 'MAESTRO';
PaymentMeanBrand.MASTERCARD = 'MASTERCARD';
PaymentMeanBrand.MASTERPASS = 'MASTERPASS';
PaymentMeanBrand.PAYPAL = 'PAYPAL';
PaymentMeanBrand.PAYTRAIL = 'PAYTRAIL';
PaymentMeanBrand.SOFORTUBERWEISUNG = 'SOFORTUBERWEISUNG';
PaymentMeanBrand.VISA = 'VISA';
PaymentMeanBrand.VPAY = 'VPAY';

var PaymentMeanType = function PaymentMeanType() {
  classCallCheck(this, PaymentMeanType);
};

PaymentMeanType.CARD = 'CARD';
PaymentMeanType.CREDIT_TRANSFER = 'CREDIT_TRANSFER';
PaymentMeanType.DIRECT_DEBIT = 'DIRECT_DEBIT';

var PaymentPattern = function PaymentPattern() {
  classCallCheck(this, PaymentPattern);
};

PaymentPattern.ONE_SHOT = 'ONE_SHOT';
PaymentPattern.RECURRING_1 = 'RECURRING_1';
PaymentPattern.RECURRING_N = 'RECURRING_N';
PaymentPattern.INSTALMENT = 'INSTALMENT';

var INTERFACE_VERSION = 'IR_WS_2.19';

var PaymentRequest = function PaymentRequest() {
  classCallCheck(this, PaymentRequest);
  this.interfaceVersion = INTERFACE_VERSION;
};

var PaypageData = function PaypageData() {
  classCallCheck(this, PaypageData);
};

var PaypageResponse = function PaypageResponse() {
  classCallCheck(this, PaypageResponse);
};

var RedirectionStatusCode = function RedirectionStatusCode() {
  classCallCheck(this, RedirectionStatusCode);
};

RedirectionStatusCode.TRANSACTION_INITIALIZED = '00';
RedirectionStatusCode.INVALID_MERCHANT_CONTRACT = '03';
RedirectionStatusCode.INVALID_TRANSACTION = '12';
RedirectionStatusCode.INCORRECT_FORMAT = '30';
RedirectionStatusCode.FRAUD_SUSPECTED = '34';
RedirectionStatusCode.DUPLICATED_TRANSACTION = '94';
RedirectionStatusCode.INTERNAL_ERROR = '99';

var ResponseCode = function ResponseCode() {
  classCallCheck(this, ResponseCode);
};

ResponseCode.ACCEPTED = '00';
ResponseCode.CARD_CEILING_EXCEEDED = '02';
ResponseCode.INVALID_MERCHANT_CONTRACT = '03';
ResponseCode.AUTHORIZATION_REFUSED = '05';
ResponseCode.PAN_BLOCKED = '11';
ResponseCode.INVALID_TRANSACTION = '12';
ResponseCode.INVALID_DATA = '14';
ResponseCode.CUSTOMER_CANCELLATION = '17';
ResponseCode.INCORRECT_FORMAT = '30';
ResponseCode.FRAUD_SUSPECTED = '34';
ResponseCode.PAYMENT_MEAN_EXPIRED = '54';
ResponseCode.MAX_ATTEMPTS_REACHED = '75';
ResponseCode.SERVICE_UNAVAILABLE = '90';
ResponseCode.DUPLICATED_TRANSACTION = '94';
ResponseCode.TIMEFRAME_EXCEEDED = '97';
ResponseCode.INTERNAL_ERROR = '99';

var ResponseData = function ResponseData() {
  classCallCheck(this, ResponseData);
};

var RuleResult = function RuleResult() {
  classCallCheck(this, RuleResult);
};

var RuleResultIndicator = function RuleResultIndicator() {
  classCallCheck(this, RuleResultIndicator);
};

RuleResultIndicator.B = 'B';
RuleResultIndicator.D = 'D';
RuleResultIndicator.E = 'E';
RuleResultIndicator.N = 'N';
RuleResultIndicator.P = 'P';
RuleResultIndicator.U = 'U';
RuleResultIndicator.X = 'X';
RuleResultIndicator.ZERO = '0';

var RuleSetting = function RuleSetting() {
  classCallCheck(this, RuleSetting);
};

RuleSetting.D = 'D';
RuleSetting.I = 'I';
RuleSetting.N = 'N';
RuleSetting.S = 'S';

var RuleType = function RuleType() {
  classCallCheck(this, RuleType);
};

RuleType.G = 'G';
RuleType.N = 'N';

var ScoreColor = function ScoreColor() {
  classCallCheck(this, ScoreColor);
};

ScoreColor.BLACK = 'BLACK';
ScoreColor.GREEN = 'GREEN';
ScoreColor.ORANGE = 'ORANGE';
ScoreColor.RED = 'RED';
ScoreColor.WHITE = 'WHITE';

var WalletType = function WalletType() {
  classCallCheck(this, WalletType);
};

WalletType.BCMCMOBILE = 'BCMCMOBILE';
WalletType.MASTERPASS = 'MASTERPASS';
WalletType.MERCHANT_WALLET = 'MERCHANT_WALLET';
WalletType.PAYLIB = 'PAYLIB';

exports.AcquirerResponseCode = AcquirerResponseCode;
exports.Address = Address;
exports.CaptureMode = CaptureMode;
exports.CardCSCResultCode = CardCSCResultCode;
exports.Contact = Contact;
exports.Currency = Currency;
exports.CustomerAddress = CustomerAddress;
exports.CustomerContact = CustomerContact;
exports.Environment = Environment;
exports.GuaranteeIndicator = GuaranteeIndicator;
exports.HolderAuthentMethod = HolderAuthentMethod;
exports.HolderAuthentProgram = HolderAuthentProgram;
exports.HolderAuthentStatus = HolderAuthentStatus;
exports.InitializationResponse = InitializationResponse;
exports.OrderChannel = OrderChannel;
exports.PanEntryMode = PanEntryMode;
exports.PaymentMeanBrand = PaymentMeanBrand;
exports.PaymentMeanType = PaymentMeanType;
exports.PaymentPattern = PaymentPattern;
exports.PaymentRequest = PaymentRequest;
exports.PaypageData = PaypageData;
exports.PaypageResponse = PaypageResponse;
exports.RedirectionStatusCode = RedirectionStatusCode;
exports.ResponseCode = ResponseCode;
exports.ResponseData = ResponseData;
exports.RuleResult = RuleResult;
exports.RuleResultIndicator = RuleResultIndicator;
exports.RuleSetting = RuleSetting;
exports.RuleType = RuleType;
exports.ScoreColor = ScoreColor;
exports.WalletType = WalletType;
