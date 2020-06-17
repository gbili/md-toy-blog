  export default function getPostPreviewShortener({ previewLength }: { previewLength: number }): (data: FmDataInterface) => FmDataInterface {
    return function(data: FmDataInterface) {
      const preview = typeof data.attributes.description !== 'undefined'
        ? data.attributes.description
        : data.body.replace(/(```[a-z]*\n[\s\S]*?\n```)/sg, "");
      const getLines = (text: string) => text.match(/([^\n]+)\n/g);
      const getFirstLineOrDefault = (preg: RegExpMatchArray | null) => preg !== null ? preg[0] : "You'll need to click to know more";
      const truncatePreview = (pre: string, maxLen: number) => pre.substring(0, maxLen);
      return {
        ...data,
        body: truncatePreview(getFirstLineOrDefault(getLines(preview)), previewLength)
      };
    };
  }
