import { bech32 } from 'bech32';

import currencyCodes from './conf/bech32_currency_codes.json' with { type: 'json' };
import mtokensAsHrp from './mtokens_as_hrp.js';

const hexAsBuffer = hex => Buffer.from(hex, 'hex');
const isHex = n => !!n && !(n.length % 2) && /^[0-9A-F]*$/i.test(n);
const {keys} = Object;
const limit = Number.MAX_SAFE_INTEGER;

/** Derive a payment request from request data

  {
    encoded: <Payment Request Details Hex String>
    [mtokens]: <Millitokens Number String>
    network: <Network Name String>
    words: <Words Count Number>
  }

  @throws
  <Error>

  @returns
  {
    request: <BOLT 11 Encoded Payment Request String>
  }
*/
export default ({encoded, mtokens, network, words}) => {
  if (!isHex(encoded)) {
    throw new Error('ExpectedHexEncodedPaymentRequestDataToDecodeRequest');
  }

  if (!network) {
    throw new Error('ExpectedNetworkToDecodeByteEncodedRequest');
  }

  if (!words) {
    throw new Error('ExpectedWordsCountToDecodeByteEncodedRequest');
  }

  // Lookup the BOLT 11 network prefix for the request
  const currencyPrefix = keys(currencyCodes)
    .map(code => ({code, network: currencyCodes[code]}))
    .find((n) => n.network === network);

  if (!currencyPrefix) {
    throw new Error('ExpectedKnownNetworkToDecodeByteEncodedRequest');
  }

  // Before the encoded data is a network code and the amount
  const prefix = `ln${currencyPrefix.code}${mtokensAsHrp({mtokens}).hrp}`;

  // The data of the request is encoded in 5 bit words ie bech32
  const fiveBit = bech32.toWords(hexAsBuffer(encoded)).slice(Number(), words);

  return {request: bech32.encode(prefix, fiveBit, limit)};
};
