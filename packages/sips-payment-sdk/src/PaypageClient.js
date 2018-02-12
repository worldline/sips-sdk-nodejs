import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import { PaymentRequest, InitializationResponse, Environment, PaypageResponse, ResponseData } from 'sips-payment-dom';
import SealCalculator from './SealCalculator';

const numberFields = ['amount', 'captureDay'];
const dateFields = ['captureLimitData', 'transactionDateTime'];

const mapToResponseData = values => Object.assign(new ResponseData(), ...values.map(([k, v]) => {
  if (numberFields.includes(k)) {
    return { [k]: Number.parseInt(v, 10) };
  } else if (dateFields.includes(k)) {
    return { [k]: Date.parse(v) };
  }
  return { [k]: v };
}));

const verifyInitializationResponse = (initializationResponse, secretKey) => {
  if (initializationResponse.seal !== undefined) {
    const correctSeal =
      SealCalculator.calculateSeal(SealCalculator.getSealString(initializationResponse), secretKey);
    if (correctSeal !== initializationResponse.seal) {
      throw new Error('Initialization response has been tampered with!');
    }
  }
};

const verifyPaypageResponse = (data, seal, secretKey) => {
  const correctSeal = sha256(data + secretKey).toString();
  if (correctSeal !== seal) {
    throw new Error('Paypage response has been tampered with!');
  }
};

export default class PaypageClient {
  environment;
  keyVersion;
  merchantId;
  secretKey;

  constructor(environment, merchantId, keyVersion, secretKey) {
    if (!Object.values(Environment).includes(environment)) {
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
  }

  initializePayment = (paymentRequest) => {
    if (!(paymentRequest instanceof PaymentRequest)) {
      throw new Error('Invalid parameter specified');
    }

    const requestToMake = paymentRequest;
    requestToMake.merchantId = this.merchantId;
    requestToMake.keyVersion = this.keyVersion;
    requestToMake.seal =
      SealCalculator.calculateSeal(SealCalculator.getSealString(paymentRequest), this.secretKey);

    return axios.post(this.environment, JSON.stringify(requestToMake), {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      const initializationResponse = Object.assign(new InitializationResponse(), response.data);
      verifyInitializationResponse(initializationResponse, this.secretKey);
      return initializationResponse;
    });
  };

  decodeResponse = (data) => {
    const {
      Data, Encode, InterfaceVersion, Seal,
    } = data;
    verifyPaypageResponse(Data, Seal, this.secretKey);
    const paypageResponse = new PaypageResponse();
    paypageResponse.encode = Encode;
    paypageResponse.interfaceVersion = InterfaceVersion;
    paypageResponse.seal = Seal;
    let values = Data.split('|');
    values = values.map(value => value.split('=', 2));
    paypageResponse.data = mapToResponseData(values);
    return paypageResponse;
  }
}
