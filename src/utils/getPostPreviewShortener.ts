 export default function getPostPreviewShortener({ previewLength }: { previewLength: number }): (data: FmDataInterface) => FmDataInterface {
  return function(data: FmDataInterface) {
    const preview = typeof data.attributes.description !== 'undefined'
      ? data.attributes.description
      : removeMdCodeBlocks(data.body);
    const truncatePreview = (pre: string, maxLen: number) => pre.substring(0, maxLen);
    return {
      ...data,
      body: truncatePreview(getFirstLineOrDefault(textToLinesArray(preview)), previewLength)
    };
  };
}

export const removeMdCodeBlocks = function (mdText: string) {
  return mdText.replace(/(```[a-z]*\n[\s\S]*?\n```)/sg, "");
}

export const textToLinesArray = (text: string) => text.match(/([^\n]+)\n/g);

export const getFirstLineOrDefault = (preg: RegExpMatchArray | null, defaultText: string = "You'll need to click to know more") => preg !== null ? preg[0] : defaultText;