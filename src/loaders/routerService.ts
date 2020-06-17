import RouterService from '../services/RouterService';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof RouterService>> = {
  constructible: RouterService,
  locateDeps: {
    routes: 'routes',
  },
};

export default loadDictElement;
