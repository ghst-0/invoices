const amountMultiplierPattern = /^[^munp0-9]$/;
const divisibilityMarkerLen = 1;
const divisibilityPattern = /^[munp]$/;

/** Parse human readable value into a value number and divisor

  {
    amount: <Amount String>
    units: <Amount Divisor String>
  }

  @throws
  <Error>

  @returns
  {
    divisor: <Payment Request Value Divisor String>
    value: <Payment Request Value String>
  }
*/
export default ({amount, units}) => {
  const hrp = `${amount}${units}`;

  // Exit early when there is a divide marker
  if (divisibilityPattern.test(hrp.slice(-divisibilityMarkerLen))) {
    return {
      divisor: hrp.slice(-divisibilityMarkerLen),
      value: hrp.slice(Number(), -divisibilityMarkerLen),
    };
  }

  if (amountMultiplierPattern.test(hrp.slice(-divisibilityMarkerLen))) {
    throw new Error('InvalidAmountMultiplier');
  }

  return {value: hrp};
};
