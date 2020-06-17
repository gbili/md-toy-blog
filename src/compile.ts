import di from './loaders';
import { LoggerInterface } from 'saylo/build/src/Logger';
import { GenerateJsonFilesList } from './loaders/generateJsonFilesLists';

try {
  (async function () {
    try {
      const generateJsonFilesLists = await di.get<GenerateJsonFilesList>('generateJsonFilesLists');
      const logger = await di.get<LoggerInterface>('logger');
      await generateJsonFilesLists();
      logger.log(' GENERATING FILES LIST ');
    } catch (err) {
      throw err;
    }
  })();
} catch (err) {
  throw err;
}
