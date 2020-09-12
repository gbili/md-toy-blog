import fs from 'fs';
import mime from 'mime-types';
import NotFoundController from './NotFoundController';

export default class PageController
  extends NotFoundController
  implements ControllerInterface<PageControllerActionParams>
{
  constructor(protected config: PageControllerCtorConfig) {
    super(config);
  }

  async action({ filepath }: PageControllerActionParams ) {
    const absFilepath = `${this.config.pagesDir}/${filepath}`;
    try {
      const rawContents: string = await (new Promise(function(resolve, reject) {
        fs.readFile(absFilepath, 'utf-8', function(err, rawContents) {
          if (err) return reject(err);
          return resolve(rawContents);
        });
      }));

      const mimeType = mime.lookup(absFilepath);
      if (!mimeType) {
        throw new Error('Mime Type not supported')
      }
      return {
        code: 200,
        headers: {
          'content-type': `${mime.contentType(mimeType)}; charset=${mime.charset(mimeType)}`
        },
        body: rawContents,
      };
    } catch (err) {
      return this.handleError(err);
    }
  }
}