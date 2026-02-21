import { throws, deepStrictEqual } from 'node:assert/strict';
import test from 'node:test';
import decodePrefix from './../../bolt11/decode_prefix.js';

const makeArgs = overrides => {
  const args = {prefix: 'lnbc1p'};

  for (const k of Object.keys(overrides)) {
    args[k] = overrides[k]
  }

  return args;
};

const tests = [
  {
    args: makeArgs({prefix: 'prefix'}),
    description: 'A valid prefix is required',
    error: 'InvalidPaymentRequestPrefix',
  },
  {
    args: makeArgs({prefix: 'lnzz'}),
    description: 'A known network prefix is required',
    error: 'UnknownCurrencyCodeInPaymentRequest',
  },
  {
    args: makeArgs({}),
    description: 'A prefix is decoded',
    expected: {amount: '1', network: 'bitcoin', units: 'p'},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => decodePrefix(args), new Error(error), 'Got err');
    } else {
      deepStrictEqual(decodePrefix(args), expected, 'Got expected details');
    }

    return end();
  });
}
