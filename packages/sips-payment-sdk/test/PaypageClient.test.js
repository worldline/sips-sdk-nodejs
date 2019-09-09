import assert from 'assert';
import { beforeEach, describe, it } from 'mocha';
import {
  Currency, Environment, InitializationResponse, OrderChannel, PaymentRequest, RedirectionStatusCode,
} from '@worldline/sips-payment-dom';
import PaypageClient from '../src/PaypageClient';

describe('PaypageClient.js', () => {
  let paypageClient;
  let paymentRequest;
  beforeEach(() => {
    paypageClient = new PaypageClient(Environment.SIMU, '002001000000001', 1, '002001000000001_KEY1');

    paymentRequest = new PaymentRequest();
    paymentRequest.amount = 2;
    paymentRequest.currencyCode = Currency.EUR;
    paymentRequest.orderChannel = OrderChannel.INTERNET;
    paymentRequest.normalReturnUrl = 'http://localhost';
    paymentRequest.transactionReference = Math.random().toString(36).substring(7);
  });
  describe('initialize', () => {
    it('should pass', (done) => {
      paypageClient
        .initializePayment(paymentRequest)
        .then((result) => {
          assert.strictEqual(true, result instanceof InitializationResponse, 'Response data could not be mapped!');
          assert.strictEqual(result.redirectionStatusCode, RedirectionStatusCode.TRANSACTION_INITIALIZED, 'Response is not successful!');
          done();
        }).catch(err => done(err));
    });
  });
  describe('decode', () => {
    it('should decode successful responses', () => {
      const data = {
        Data: 'captureDay=0|captureMode=AUTHOR_CAPTURE|currencyCode=978|merchantId=002001000000001|orderChannel=INTERNET|responseCode=00|transactionDateTime=2018-02-06T07:54:23+01:00|transactionReference=b4fb98a9c2c|keyVersion=1|acquirerResponseCode=00|amount=2|authorisationId=12345|guaranteeIndicator=Y|cardCSCResultCode=4D|panExpiryDate=201902|paymentMeanBrand=VISA|paymentMeanType=CARD|customerIpAddress=194.78.195.168|maskedPan=4500#############01|holderAuthentRelegation=N|holderAuthentStatus=3D_SUCCESS|tokenPan=g011040a730424d1ba6|transactionOrigin=INTERNET|paymentPattern=ONE_SHOT',
        Seal: '56bddfce68695b9b8a9de51c426aae31bb303fb15570f343975eaa3bd33c8c59',
      };
      const paypageResponse = paypageClient.decodeResponse(data);
      assert.ok(paypageResponse.data, 'Data field is empty!');
      assert.ok(paypageResponse.data.responseCode);
    });
    it('should decode cancelled responses', () => {
      const data = {
        Data: 'captureDay=0|captureMode=AUTHOR_CAPTURE|currencyCode=978|merchantId=002001000000001|orderChannel=INTERNET|responseCode=17|transactionDateTime=2018-02-06T07:43:55+01:00|transactionReference=e1445438c15|keyVersion=1|amount=2|customerIpAddress=194.78.195.168|paymentPattern=ONE_SHOT',
        Seal: '8f488030781e3196726ce0658dbc26f19781f7c7fbe212b39d63d3f4d1d77301',
      };
      const paypageResponse = paypageClient.decodeResponse(data);
      assert.ok(paypageResponse.data);
      assert.ok(paypageResponse.data.responseCode);
    });
    it('should decode refused responses', () => {
      const data = {
        Data: 'captureDay=0|captureMode=AUTHOR_CAPTURE|currencyCode=978|merchantId=002001000000001|orderChannel=INTERNET|responseCode=05|transactionDateTime=2018-02-06T07:50:34+01:00|transactionReference=8bd59312ff4|keyVersion=1|amount=2|guaranteeIndicator=N|panExpiryDate=201803|paymentMeanBrand=VISA|paymentMeanType=CARD|customerIpAddress=194.78.195.168|maskedPan=4500#############01|holderAuthentRelegation=N|holderAuthentStatus=3D_FAILURE|tokenPan=g011040a730424d1ba6|transactionOrigin=INTERNET|paymentPattern=ONE_SHOT',
        Seal: 'e8c5bf4551ec60ce9b8ece6a98bdb1b5fde511539a391bc4ba314aaeac93b5be',
      };
      const paypageResponse = paypageClient.decodeResponse(data);
      assert.ok(paypageResponse.data, 'Data field is empty!');
      assert.ok(paypageResponse.data.responseCode);
    });
  });
});
