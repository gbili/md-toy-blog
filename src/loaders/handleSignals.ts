import http from 'http';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

export type Server = http.Server;

const loadDictElement: LoadDictElement<(server: Server) => Server> = {
  instance: (server: Server): Server => {
    const shutdown = () => {
      server.close(function onServerClosed(err) {
        if (err) {
          console.log(err);
          process.exitCode = 1;
        }
        process.exit();
      });
    };

    process.on('SIGTERM', () => {
      console.log(`Got SIGTERM (docker container stop). Graceful shutdown.`, new Date().toISOString())
      shutdown();
    });

    process.on('SIGINT', () => {
      console.log(`Got SIGINT (aka ctrl-c in docker). Graceful shutdown.`, new Date().toISOString())
      shutdown();
    });

    return server;
  },
};

export default loadDictElement;