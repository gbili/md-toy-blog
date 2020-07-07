import fs from 'fs';

export default class MarkdownToHtmlService { //implements MarkdownToHtmlConstructorInterface {
  private defaultPostPrivacy: "private" | "public" = "private";
  private fm: FmFunction;
  private converter: SdConverter;

  constructor({fm, converter} : { fm: FmFunction; converter: SdConverter; }) {
    this.fm = fm;
    this.converter = converter;
  }

  extractFmAttributesAndHtmlBodyFromMd(postSlug: string, markdownFilePath: string, preHtmlCallback: PreHtmlCallback) {
    const fm = this.fm;
    const converter = this.converter;
    const privacy = this.defaultPostPrivacy;
    return new Promise<FmDataInterface>(function(resolve, reject) {
      fs.readFile(markdownFilePath, 'utf-8', function(err, fileContents) {

        if (err) return reject(err); 
        let data = fm(fileContents);
        const attributes = (typeof data.attributes === 'undefined')
          ? { privacy }
          : { ...data.attributes };

        const attributesWithSlug = {
          ...attributes,
          slug: postSlug,
          privacy: attributes?.privacy || privacy
        }

        const fixNoLanguageBugFallbackToJS = function (body: string) {
          return body.replace(/```\n([\s\S]*?\n)```/sg, "```text\n$1```");
        };
        const safeBody = fixNoLanguageBugFallbackToJS(data.body);

        const dataBeforeCallback = {
          ...data,
          attributes: { ...attributesWithSlug },
          body: safeBody,
        };

        const dataAfterCallback = preHtmlCallback 
          ? preHtmlCallback(dataBeforeCallback)
          : { ...dataBeforeCallback };

        return resolve({
           ...dataAfterCallback,
           bodyHtml: converter.makeHtml(dataAfterCallback.body)
        });
      });
    })
  };
}