import { bech32 } from 'bech32';

import decodePrefix from './decode_prefix.js';
import hrpAsMtokens from './hrp_as_mtokens.js';
import wordsAsBuffer from './words_as_buffer.js';

const bufferAsHex = buffer => buffer.toString('hex');
const {decode} = bech32;
const lnPrefix = 'ln';
const maxRequestLength = Number.MAX_SAFE_INTEGER;

/** Derive bytes for payment request details

  {
    request: <BOLT 11 Encoded Payment Request String>
  }

  @throws
  <Error>

  @returns
  {
    encoded: <Payment Request Details Hex String>
    mtokens: <Millitokens Number String>
    network: <Network Name String>
    words: <Word Length Number>
  }
*/
export default ({request}) => {
  if (!request) {
    throw new Error('ExpectedPaymentRequestToByteEncode');
  }

  if (request.slice(Number(), lnPrefix.length).toLowerCase() !== lnPrefix) {
    throw new Error('ExpectedLnPrefixToByteEncodePaymentRequest');
  }

  const {prefix, words} = decode(request, maxRequestLength);

  const {amount, network, units} = decodePrefix({prefix});

  // Decode the request amount millitokens requested amount
  const {mtokens} = hrpAsMtokens({amount, units});

  // Encode the words as binary data in a  hex string
  const encoded = bufferAsHex(wordsAsBuffer({words}));

  return {encoded, network, mtokens, words: words.length};
};
