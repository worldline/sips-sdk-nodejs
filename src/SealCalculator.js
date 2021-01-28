const crypto = require('crypto');
const { PaymentRequest } = require('./models');

const sortAndFilterFunctionsFromEntries = (entries) => entries
  .filter((entry) => typeof entry[1] !== 'function' && typeof entry[1] !== 'undefined' && entry[1] !== null)
  .sort();

const concatenate = (currentString, field) => {
  let concatenatedString = currentString;
  const concatenateString = (value) => {
    concatenatedString += value;
  };
  const concatenateArray = (value) => {
    concatenateString(value.toString().replace(/,/g, ''));
  };

  if (field instanceof Array) {
    concatenateArray(field);
  } else if (field instanceof Object) {
    sortAndFilterFunctionsFromEntries(Object.entries(field))
      .forEach((innerField) => {
        concatenatedString = concatenate(concatenatedString, innerField[1]);
      });
  } else {
    concatenateString(field);
  }
  return concatenatedString;
};

const getSealStringForPaymentRequest = (paymentRequest) => {
  let sealString = '';
  sortAndFilterFunctionsFromEntries(Object.entries(paymentRequest))
    .filter((entry) => entry[0] !== 'keyVersion')
    .forEach((field) => {
      sealString = concatenate(sealString, field[1]);
    });
  return sealString;
};

const getSealStringForInitializationResponse = (initializationResponse) => {
  let sealString = '';
  sortAndFilterFunctionsFromEntries(Object.entries(initializationResponse))
    .filter((entry) => entry[0] !== 'seal')
    .forEach((field) => {
      sealString = concatenate(sealString, field[1]);
    });
  return sealString;
};

module.exports = {
  getSealString: (object) => (object instanceof PaymentRequest
    ? getSealStringForPaymentRequest(object) : getSealStringForInitializationResponse(object)),
  calculateSeal: (sealString, secretKey) => crypto.createHmac('sha256', secretKey).update(sealString).digest('hex'),
};
