import { deepStrictEqual } from 'node:assert/strict';
import test from 'node:test';
import mtokensAsHrp from './../../bolt11/mtokens_as_hrp.js';

const tests = [
  {
    args: {mtokens: '1'},
    description: 'The smallest possible',
    expected: '10p',
  },
  {
    args: {mtokens: '10'},
    description: 'Test smaller than a nano',
    expected: '100p',
  },
  {
    args: {mtokens: '100'},
    description: 'Test smaller than a token',
    expected: '1n',
  },
  {
    args: {mtokens: '1000'}, description: 'Test nano tokens', expected: '10n',
  },
  {
    args: {mtokens: '10000'}, description: 'Test more nano', expected: '100n',
  },
  {
    args: {mtokens: '100000'}, description: 'Test micro', expected: '1u',
  },
  {
    args: {mtokens: '100000000'}, description: 'Test milli', expected: '1m',
  },
  {
    args: {mtokens: '100000000000'}, description: 'Test btc', expected: '1',
  },
  {
    args: {mtokens: '123456789000'},
    description: 'Test extended nano',
    expected: '1234567890n',
  },
  {
    args: {mtokens: '123450000000'},
    description: 'Test extended micro',
    expected: '1234500u',
  },
  {
    args: {mtokens: '123400000000'},
    description: 'Test extended milli',
    expected: '1234m',
  },
];

for (const { args, description, expected } of tests) {
  test(description, (t, end) => {
    const { hrp } = mtokensAsHrp(args);

    deepStrictEqual(hrp, expected, 'Hrp derived from mtokens');

    return end();
  })
}
