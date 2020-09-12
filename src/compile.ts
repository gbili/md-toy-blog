import di from './loaders';
import { LoggerInterface } from 'saylo/build/src/Logger';
import { GenerateJsonFilesList } from './loaders/generateJsonFilesLists';

try {
  (async function () {
    try {
      const generateJsonFilesLists = await di.get<GenerateJsonFilesList>('generateJsonFilesLists');
      const logger = await di.get<LoggerInterface>('logger');
      logger.log(' GENERATING FILES LISTS');
      await generateJsonFilesLists();
      logger.log(' GENERATED FILES LISTS');
    } catch (err) {
      throw err;
    }
  })();
} catch (err) {
  throw err;
}
