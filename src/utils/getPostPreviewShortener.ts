const leftJoinSmallerThan = (words: string[], maxLen: number): string => {
  if (maxLen < 1) return "";
  if (words.length < 1) return "";
  const wordsString = words.join(" ");
  if (wordsString.length < maxLen) {
    return wordsString;
  }
  return leftJoinSmallerThan(words.slice(0, words.length - 1), maxLen);
}

 export default function getPostPreviewShortener({ previewLength }: { previewLength: number }): (data: FmDataInterface) => FmDataInterface {
  return function(data: FmDataInterface) {
    const preview = typeof data?.attributes?.description !== 'undefined'
      ? data.attributes.description
      : removeMdCodeBlocks(data.body);
    const getWordsInFirstLine = getFirstLineOrDefault(textToLinesArray(preview)).split(" ");
    const shortPreview = leftJoinSmallerThan(getWordsInFirstLine, previewLength);
    return {
      ...data,
      body: `${shortPreview}...`,
    };
  };
}

export const removeMdCodeBlocks = function (mdText: string) {
  return mdText.replace(/(```[a-z]*\n[\s\S]*?\n```)/sg, "");
}

export const textToLinesArray = (text: string) => text.match(/([^\n]+)\n/g);

export const getFirstLineOrDefault = (preg: RegExpMatchArray | null, defaultText: string = "You'll need to click to know more") => preg !== null ? preg[0] : defaultText;