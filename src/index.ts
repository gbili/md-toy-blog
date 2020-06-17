import di from './loaders';
import { LoggerInterface } from 'saylo/build/src/Logger';
import { PossiblyEnhancedAppConfig } from './loaders/appConfig';
import { Server } from './loaders/server';

console.log('I need you to fucking log!');

try {
  (async function () {
    try {

      const logger = await di.get<LoggerInterface>('logger');

      logger.log(' BLOG = BLOG = BLOG = BLOG = BLOG = BLOG');
      console.log('NEED TO LOG!');

      const server = await di.get<Server>('server');
      const { port } = await di.get<PossiblyEnhancedAppConfig>('appConfig');
      //const { path, port } = await di.get<PossiblyEnhancedAppConfig>('appConfig');

      server.listen(port);
      console.log(`Listening on : http://localhost:${port}`);

      /*
      server.listen(port, () => {
        logger.log(' BLOG = BLOG = BLOG = BLOG = BLOG = BLOG');
        logger.log(` BLOG = App: localhost:${port}${path} = BLOG`); 
        logger.log(' BLOG = BLOG = BLOG = BLOG = BLOG = BLOG');
      });
      */

    } catch (err) {
      console.log('A fucking error occured', err);
      throw err;
    }
  })();
} catch (err) {
      console.log('A fucking error occured 2', err);
  throw err;
}
