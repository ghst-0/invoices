import { address, networks } from 'bitcoinjs-lib';
import addressVersions from './conf/address_versions.json' with { type: 'json' };
import wordsAsBuffer from './words_as_buffer.js';

const {toBase58Check} = address;
const {toBech32} = address;

/** Words as a chain address

  {
    network: <Network Name String>
    words: [<Bech 32 Word Number>]
  }

  @throws
  <Error>

  @returns
  {
    [chain_address]: <Chain Address String>
  }
*/
export default ({network, words}) => {
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('ExpectedWordsToConvertToChainAddress');
  }

  let hash;
  const net = networks[network];
  const [version, ...hashWords] = words;

  if (!net) {
    throw new Error('UnrecognizedNetworkForChainAddress');
  }

  try {
    hash = wordsAsBuffer({words: hashWords, trim: true});
  } catch {
    throw new Error('FailedToConvertChainAddressWordsToBuffer');
  }

  switch (version) {
  case addressVersions.p2pkh:
    return {chain_address: toBase58Check(hash, net.pubKeyHash)};

  case addressVersions.p2sh:
    return {chain_address: toBase58Check(hash, net.scriptHash)};

  case addressVersions.witnessV0:
  case addressVersions.witnessV1:
    return {chain_address: toBech32(hash, version, net.bech32)};

  default:
    return {};
  }
};

