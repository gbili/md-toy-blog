import di from './loaders';
import { LoggerInterface } from 'saylo/build/src/Logger';
import { PossiblyEnhancedAppConfig } from './loaders/appConfig';
import { Server } from './loaders/server';

let appConfig;
let logger;
let server;

try {
  (async function () {
    try {
      logger = await di.get<LoggerInterface>('logger');
      server = await di.get<Server>('server');
      appConfig = await di.get<PossiblyEnhancedAppConfig>('appConfig');
      const { port } = appConfig;
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

export { appConfig, logger, server, di };
export default server;