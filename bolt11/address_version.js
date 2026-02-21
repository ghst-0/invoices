import { networks } from 'bitcoinjs-lib';
import address_version from './conf/address_versions.json' with { type: 'json' };

const { p2pkh, p2sh } = address_version;
/** Address version

  Either a prefix or a network and version is required

  {
    [network]: <Network Name String>
    [prefix]: <Bech32 Prefix String>
    [version]: <Bitcoinjs-lib Chain Address Version Number>
  }

  @throws
  <Error>

  @returns
  {
    version: <BOLT 11 Chain Address Version Number>
  }
*/
export default ({network, prefix, version}) => {
  if (prefix) {
    return {version};
  }

  if (!network) {
    throw new Error('ExpectedNetworkToDeriveAddressVersion');
  }

  if (!networks[network]) {
    throw new Error('UnexpectedNetworkToDeriveAddressVersion');
  }

  if (version === undefined) {
    throw new Error('ExpectedVersionToDeriveAddressVersion');
  }

  switch (version) {
  case networks[network].pubKeyHash:
    return {version: p2pkh};

  case networks[network].scriptHash:
    return {version: p2sh};

  default:
    throw new Error('UnexpectedVersionToDeriveBoltOnChainAddressVersion');
  }
};
