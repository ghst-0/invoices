import chainAddressDetails from './chain_address_details.js';
import hexAsWords from './hex_as_words.js';

/** Convert chain address to bech32 words

  {
    address: <Chain Address String>
    network: <Network Name String>
  }

  @returns
  {
    words: [<Chain Address Word Number>]
  }
*/
export default ({address, network}) => {
  if (!address) {
    throw new Error('ExpectedAddressToGetWordsForChainAddress');
  }

  if (!network) {
    throw new Error('ExpectedNetworkToGetWordsForChainAddress');
  }

  const {hash, version} = chainAddressDetails({address, network});

  return {words: [version].concat(hexAsWords({hex: hash}).words)};
};
