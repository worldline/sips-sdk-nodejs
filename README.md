# SIPS Payment SDK [![npm version](https://img.shields.io/npm/v/@worldline/sips-payment-sdk.svg)](https://www.npmjs.com/package/@worldline/sips-payment-sdk)
This package provides a Node.js implementation for SIPS, the Worldline e-payments gateway.

> :warning: This library was written for SIPS 2.0 and is not compatible with SIPS 1.0!

## Installing

This library is provided as two separate packages on NPM . To install it, simply run:
```shell
npm install sips-payment-sdk
```

Or if you prefer Yarn, run:
```shell
yarn add sips-payment-sdk
```


## Usage
> :bulb: Currently this library only supports SIPS in pay page mode.

The example below uses ES6's syntax. To run on any Node.js, code should be transpiled to ES5 using Babel.

### Initialization
First, create a client for the desired environment using your merchant ID, key version & secret key:
```js
const { Environment, PaypageClient } = require('@worldline/sips-payment-sdk');

const paypageClient = new PaypageClient(
  Environment.TEST,
  '002001000000001',
  1, // This shouldn't be hardcoded here...
  '002001000000001_KEY1'); // ...and neither should this.
```

Then set up a request to initialize a session on the SIPS server:

```js
const { PaymentRequest, Currency, OrderChannel } = require('@worldline/sips-payment-sdk');

const paymentRequest = new PaymentRequest();
paymentRequest.amount = 2;
paymentRequest.currency = Currency.EUR;
paymentRequest.orderChannel = OrderChannel.INTERNET;
```
Add unique reference for the transaction:

```js
paymentRequest.transactionReference = 'unique-transaction-ref';
```

And initialize your session on the server:
```js
const initializationResponse = await paypageClient.initializePayment(paymentRequest);
```

The `initializationResponse` you'll receive from the server contains all information needed to continue
handling your transaction. If you're initialization was successful, your response will contain a
`RedirectionStatusCode.TRANSACTION_INITIALIZED`.

### Making the payment
In case your initialization was successful, you have to use the `redirectionUrl` received to perform a POST request
with both the `redirectionData` and `seal` as parameters. Since this should redirect the customer the SIPS
payment page, the cleanest example is a simple HTML form:

```html
<form method="post" action="redirectionUrl">
    <input name="redirectionData" type="hidden" value="..." />
    <input name="seal" type="hidden" value="..." />
    <input type="submit" value="Proceed to checkout"/>
</form>
```

### Verifying the payment
When your customer is done, he will be able to return to your application. This is done
via a form, making a POST request to the `normalReturnUrl` provided during the initialization of your payment.
This POST request contains details on the payment. You can simply decode these responses, providing the parameters included in the received request to your `paypageClient`:

```js
const paypageResponse = paypageClient.decodeResponse(request.data);
```

> :warning: Since the customer is not always redirecting back (e.g. he closes the confirmation page), it's a
a good practice to include an `automaticReturnUrl`. SIPS will always POST details on the transaction on this URL,
even if a customer doesn't redirect back to your application.
