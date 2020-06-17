import RouterService from '../services/RouterService';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof RouterService>> = {
  factory: ({ routes }) => {
    return new RouterService(routes);
  },
  locateDeps: {
    routes: 'routes',
  },
};

export default loadDictElement;
