import http from 'http';
import { LoadDictElement } from 'di-why/build/src/DiContainer';
import handleSignals from 'server-handle-signals';

export type Server = http.Server;

const loadDictElement: LoadDictElement<(server: Server) => Server> = {
  instance: handleSignals,
};

export default loadDictElement;