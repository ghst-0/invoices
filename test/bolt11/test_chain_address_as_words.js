import { throws, deepStrictEqual } from 'node:assert/strict';
import test from 'node:test';
import chainAddressAsWords from './../../bolt11/chain_address_as_words.js';

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
    error: 'ExpectedAddressToGetWordsForChainAddress',
  },
  {
    args: makeArgs({network: undefined}),
    description: 'Network name is required',
    error: 'ExpectedNetworkToGetWordsForChainAddress',
  },
  {
    args: makeArgs({}),
    description: 'A chain address is converted to words',
    expected: {
      words: [
        17,  6,  5, 25, 11, 10, 25, 10, 15, 12, 26, 1, 28, 17, 30, 24, 20, 13,
        5, 12, 29,  6, 17, 30, 14,  6,  0, 30, 10, 28, 19,  5,  7,
      ],
    },
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => chainAddressAsWords(args), new Error(error), 'Got err');
    } else {
      deepStrictEqual(chainAddressAsWords(args), expected, 'Got expected words');
    }

    return end();
  });
}
