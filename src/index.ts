import di from './loaders';
import { LoggerInterface } from 'saylo/build/src/Logger';
import { PossiblyEnhancedAppConfig } from './loaders/appConfig';
import { Server } from './loaders/server';

try {
  (async function () {
    try {
      const logger = await di.get<LoggerInterface>('logger');
      const server = await di.get<Server>('server');
      const { port } = await di.get<PossiblyEnhancedAppConfig>('appConfig');
      server.listen(port);
      logger.log(' BLOG = BLOG = BLOG = BLOG = BLOG = BLOG');
      logger.log(`Listening on : http://localhost:${port}`);
      logger.log(' BLOG = BLOG = BLOG = BLOG = BLOG = BLOG');

    } catch (err) {
      throw err;
    }
  })();
} catch (err) {
  throw err;
}
