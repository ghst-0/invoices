/** Convert words to a big endian int

  {
    words: [<Bech32 Word Number>]
  }

  @returns
  <Big Endian Number>
*/
const wordsAsNumber = ({words}) => {
  return words.reverse().reduce((sum, n, i) => sum + n * 32 ** i, 0);
};

export { wordsAsNumber }
