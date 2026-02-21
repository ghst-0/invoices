import { throws, deepStrictEqual } from 'node:assert/strict';
import test from 'node:test';
import chainAddressDetails from './../../bolt11/chain_address_details.js';

const makeArgs = overrides => {
  const args = {
    address: 'mk2QpYatsKicvFVuTAQLBryyccRXMUaGHP',
    network: 'testnet',
  };

  for (const k of Object.keys(overrides)) {
    args[k] = overrides[k]
  }

  return args;
};

const tests = [
  {
    args: makeArgs({address: undefined}),
    description: 'Address is required',
    error: 'ExpectedAddressToDeriveChainAddressDetails',
  },
  {
    args: makeArgs({network: undefined}),
    description: 'Network name is required',
    error: 'ExpectedNetworkToDeriveChainAddressDetails',
  },
  {
    args: makeArgs({address: 'address'}),
    description: 'A valid address is required',
    error: 'ExpectedValidAddressToDeriveChainDetails',
  },
  {
    args: makeArgs({}),
    description: 'A chain address is converted to words',
    expected: {
      hash: '3172b5654f6683c8fb146959d347ce303cae4ca7',
      version: 17,
    },
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => chainAddressDetails(args), new Error(error), 'Got err');
    } else {
      deepStrictEqual(chainAddressDetails(args), expected, 'Got expected details');
    }

    return end();
  })
}
