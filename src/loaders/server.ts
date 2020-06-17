import http from 'http';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import { LoggerInterface } from 'saylo/build/src/Logger';

export type Server = http.Server;

const loadDictElement: LoadDictElement<Server> = {
  factory: ({ router }) => {
    const server = http.createServer(async function (req, res) {
      const response = await router.resolve(req);
      if (response) {
        res.writeHead(response.code, response.headers);
        res.end(response.body);
        return;
      }
    });
    return server;
  },
  locateDeps: {
    router: 'routerService',
  },
  async after({ me, serviceLocator }) {
    const logger = await serviceLocator.get<LoggerInterface>('logger');
    logger.log('=============== Loaded express app ===============');
  },
};

export default loadDictElement;