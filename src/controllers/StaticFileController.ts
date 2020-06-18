import fs from 'fs';
import mime from 'mime-types';
import NotFoundController from './NotFoundController';

export default class StaticFileController
  extends NotFoundController
  implements ControllerInterface<StaticFileControllerActionParams>
{
  constructor(protected config: StaticFileControllerCtorConfig) {
    super(config);
  }

  async action({ filepath }: StaticFileControllerActionParams ) {
    const absFilepath = `${this.config.staticFilesDir}/${filepath}`;
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