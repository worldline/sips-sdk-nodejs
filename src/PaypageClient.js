const crypto = require('crypto');
const https = require('https');

const {
  PaymentRequest, InitializationResponse, Environment, PaypageResponse, ResponseData,
} = require('./models');

const SealCalculator = require('./SealCalculator');

const numberFields = ['amount', 'captureDay'];
const dateFields = ['captureLimitData', 'transactionDateTime'];

const mapToResponseData = (values) => Object.assign(new ResponseData(), ...values.map(([k, v]) => {
  if (numberFields.includes(k)) {
    return { [k]: Number.parseInt(v, 10) };
  } if (dateFields.includes(k)) {
    return { [k]: Date.parse(v) };
  }
  return { [k]: v };
}));

const verifyInitializationResponse = (initializationResponse, secretKey) => {
  if (initializationResponse.seal !== undefined) {
    const correctSeal = SealCalculator
      .calculateSeal(SealCalculator.getSealString(initializationResponse), secretKey);
    if (correctSeal !== initializationResponse.seal) {
      throw new Error('Initialization response has been tampered with!');
    }
  }
};

const verifyPaypageResponse = (data, seal, secretKey) => {
  const correctSeal = crypto.createHash('sha256').update(`${data}${secretKey}`, 'utf8').digest('hex');
  if (correctSeal !== seal) {
    throw new Error('Paypage response has been tampered with!');
  }
};

module.exports = class PaypageClient {
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
    requestToMake.seal = SealCalculator
      .calculateSeal(SealCalculator.getSealString(paymentRequest), this.secretKey);

    const options = {
      hostname: this.environment,
      port: 443,
      path: '/rs-services/v2/paymentInit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const clientRequest = https.request(options, (incomingMessage) => {
        // Response object.
        const response = {
          statusCode: incomingMessage.statusCode,
          headers: incomingMessage.headers,
          body: [],
        };

        if (response.statusCode !== 200) {
          reject(new Error(`Status code is ${response.statusCode}`));
        }

        // Collect response body data.
        incomingMessage.on('data', (chunk) => {
          response.body.push(chunk);
        });

        // Resolve on end.
        incomingMessage.on('end', () => {
          response.body = response.body.join();
          const initializationResponse = Object.assign(
            new InitializationResponse(), JSON.parse(response.body),
          );
          verifyInitializationResponse(initializationResponse, this.secretKey);
          resolve(initializationResponse);
        });
      });

      // Reject on request error.
      clientRequest.on('error', (error) => {
        reject(error);
      });

      // Write request body if present.
      clientRequest.write(JSON.stringify(requestToMake));

      // Close HTTP connection.
      clientRequest.end();
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
    values = values.map((value) => value.split('=', 2));
    paypageResponse.data = mapToResponseData(values);
    return paypageResponse;
  }
};
