import wordsAsNumber from './words_as_number.js';

/** Derive tagged fields from words

  {
    words: [<Word Number>]
  }

  @returns
  {
    fields: [{
      code: <Payment Request Element Code Number>
      words: [<Element Word Number>]
    }]
  }
*/
export default ({words}) => {
  const fields = [];
  let tagCode;
  let tagWords;
  let withTags = words.slice();

  while (withTags.length > 0) {
    tagCode = withTags.shift();

    // Determine the tag's word length
    const len = wordsAsNumber({words: [withTags.shift(), withTags.shift()]});

    tagWords = withTags.slice(Number(), len);

    // Cut off the tag words
    withTags = withTags.slice(tagWords.length);

    fields.push({code: tagCode, words: tagWords});
  }

  return {fields};
};
