import fs from 'fs';
import recursive from 'recursive-readdir'

type Callback = (err: Error | NodeJS.ErrnoException | null, files: string[]) => void; 
type ReadDirFunction = (path: string, callback: Callback) => void;

export default class DirFilesToJsonService {
  private sourceDir: string;
  private destFile: string;

  constructor({ sourceDir, destFile }: { sourceDir: string; destFile: string; }) {
    this.sourceDir = sourceDir;
    this.destFile = destFile;
  }

  async readFilesListPromise(recrusiveRead: boolean) {
    const sourceDir = this.sourceDir;
    const readingFunction: ReadDirFunction = recrusiveRead ? recursive : fs.readdir;
    try {
      const files = await new Promise(function (resolve: (files: string[]) => void, reject) {
        readingFunction(sourceDir, (err: Error | NodeJS.ErrnoException | null, files: string[]): void => {
          if (err) reject(err);
          resolve(files);
        });
      });
      return files;
    } catch (err) {
      throw err;
    }
  }

  async writeJsonFilePromise(files: string[]) {
    const destFile = this.destFile;
    const filesListAsJsonString = JSON.stringify(files);
    const fileContents = (destFile.split('.').pop() === 'json')
      ? filesListAsJsonString
      : `export default ${filesListAsJsonString};`;
    try {
      const writtenFilePath = await new Promise(function (resolve: (destFile: string) => void, reject) {
        fs.writeFile(destFile, fileContents, function(err) {
          if (err) reject(err);
          resolve(destFile);
        });
      });
      return writtenFilePath;
    } catch (err) {
      throw err;
    }
  }

  async generate(
    onSuccess: (writtenFilePath: string) => any = (writteFilePath) => writteFilePath,
    onFail: (err: Error) => any = (err) => err,
    recrusiveRead: boolean = true
  ) {
    try {
      const files = await this.readFilesListPromise(recrusiveRead) 
      const writtenFilePath = await this.writeJsonFilePromise(files);
      return onSuccess(writtenFilePath);
    } catch (err) {
      onFail(err);
      throw err;
    }
  }
}