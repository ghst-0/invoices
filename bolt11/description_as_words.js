import { bech32 } from 'bech32';

const encoding = 'utf8';
const {toWords} = bech32;

/** Description string as words

  {
    [description]: <Payment Request Description String>
  }

  @returns
  {
    [words]: [<Bech32 Word Number>]
  }
*/
export default ({description}) => {
  if (description === undefined) {
    return {};
  }

  return {words: toWords(Buffer.from(description || String(), encoding))};
};
